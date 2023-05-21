import { Fira_Code, Poppins } from "next/font/google";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

export const poppins = Poppins({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme = extendTheme({
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: "#40088d",
				},
				secondary: {
					main: "#038225",
				},
			},
		},
		dark: {
			palette: {
				primary: {
					main: "#00d720",
				},
				secondary: {
					main: "#cc06ed",
				},
			},
		},
	},
	typography: {
		...poppins.style,
		h1: {
			fontSize: "3em",
			marginBottom: 24,
		},
		h2: {
			fontSize: "1.9em",
			marginBottom: 12,
		},
		h3: {
			fontSize: "1.7em",
			marginBottom: 12,
		},
		h4: {
			fontSize: "1.25em",
			marginBottom: 12,
		},
		h5: {
			fontSize: "1em",
			marginBottom: 12,
		},
		h6: {
			fontSize: "0.8em",
			marginBottom: 12,
		},
	},
});

export default theme;
export const fontMono = Fira_Code({
	subsets: ["latin"],
});
