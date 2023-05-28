export const baseGame = {
	default: `const canvas = document.querySelector('canvas');
canvas.style.backgroundColor = '#fff';
const ctx = canvas.getContext('2d');
const w = canvas.width;
const h = canvas.height;

function draw(){
	const FPS = 60;

	// TODO: Add drawing logic here

	// NEVER stop the loop
	setTimeout(requestAnimationFrame(draw),1000/FPS)
}
draw();
    `.trim(),
};
