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
							You provide a prompt that describes the game you want, so that your
							skilled 2D Game Developer can built it for you. The game runs directly
							in your browser (thanks to JavaScript on Canvas2D).
						</Typography>

						<Typography>
							You are stuck?{" "}
							<Link
								href="https://huggingface.co/spaces/failfast/2D-GameCreator-GPT/discussions"
								target="_blank"
								rel="noopener"
							>
								We are here to help!
							</Link>
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
				</Grid>
			</Grid>
		</Stack>
	);
}
