import { PlayArrow, Code, Replay, CropSquare, Clear } from "@mui/icons-material";
import {
	Button,
	Grid,
	IconButton,
	List,
	ListItem,
	ListSubheader,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { OutlinedBox, SectionBox, RainbowBox } from "@/components/base/boxes";
import { Key } from "react";

const workflowSteps = [
	{
		title: "Editor Usage Tips",
		steps: [
			"We are limited by the context-size of the selected model, the scope of the game shouldn't be super huge (for example 'asteroids' is a game with small scope while 'fortnite' is way too big)",
			"It's good to start with simple features, main mechanics first using the base game + the create game command.",
			'Iterate on this. For example "Flappy Bird. Intro screen, start the game by pressing space key."',
			"See if the generated result is what you expect. Continue there, add more features. Either by using the add feature command or by extending the prompt itself and start from scratch (select the base game + create game command).",
			"Make always sure to check the selected game in the games list, as this is used as the foundation for the next iteration.",
			"Cancel generating the game at any time by pressing the cancel button button next to run button.",
		],
	},
	{
		title: "Create a New Game",
		steps: [
			"Input your game concept into the prompt field.",
			"Make sure the command field is set to create game.",
			"Ensure that the base game is selected in the games list.",
			"Click on run to start the game creation process.",
			"Once the game generation is complete, it will be added to the games list and selected automatically.",
			"You can view the newly created game in the game preview section.",
		],
	},
	{
		title: "Add a New Feature",
		steps: [
			"Clear the prompt field and input the new feature you want to add.",
			"Set the command field to add feature.",
			"Ensure that the previously generated game is selected in the games list.",
			"Click on run to start the feature addition process.",
			"Once the feature addition is complete, it will be added to the games list and selected automatically.",
			"If a bug appears in the process, proceed to the next section.",
		],
	},
	{
		title: "Fix a Bug",
		steps: [
			"Clear the prompt field and input the bug that you have encountered.",
			"Set the command field to fix bug.",
			"Ensure that the game with the bug is selected in the games list.",
			"Click on run to start the bug fixing process.",
			"Once the bug fixing is complete, it will be reflected in the selected game in the games list.",
		],
	},
	{
		title: "Extend a Feature",
		steps: [
			"Clear the prompt field and input the changes you want to make to the feature.",
			"Set the command field to extend feature.",
			"Ensure that the game with the feature is selected in the games list.",
			"Click on run to start the feature extension process.",
			"Once the feature extension is complete, it will be reflected in the selected game in the games list.",
		],
	},
	{
		title: "Start From Scratch",
		steps: [
			"Clear the prompt field and input a new game concept.",
			"Set the command field to create game.",
			"Ensure that the base game is selected in the games list.",
			"Click on run to start the new game creation process.",
			"Once the game generation is complete, it will be added to the games list and selected automatically.",
			"You can view the newly created game in the game preview section.",
		],
	},
	{
		title: "Viewing & Editing Source Code",
		steps: [
			"To see the source code of the selected game, click the source code button in the header. This will open a code editor where you can manually change the code if desired.",
			"Save changes with CTRL+S using your keyboard.",
		],
	},
	{
		title: "Refreshing Game Preview",
		steps: [
			"The refresh button in the header of the game preview refreshes the game preview.",
			"Click this if you've made changes and want to see them reflected in the game preview and for what ever reason the game preview didn't refresh automatically.",
			"It's also useful if you are GAME OVER and have not added a feature to restart the game yet.",
		],
	},
	{
		title: "Exporting to CodeSandbox",
		steps: [
			"To export your game to CodeSandbox, click the share on codesandbox button in the game preview header.",
			"Note: This feature will not work for the base game; it can only export generated games.",
		],
	},
	{
		title: "Using Options",
		steps: [
			"Open the Options by clicking on them",
			"Switch the model between gpt-4 and gpt-3.5-turbo (default)",
			"Update the max_tokens to 4096 (gpt-4), default is 2048 (gpt-3.5-turbo)",
			"Make changes to the temperature if you want more random (value closer to 1.0) results, default is 0.2 (not very random)",
		],
	},
];

function parseString(string: string) {
	const keywords = {
		prompt: (item: string, index: Key | null | undefined) => (
			<>
				&nbsp;<OutlinedBox key={index}>{item}</OutlinedBox>&nbsp;
			</>
		),
		command: (item: string, index: Key | null | undefined) => (
			<>
				&nbsp;<OutlinedBox key={index}>{item}</OutlinedBox>&nbsp;
			</>
		),
		options: (item: string, index: Key | null | undefined) => (
			<>
				&nbsp;<OutlinedBox key={index}>Options</OutlinedBox>&nbsp;
			</>
		),
		games: (item: string, index: Key | null | undefined) => (
			<>
				&nbsp;<OutlinedBox key={index}>Games</OutlinedBox>&nbsp;
			</>
		),
		run: (item: string, index: Key | null | undefined) => (
			<>
				&nbsp;
				<Button variant="contained" startIcon={<PlayArrow />} key={index}>
					<Typography sx={{ fontWeight: "500" }}>Run</Typography>
				</Button>
				&nbsp;
			</>
		),
		"cancel button": (item: string, index: Key | null | undefined) => (
			<>
				&nbsp;
				<Button
					variant="contained"
					color="error"
					startIcon={<Clear />}
					key={index}
				></Button>
				&nbsp;
			</>
		),
		"source code button": (item: string, index: Key | null | undefined) => (
			<>
				&nbsp;
				<IconButton color="inherit" aria-label={"Show Code"}>
					<Code />
				</IconButton>
				button&nbsp;
			</>
		),
		"refresh button": (item: string, index: Key | null | undefined) => (
			<>
				&nbsp;
				<IconButton color="inherit" aria-label={"Refresh"}>
					<Replay />
				</IconButton>
				button&nbsp;
			</>
		),
		"codesandbox button": (item: string, index: Key | null | undefined) => (
			<>
				&nbsp;
				<IconButton color="inherit" aria-label={"Save to codesandbox"}>
					<CropSquare />
				</IconButton>
				button&nbsp;
			</>
		),
		"game preview": (item: string, index: Key | null | undefined) => (
			<b key={index}>&nbsp;Game Preview&nbsp;</b>
		),
		"base game": (item: string, index: Key | null | undefined) => (
			<b key={index}>&nbsp;Base Game&nbsp;</b>
		),
		"create game": (item: string, index: Key | null | undefined) => (
			<b key={index}>&nbsp;{item.trim()}&nbsp;</b>
		),
		"add feature": (item: string, index: Key | null | undefined) => (
			<b key={index}>&nbsp;{item.trim()}&nbsp;</b>
		),
		"remove feature": (item: string, index: Key | null | undefined) => (
			<b key={index}>&nbsp;{item.trim()}&nbsp;</b>
		),
		"extend feature": (item: string, index: Key | null | undefined) => (
			<b key={index}>&nbsp;{item.trim()}&nbsp;</b>
		),
		"fix bug": (item: string, index: Key | null | undefined) => (
			<b key={index}>&nbsp;{item.trim()}&nbsp;</b>
		),
		model: (item: string, index: Key | null | undefined) => (
			<b key={index}>&nbsp;{item.trim()}&nbsp;</b>
		),
		max_tokens: (item: string, index: Key | null | undefined) => (
			<b key={index}>&nbsp;{item.trim()}&nbsp;</b>
		),
		temperature: (item: string, index: Key | null | undefined) => (
			<b key={index}>&nbsp;{item.trim()}&nbsp;</b>
		),
	};

	Object.keys(keywords).forEach(keyword => {
		const regex = new RegExp(`\\s*\\b${keyword}\\b\\s*`, "gi");
		string = string.replace(regex, `|${keyword}|`);
	});

	const items = string.split("|").filter(item => item !== "");

	return items.map((item, index) => {
		if (keywords.hasOwnProperty(item.trim())) {
			return keywords[item.trim() as keyof typeof keywords](item.trim(), index);
		} else {
			return item;
		}
	});
}

export default function HowToUse() {
	return (
		<>
			<SectionBox>
				<Typography component="h3" variant="h2">
					How to use?
				</Typography>
			</SectionBox>

			<Grid container spacing={2}>
				{workflowSteps.map(({ title, steps }, index) => {
					return (
						<Grid item key={index} md={4}>
							<Paper>
								<List disablePadding>
									<RainbowBox sx={{ mb: 2 }}>
										<ListSubheader>{title}</ListSubheader>
									</RainbowBox>

									{steps.map((step, index) => {
										return (
											<ListItem key={index}>
												<Typography>
													<>{parseString(step)}</>
												</Typography>
											</ListItem>
										);
									})}
								</List>
							</Paper>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}
