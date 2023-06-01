import { getParameters } from "codesandbox/lib/api/define";
import { NextApiRequest, NextApiResponse } from "next";
import prettier from "prettier";
import parserHTML from "prettier/parser-html";
import parserCSS from "prettier/parser-postcss";
import parserBabel from "prettier/parser-babel";
import { wrappers } from "@/utils/share";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	const content = request.body.content as string;
	const title = request.body.title as string;

	const parameters = getParameters({
		template: "static",
		files: {
			"index.html": {
				content: prettier.format(wrappers.html(title), {
					parser: "html",
					plugins: [parserHTML],
				}),
				isBinary: false,
			},
			"style.css": {
				content: prettier.format(wrappers.css(), {
					parser: "css",
					plugins: [parserCSS],
				}),
				isBinary: false,
			},
			"script.js": {
				content: prettier.format(wrappers.js(content), {
					parser: "babel",
					plugins: [parserBabel],
				}),
				isBinary: false,
			},
			"package.json": {
				content: { dependencies: {} },
			},
		},
	});

	response
		.status(200)
		.json(`https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`);
}
