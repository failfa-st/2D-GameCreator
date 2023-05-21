import { renderToString } from "react-dom/server";

export const wrappers: Record<"js" | "html" | "css" | "miniHtml", (content?: string) => string> = {
	html(content) {
		return `<!DOCTYPE html>
<!-- generated with https://failfa.st -->
${renderToString(
	<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			<title>{content}</title>
			<script defer src="/script.js" />
			<link rel="stylesheet" href="/style.css" />
		</head>
		<body>
			<canvas id="canvas" />
			<a className="failfast" href="https://failfa.st" target="_blank">
				AI generated with
				<svg viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="m8,12c-.55,0-1-.45-1-1,0,0,0,0,0,0h-1v-1h4v1h-1s0,0,0,0c0,.55-.45,1-1,1Zm-4-2v4l.97,1.56-.02-4.03-.96-1.53Zm4,8h4v-1h-4v1Zm4,2v2s3,0,3,0l2.5-4h-4.3l-1.2,2Zm8-12v6l-1.28,2.05-4.33-.04.61-1.01h-3s0-13,0-13c7,0,8,6,8,6Zm-2,3l-2-2-2,2.01,2,1.99,2-2Zm-7,4h-1v1h1v-1Z"
					/>
				</svg>
			</a>
		</body>
	</html>
)}`;
	},
	miniHtml() {
		return `
<!-- generated with https://failfa.st -->
${renderToString(
	<>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

		<canvas id="canvas" />
		<a className="failfast" href="https://failfa.st" target="_blank">
			AI generated with
			<svg viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="m8,12c-.55,0-1-.45-1-1,0,0,0,0,0,0h-1v-1h4v1h-1s0,0,0,0c0,.55-.45,1-1,1Zm-4-2v4l.97,1.56-.02-4.03-.96-1.53Zm4,8h4v-1h-4v1Zm4,2v2s3,0,3,0l2.5-4h-4.3l-1.2,2Zm8-12v6l-1.28,2.05-4.33-.04.61-1.01h-3s0-13,0-13c7,0,8,6,8,6Zm-2,3l-2-2-2,2.01,2,1.99,2-2Zm-7,4h-1v1h1v-1Z"
				/>
			</svg>
		</a>
	</>
)}`;
	},
	css() {
		return `/**
 * generated with https://failfa.st
 */

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
html, body {
	height: 100%;
	width: 100%;
	overflow: hidden;
	background: #a9a9a9;
}
.failfast {
	position: fixed;
	display: "flex";
	align-items: center;
	align-content: center;
	z-index: 1;
	top: 0;
	left: 0;
	margin: 8px;
	padding: 6px 16px;
	background: black;
	color: white;
	text-decoration: none;
	border-radius: 4px;
	font-family: sans-serif;
}
.failfast svg {
	height: 1em;
	width: 1em;
	font-size: 24px;
	margin: 0 0 -4px 4px;
}
`;
	},
	js(content) {
		return `
/**
 * generated with https://failfa.st
 */
function __2DGameGPT__ResizeHelper(){
	function handleResize() {
		requestAnimationFrame(() => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		});
	}
	handleResize();
	window.addEventListener("resize", handleResize, { passive: true });
}
__2DGameGPT__ResizeHelper()
${content}
`;
	},
};
