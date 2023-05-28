import axios from "axios";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ShareProps } from "@/components/GameCreator";

export function Codesandbox({ title, content }: ShareProps) {
	return (
		<Tooltip title="Save to Codesandbox">
			<IconButton
				color="primary"
				aria-label="Codsandbox"
				onClick={async () => {
					const { data } = await axios.post<string>("/api/url/codesandbox", {
						content,
						title,
					});
					window.open(data, "_blank");
				}}
			>
				<CropSquareIcon />
			</IconButton>
		</Tooltip>
	);
}
