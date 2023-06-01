export const baseGame = {
	default: `const canvas = document.querySelector('canvas');
canvas.style.backgroundColor = '#fff';
const ctx = canvas.getContext('2d');

function draw(delta) {
	// TODO: Add drawing logic here
}

// DO NOT CHANGE THE FOLLOWING LINE
requestAnimationFrame(window.createGameLoop(draw));
`.trim(),
};
