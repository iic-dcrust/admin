import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import profile from "./profile.png";
import { useStyles } from "../HeaderStyles";
import { GoogleLogin } from "react-google-login";
import axios from "../../../helpers/axios";

export default function Profile() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const responseGoogle = async (res) => {
		try {
			let response = await axios.post(
				"/api/users/google",
				JSON.stringify({ idToken: res.tokenId })
			);

			if (response.data.email) {
				localStorage.setItem("token", response.data.token);
			} else {
				alert("Unexpected Error");
			}
		} catch (err) {
			if (err.response) {
				if (err.response.status === 400) {
					alert(err.response.data.error);
				} else if (err.response.status === 500) {
				}
			} else {
				alert(err);
			}
		}
	};

	const dropDownData = [{ label: "Logout", icon: <ExitToAppIcon /> }];

	return (
		<Box>
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
				buttonText="Login"
				onSuccess={responseGoogle}
				onFailure={(err) => {
					console.error(err);
				}}
				cookiePolicy={"single_host_origin"}
			/>
			{/* <Button
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
				startIcon={
					<Avatar src={profile} className={classes.navAvatar}></Avatar>
				}
			></Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{dropDownData.map((item, i) => (
					<MenuItem key={i} component={ListItem} onClick={handleClose}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText>{item.label}</ListItemText>
					</MenuItem>
				))}
			</Menu> */}
		</Box>
	);
}
