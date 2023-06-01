import {
	Stack,
	Grid,
	Typography,
	Paper,
	List,
	ListSubheader,
	ListItem,
	ListItemIcon,
	ListItemText,
	Link,
	Button,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { PlayArrow } from "@mui/icons-material";

export default function Introduction() {
	return (
		<Stack direction="row" spacing={2}>
			<Grid container gap={2} sx={{ justifyContent: "center" }}>
				<Grid item md={4}>
					<Stack spacing={2}>
						<Typography>
							Provide a prompt detailing your desired game, and our 2D Game Developer
							will build it. The game operates directly in your browser via JavaScript
							on Canvas2D.
						</Typography>

						<Typography>
							This demo is ideal for crafting simple games and rapid prototyping.
							However, due to the limited context size and single-request design,
							there are constraints on the code volume.
						</Typography>

						<Typography>
							We are looking into integrating open-source models (for example{" "}
							<Link
								href="https://huggingface.co/HuggingFaceH4/starchat-alpha"
								target="_blank"
								rel="noopener"
							>
								starchat-alpha
							</Link>
							) next, so stay tuned!
						</Typography>
					</Stack>
				</Grid>
				<Grid item md={4}>
					<Stack spacing={2}>
						<Paper>
							<List disablePadding>
								<ListSubheader>Quickstart</ListSubheader>
								<ListItem>
									<ListItemIcon>
										<KeyIcon />
									</ListItemIcon>
									<ListItemText>
										{" "}
										Add your&nbsp;
										<Link
											href="https://platform.openai.com/account/api-keys"
											target="_blank"
											rel="noopener"
										>
											OpenAI API key
										</Link>
									</ListItemText>
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<SmartButtonIcon />
									</ListItemIcon>
									<ListItemText>
										Select one of the <b>Examples</b>
									</ListItemText>
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<PlayArrowIcon />
									</ListItemIcon>
									<ListItemText>
										Click on &nbsp;
										<Button variant="contained" startIcon={<PlayArrow />}>
											<Typography sx={{ fontWeight: "500" }}>Run</Typography>
										</Button>
										&nbsp;
									</ListItemText>
								</ListItem>
							</List>
						</Paper>

						<Typography>
							You are stuck?{" "}
							<Link
								href="https://huggingface.co/spaces/failfast/2D-GameCreator/discussions"
								target="_blank"
								rel="noopener"
							>
								We are here to help!
							</Link>
						</Typography>
					</Stack>
				</Grid>
			</Grid>
		</Stack>
	);
}
