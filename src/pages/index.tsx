import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import Footer from "@/components/footer";
import Title from "@/components/title";
import Introduction from "@/components/Introduction";
import UnderTheHood from "@/components/UnderTheHood";
import Examples from "@/components/Examples";
import GameCreator from "@/components/GameCreator";
import HowToUse from "@/components/HowToUse";
import Troubleshooting from "@/components/Troubleshooting";

export default function Home() {
	return (
		<>
			<CssBaseline />
			<Container sx={{ maxWidth: { xl: "1536px", md: "100%" } }}>
				<Title />

				<Stack gap={5}>
					<Introduction />

					<GameCreator />
				</Stack>

				<Examples />

				<HowToUse />

				<UnderTheHood />

				<Troubleshooting />

				<Footer />
			</Container>
		</>
	);
}
