export const base = {
	default: `const canvas = document.querySelector('canvas');
canvas.style.backgroundColor = '#fff';
const ctx = canvas.getContext('2d');

function draw(){
	const FPS = 60;

	// TODO: Add drawing logic here

	// NEVER stop the loop
	setTimeout(requestAnimationFrame(draw),1000/FPS)
}
draw();
    `.trim(),
};

export const COMMAND_CREATE_GAME = "CREATE_GAME";
export const COMMAND_ADD_FEATURE = "ADD";
export const COMMAND_REMOVE_FEATURE = "REMOVE";
export const COMMAND_EXTEND_FEATURE = "EXTEND";
export const COMMAND_FIX_BUG = "FIX";
