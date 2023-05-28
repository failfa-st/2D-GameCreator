import Script from "next/script";
import Mousetrap from "mousetrap";
import confetti from "canvas-confetti";

import { useEffect } from "react";

const styles = (
	<style>
		{`
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
		#__next {
			display: contents;
		}
		`}
	</style>
);
export default function Page() {
	useEffect(() => {
		window.Mousetrap = Mousetrap;
		window.confetti = confetti;
	}, []);

	return (
		<>
			{styles}
			<canvas id="canvas" />
			<Script src="/js/utils.js" />
		</>
	);
}
