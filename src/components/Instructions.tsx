import { Alert, Link, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { DividerBox, SectionBox, OutlinedBox } from "@/components/base/boxes";
import { systemMessage } from "@/constants";

export default function Instructions() {
	return (
		<>
			<DividerBox />

			<SectionBox>
				<Typography component="h3" variant="h2">
					Under the Hood
				</Typography>
			</SectionBox>

			<Paper>
				<List>
					<ListItem>
						<ListItemText>
							Build on top of{" "}
							<Link
								href="https://huggingface.co/spaces/failfast/nextjs-hf-spaces"
								target="_blank"
								rel="noopener"
							>
								nextjs-hf-spaces
							</Link>{" "}
							with NextJS + TypeScript +{" "}
							<Link
								href="https://github.com/openai/openai-node"
								target="_blank"
								rel="noopener"
							>
								openai-node
							</Link>
							. The full source code can be found on{" "}
							<Link
								href="https://github.com/failfa-st/2D-GameCreator-GPT"
								target="_blank"
								rel="noopener"
							>
								failfa-st/2D-GameCreator-GPT.
							</Link>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>Games are stored in localStorage.</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							We use a very strong <b>system message</b> to make sure that the AI
							behaves like a 2D Game Developer, where <b>&quot;TEMPLATE&quot;</b>{" "}
							refers to the code of the selected game in the{" "}
							<OutlinedBox>Games</OutlinedBox> list, intitally this is the{" "}
							<b>Base Game</b>:
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<code>
								<pre>{systemMessage}</pre>
							</code>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							The <b>user message</b> follows another template, to make sure that the
							selected <OutlinedBox>Command</OutlinedBox> is included and that the AI
							always returns the full source code, as this is easier to process
							instead of just parts of the code. The prompt is the message that you
							entered into the <OutlinedBox>prompt</OutlinedBox> field:
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<code>
								<pre>
									{`"$\{command\}": $\{prompt\}. Return the full source code of the game.
TEMPLATE:`}
								</pre>
							</code>
						</ListItemText>
					</ListItem>
				</List>
			</Paper>

			<SectionBox>
				<Typography component="h3" variant="h2">
					Troubleshooting
				</Typography>
			</SectionBox>

			<Paper sx={{ p: 1 }}>
				<Alert severity="error" sx={{ fontSize: "1.25rem", mb: 1 }}>
					Unhandled Runtime Error: SyntaxError: Unexpected identifier
				</Alert>

				<Typography variant="body1">
					The generated output was interrupted, as it was too long and the OpenAI API
					delivered not everything. If you can, switch to GPT-4 as it allows a bigger
					context size (change it in the options and also increase the max_tokens). If you
					can&apos;t do this, then please help us extend the GameCreator so that it can
					also resume when the output is interrupted.
				</Typography>
			</Paper>

			<DividerBox />

			<Paper sx={{ p: 1 }}>
				<Typography>
					You need help? Something is not working?{" "}
					<Link
						href="https://huggingface.co/spaces/failfast/2D-GameCreator-GPT/discussions"
						target="_blank"
						rel="noopener"
					>
						Please let us know!
					</Link>
				</Typography>
			</Paper>
		</>
	);
}
