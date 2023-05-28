import IconButton from "@mui/material/IconButton";
import { wrappers } from "@/utils/share";
import Tooltip from "@mui/material/Tooltip";
import { CodepenIcon } from "@/components/CodepenIcon";
import { ShareProps } from "@/components/GameCreator";
import { prettify } from "@/utils";

export function Codepen({ title, content }: ShareProps) {
	// location.reload is not allowed on CodePen
	content = content.replace("location.reload()", "history.go(0)");
	content = prettify(content);

	return (
		<form action="https://codepen.io/pen/define" method="POST" target="_blank">
			<input
				type="hidden"
				name="data"
				value={JSON.stringify({
					title,
					js: wrappers.js(content),
					html: wrappers.miniHtml(title),
					css: wrappers.css(),
				})}
			/>

			<Tooltip title="Open in Codepen">
				<IconButton color="primary" type="submit" aria-label="Codepen">
					<CodepenIcon />
				</IconButton>
			</Tooltip>
		</form>
	);
}
