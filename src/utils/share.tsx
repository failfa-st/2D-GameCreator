import { renderToString } from "react-dom/server";

export const wrappers: Record<"js" | "html" | "css" | "miniHtml", (content?: string) => string> = {
	html(content) {
		return `<!DOCTYPE html>
<!-- generated with https://huggingface.co/spaces/failfast/2D-GameCreator by https://failfa.st -->
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
<!-- generated with https://huggingface.co/spaces/failfast/2D-GameCreator by https://failfa.st -->
${renderToString(
	<>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

		<canvas id="canvas" />
	</>
)}`;
	},
	css() {
		return `/**
 * generated with https://huggingface.co/spaces/failfast/2D-GameCreator
 * by https://failfa.st
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
}
`;
	},
	js(content) {
		return `
/**
 * generated with https://huggingface.co/spaces/failfast/2D-GameCreator
 * by https://failfa.st
 */


/**
 * Global imports
 */
import Mousetrap from "https://cdn.skypack.dev/mousetrap@1.6.5";
import confetti from "https://cdn.skypack.dev/canvas-confetti@1.4.0";

/**
 * Helper to handle the resize of the window > canvas automatically
 */
function __2DGameCreator__ResizeHelper(){
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
__2DGameCreator__ResizeHelper()

function __2DGameCreator__downloadCanvasImage() {
    // Get the canvas element
    const canvas = document.getElementById('canvas');

    // Create a new 'a' element
    let link = document.createElement('a');

    // Set the download attribute with a file name
    link.download = 'canvas_image.png';

    // Get the data URL for the canvas
    link.href = canvas.toDataURL();

    // Trigger the click event on the link
    link.click();
}

// Uncomment if you want to take screenshots of the canvas
/*document.addEventListener("keydown", (e) => {
	if (e.isComposing || e.code === "KeyS") {
	  __2DGameCreator__downloadCanvasImage();
	  return;
	}
});*/

function createGameLoop(callback) {
    let lastTimestamp;

    function gameLoop(timestamp) {
        if (lastTimestamp) {
            const delta = timestamp - lastTimestamp;

            if (delta >= 1000 / 60) {
                lastTimestamp = timestamp;
                callback(delta);
            }
        } else {
            lastTimestamp = timestamp;
        }
        requestAnimationFrame(gameLoop);
    }

    return gameLoop;
}


/**
 * Generated 2D game
 */
${content}
`;
	},
};
