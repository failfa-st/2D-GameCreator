import {
	Divider,
	DividerProps,
	ListItemButton,
	ListItemButtonProps,
	Paper,
	PaperProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const SectionBox = styled(Paper)<PaperProps>(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: 10,
	padding: 15,
	paddingTop: 30,
	paddingBottom: 30,
	marginBottom: 20,
	background: `linear-gradient(to bottom right, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
}));

export const HighlightBox = styled(Paper)<PaperProps>(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: 10,
	borderBottom: `3px solid transparent`,
	borderImage: `linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)`,
	borderImageSlice: 1,
}));

export const RainbowBox = styled("div")(({ theme }) => ({
	border: `1px solid transparent`,
	borderImage: `linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)`,
	borderImageSlice: 1,
}));

export const RainbowListItemButton = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
	border: `1px solid transparent`,
	borderImage: `linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)`,
	borderImageSlice: 1,
}));

export const DividerBox = styled(Divider)<DividerProps>(({ theme }) => ({
	marginTop: 20,
	marginBottom: 20,
	background: "transparent",
	border: "none",
}));

export const MarkerBox = styled("span")(({ theme }) => ({
	padding: 2,
	background: `linear-gradient(to bottom right, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
}));

export const OutlinedBox = styled("span")(({ theme }) => ({
	...theme.typography.body1,
	padding: theme.spacing(0.25),
	border: `1px solid ${theme.palette.grey[800]}`,
	borderRadius: theme.shape.borderRadius,
	transition: theme.transitions.create(["border-color", "box-shadow"]),
}));
