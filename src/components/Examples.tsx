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

export default function Examples() {
	return (
		<>
			<DividerBox />

			<SectionBox>
				<Typography component="h3" variant="h2">
					Example Games
				</Typography>
			</SectionBox>

			<Grid container>
				<Grid item sm={4}>
					<Card>
						<CardHeader title="Space Invaders Extreme"></CardHeader>
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
												via Codesandbox
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
