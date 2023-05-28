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
			<script defer src="/script.js" type="module" />
			<link rel="stylesheet" href="/style.css" />
		</head>
		<body>
			<canvas id="canvas" />
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


/**
 * Global imports
 */
import Mousetrap from "https://cdn.skypack.dev/mousetrap@1.6.5";
import confetti from "https://cdn.skypack.dev/canvas-confetti@1.4.0";

/**
 * Helper to handle the resize of the window > canvas automatically
 */
function __2DGameGPT__ResizeHelper(){
	const _canvas = document.querySelector("canvas")
	_canvas.width = window.innerWidth;
	_canvas.height = window.innerHeight;

	function handleResize() {
		requestAnimationFrame(() => {
			_canvas.width = window.innerWidth;
			_canvas.height = window.innerHeight;
		});
	}
	handleResize();
	window.addEventListener("resize", handleResize, { passive: true });
}
__2DGameGPT__ResizeHelper()

/**
 * Generated 2D game
 */
${content}
`;
	},
};
