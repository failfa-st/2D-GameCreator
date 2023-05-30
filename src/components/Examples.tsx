import {
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	Link,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from "@mui/material";
import { DividerBox, SectionBox } from "./base/boxes";
import { DynamicFeed, PrecisionManufacturing } from "@mui/icons-material";
import theme from "@/lib/theme";

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

			<Grid container>
				<Grid item sm={4}>
					<Card>
						<CardHeader
							title="Space Invaders Extreme"
							subheader={
								<>
									by{" "}
									<Link href="https://nerddis.co" target="_blank" rel="noopener">
										NERDDISCO
									</Link>
								</>
							}
						></CardHeader>
						<CardMedia
							component="img"
							image="img/space_invaders_extreme.jpg"
							height="256"
						/>
						<CardContent>
							<Table>
								<TableBody>
									<TableRow>
										<TableCell variant="head">Play</TableCell>
										<TableCell>
											{" "}
											<Link
												href="https://codesandbox.io/s/space-invaders-extreme-7xhp4v"
												target="_blank"
												rel="noopener"
											>
												on CodeSandbox
											</Link>
										</TableCell>
									</TableRow>

									<TableRow>
										<TableCell variant="head">Model</TableCell>
										<TableCell>GPT 3.5 Turbo</TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Iterations</TableCell>
										<TableCell>20</TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Controls</TableCell>
										<TableCell>
											Keyboard: Movement (Arrow Left, Arrow right), Shooting
											(Space), Restart (R)
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Hints</TableCell>
										<TableCell>
											The bigger the window, the easier it gets to play
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			<DividerBox />
		</>
	);
}
