import { Link, Typography } from "@mui/material";
import { DividerBox, SectionBox } from "./base/boxes";
import ExamplesGrid, { Example } from "@/components/ExamplesGrid";

const examples: Example[] = [
	{
		title: "Space Invaders Extreme",
		creatorLink: "https://nerddis.co",
		creatorName: "NERDDISCO",
		image: "img/space_invaders_extreme.jpg",
		playLink: "https://codesandbox.io/s/space-invaders-extreme-7xhp4v",
		model: "GPT 3.5 Turbo",
		iterations: 20,
		controls: "Keyboard: Movement (Arrow Left, Arrow right), Shooting (Space), Restart (R)",
		hints: "The bigger the window, the easier it gets to play",
	},
	{
		title: "Flappy Bird SPEED",
		creatorLink: "https://nerddis.co",
		creatorName: "NERDDISCO",
		image: "img/flappy_bird_speed.jpg",
		playLink: "https://codesandbox.io/s/flappy-bird-speed-rg9z6f",
		model: "GPT 4.0",
		iterations: 24,
		controls: "Keyboard: Fly (space)",
		hints: "Don't collide with the pipes ;)",
	},
];

export default function Examples() {
	return (
		<>
			<DividerBox />

			<SectionBox>
				<Typography component="h3" variant="h2">
					Example Games
				</Typography>
				<Typography variant="body1">
					We re-created some of our favorite games! You want to share your game with the
					community? Then head over to our{" "}
					<Link
						href="https://discord.com/invite/m3TBB9XEkb"
						target="_blank"
						rel="noopener"
						sx={{ verticalAlign: "bottom" }}
					>
						<img
							style={{ verticalAlign: "bottom" }}
							src="https://img.shields.io/discord/1091306623819059300?color=7289da&label=Discord&logo=discord&logoColor=fff&style=for-the-badge"
						/>
					</Link>
					, post it in #showcase and we might add it to this section as well!
				</Typography>
			</SectionBox>

			<ExamplesGrid examples={examples} />

			<DividerBox />
		</>
	);
}
