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
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function Introduction() {
	return (
		<Stack direction="row" spacing={2}>
			<Grid container gap={2} sx={{ justifyContent: "center" }}>
				<Grid item md={4}>
					<Typography sx={{ mb: 1 }}>
						Your job is to provide a prompt that describes the game you want, so that
						your skilled 2D Game Developer can built it for you using JavaScript on
						Canvas2D.
					</Typography>

					<Typography>
						We would love to use open-source models for this (for example{" "}
						<Link
							href="https://huggingface.co/HuggingFaceH4/starchat-alpha"
							target="_blank"
							rel="noopener"
						>
							starchat-alpha
						</Link>
						), but running a private Inference Endpoint is too expensive for us. If you
						would love to help us, then{" "}
						<Link
							href="https://discord.com/invite/m3TBB9XEkb"
							target="_blank"
							rel="noopener"
						>
							let&apos;s talk
						</Link>
						!
					</Typography>
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
									Select one of the <b>examples</b>
								</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<PlayArrowIcon />
								</ListItemIcon>
								<ListItemText>
									Click on <b>Run</b>
								</ListItemText>
							</ListItem>
						</List>
					</Paper>
				</Grid>
			</Grid>
		</Stack>
	);
}
