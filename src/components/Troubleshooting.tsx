import { Typography, Paper, Alert, Link } from "@mui/material";
import { SectionBox, DividerBox } from "./base/boxes";

export default function Troubleshooting() {
	return (
		<>
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
					can&apos;t do this, then please help us extend the 2D GameCreator so that it can
					also resume when the output is interrupted.
				</Typography>
			</Paper>

			<DividerBox />

			<Paper sx={{ p: 1 }}>
				<Alert severity="error" sx={{ fontSize: "1.25rem", mb: 1 }}>
					Network Error
				</Alert>

				<Typography variant="body1">
					There might have been a timeout or something else. Please try again.
				</Typography>
			</Paper>

			<DividerBox />

			<Paper sx={{ p: 1 }}>
				<Typography>
					You need help? Something is not working?{" "}
					<Link
						href="https://huggingface.co/spaces/failfast/2D-GameCreator/discussions"
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
