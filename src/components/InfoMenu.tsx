import { useState, MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/router";

export function InfoMenu() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const router = useRouter();
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				aria-label="Info"
				id="infoMenu-button"
				aria-controls={open ? "infoMenu-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<InfoIcon />
			</IconButton>
			<Menu
				id="infoMenu-menu"
				MenuListProps={{
					"aria-labelledby": "infoMenu-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						width: "20ch",
					},
				}}
			>
				<MenuItem
					onClick={async () => {
						await router.push("/legal/data-policy");
						handleClose();
					}}
				>
					Data Policy
				</MenuItem>
				<MenuItem
					onClick={async () => {
						await router.push("/legal/imprint");
						handleClose();
					}}
				>
					Imprint
				</MenuItem>
				<MenuItem
					onClick={async () => {
						await router.push("/legal/cookie-policy");
						handleClose();
					}}
				>
					Cookie Policy
				</MenuItem>
			</Menu>
		</div>
	);
}
