import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SyntheticEvent } from "react";
import { Alert, SnackbarContent } from "@mui/material";

interface SnackbarProps {
	showError: boolean;
	handleClose: (event: SyntheticEvent | Event, reason?: string) => void;
	message: string;
}

export default function SimpleSnackbar({ showError, handleClose, message }: SnackbarProps) {
	const action = (
		<>
			<Button color="secondary" size="small" onClick={handleClose}>
				UNDO
			</Button>
			<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
				<CloseIcon fontSize="small" />
			</IconButton>
		</>
	);

	return (
		<Snackbar
			open={showError}
			autoHideDuration={6000}
			onClose={handleClose}
			action={action}
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
		>
			<Alert severity="error">{message}</Alert>
		</Snackbar>
	);
}
