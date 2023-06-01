import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	Grid,
	Link,
	Table,
	TableBody,
	TableRow,
	TableCell,
} from "@mui/material";

export interface Example {
	title: string;
	creatorLink: string;
	creatorName: string;
	image: string;
	playLink: string;
	model: string;
	iterations: number;
	controls: string;
	hints: string;
}

interface ExamplesGridProps {
	examples: Example[];
}

export default function ExamplesGrid({ examples }: ExamplesGridProps) {
	return (
		<Grid container spacing={2}>
			{examples.map((example, index) => (
				<Grid item sm={4} key={index}>
					<Card sx={{ height: "100%" }}>
						<CardHeader
							title={example.title}
							subheader={
								<>
									by{" "}
									<Link href={example.creatorLink} target="_blank" rel="noopener">
										{example.creatorName}
									</Link>
								</>
							}
						/>
						<CardMedia component="img" image={example.image} height="384" />
						<CardContent>
							<Table>
								<TableBody>
									<TableRow>
										<TableCell variant="head">Play</TableCell>
										<TableCell>
											{" "}
											<Link
												href={example.playLink}
												target="_blank"
												rel="noopener"
											>
												on CodeSandbox
											</Link>
										</TableCell>
									</TableRow>

									<TableRow>
										<TableCell variant="head">Model</TableCell>
										<TableCell>{example.model}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Iterations</TableCell>
										<TableCell>{example.iterations}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Controls</TableCell>
										<TableCell>{example.controls}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Hints</TableCell>
										<TableCell>{example.hints}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}
