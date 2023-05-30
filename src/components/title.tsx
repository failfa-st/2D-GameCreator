import { Button, Link, Paper, Stack, Typography } from "@mui/material";
import { HighlightBox } from "./base/boxes";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function Title() {
	return (
		<Stack
			spacing={4}
			sx={{
				justifyContent: "center",
				alignItems: "center",
				minHeight: "40vh",
				p: 4,
			}}
		>
			<Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2em", md: "5em" } }}>
				2D GameCreator
			</Typography>

			<HighlightBox>
				<Typography variant="h5" component="p">
					text-to-game using OpenAI GPT 3.5 / GPT 4
				</Typography>
			</HighlightBox>

			<Stack gap={2} direction="row">
				<Link
					href="https://discord.com/invite/m3TBB9XEkb"
					target="_blank"
					rel="noopener"
					sx={{ alignSelf: "end" }}
				>
					<img src="https://img.shields.io/discord/1091306623819059300?color=7289da&label=Discord&logo=discord&logoColor=fff&style=for-the-badge" />
				</Link>

				<Button
					href="https://github.com/failfa-st/nextjs-docker-starter"
					target="_blank"
					rel="noopener"
				>
					Contribute on GitHub
				</Button>
			</Stack>
		</Stack>
	);
}
