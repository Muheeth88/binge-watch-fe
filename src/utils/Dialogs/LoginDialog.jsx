import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const LoginDialog = (props) => {
	const navigate = useNavigate();

	const closeLoginDialog = (event) => {
		event.stopPropagation();
		props.setOpenLoginDialog(false);
	};

	const goToLogin = (e) => {
		e.stopPropagation();
		navigate("/login");
	};

	return (
		<Dialog open={props.openLoginDialog} onClose={(event) => closeLoginDialog(event)}>
			<DialogTitle id="alert-dialog-title">Login</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">Login to perform this action!</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={(event) => closeLoginDialog(event)}>Cancel</Button>
				<Button onClick={(e) => goToLogin(e)} autoFocus>
					Login
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default LoginDialog;
