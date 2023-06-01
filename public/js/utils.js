const canvas = document.querySelector("#canvas");

function handleResize() {
	requestAnimationFrame(() => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});
}
handleResize();
window.addEventListener("resize", handleResize, { passive: true });

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

function downloadCanvasImage() {
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


const clients = {
	host: "__ESDEKA::host__",
	guest: "__ESDEKA::guest__",
};

// Shared communicators

function subscribe(channel, callback) {
	function handleMessage(event) {
		if (
			event.data.client &&
			Object.values(clients).includes(event.data.client) &&
			event.data.channel === channel
		) {
			callback(event);
		}
	}
	window.addEventListener("message", handleMessage);

	return () => {
		window.removeEventListener("message", handleMessage);
	};
}
const host = {};
// Guest communicators

function answer(window_, channel, targetOrigin = "*") {
	window_.postMessage(
		{
			client: clients.guest,
			channel,
			action: {
				type: "answer",
			},
		},
		targetOrigin
	);
}

function handleTemplate(template) {
	Function("Template", `${template}`)();
}

subscribe("2DGameCreator", event => {
	const { action } = event.data;
	switch (action.type) {
		case "call":
			host.current = event.source;
			answer(event.source, "2DGameCreator");
			handleTemplate(action.payload.template);
			break;
		case "broadcast":
			handleTemplate(action.payload.template);
			break;
		default:
			break;
	}
});
