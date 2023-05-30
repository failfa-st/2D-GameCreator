import { Alert, Link, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { DividerBox, SectionBox, OutlinedBox } from "@/components/base/boxes";
import { systemMessage } from "@/constants";

export default function UnderTheHood() {
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
								href="https://github.com/failfa-st/2D-GameCreator"
								target="_blank"
								rel="noopener"
							>
								failfa-st/2D-GameCreator.
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
		</>
	);
}
