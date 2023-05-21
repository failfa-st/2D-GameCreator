import { useState } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { poppins } from "@/lib/theme";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";

export function EditTitle({ value, onSave }: { value: string; onSave(value: string): void }) {
	const [text, setText] = useState(value);
	return (
		<>
			<Box
				sx={{
					pl: 3,
					pr: 6,
					flex: 1,
					display: "flex",
					alignItems: "center",
				}}
			>
				<InputBase
					autoFocus
					value={text}
					sx={{
						width: "100%",
						fontSize: 16,
						input: { ...poppins.style, p: 0, lineHeight: 1.5 },
					}}
					onChange={event => {
						setText(event.target.value);
					}}
					onBlur={() => {
						onSave(text);
					}}
				/>
			</Box>
			<IconButton
				onClick={() => {
					onSave(text);
				}}
			>
				<SaveIcon />
			</IconButton>
		</>
	);
}
