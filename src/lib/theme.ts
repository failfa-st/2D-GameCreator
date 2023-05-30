import { Fira_Code, Poppins } from "next/font/google";
import { experimental_extendTheme as extendTheme, Theme } from "@mui/material/styles";

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
					main: "#2c90fc",
				},
				secondary: {
					main: "#b827fc",
				},
			},
		},
		dark: {
			palette: {
				primary: {
					main: "#2c90fc",
				},
				secondary: {
					main: "#b827fc",
				},
				text: {
					secondary: "#ffffff",
				},
			},
		},
	},
	typography: {
		...poppins.style,
		h1: {
			fontSize: "5em",
		},
	},
	components: {
		MuiLink: {
			styleOverrides: {
				root: {
					textDecoration: "none",
					":hover": {
						textDecoration: "underline",
					},
				},
			},
		},
		MuiListSubheader: {
			styleOverrides: {
				root: {
					fontSize: "1.35rem",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				startIcon: ({ ownerState }) => ({
					...(ownerState.children
						? {}
						: {
								// if no button label, center icon (e.g mobile)
								marginRight: 0,
						  }),
				}),
			},
		},
	},
});

export default theme;
export const fontMono = Fira_Code({
	subsets: ["latin"],
});
