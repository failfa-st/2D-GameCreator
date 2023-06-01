export const baseGame = {
	default: `const canvas = document.querySelector('canvas');
canvas.style.backgroundColor = '#fff';
const ctx = canvas.getContext('2d');

function draw(delta) {
	// TODO: Add drawing logic here
}

// NEVER stop the gameloop
requestAnimationFrame(createGameLoop(draw));
`.trim(),
};
