//react imports
import React from "react";
import { useNavigate } from "react-router-dom";

// firestore imports
import { Logout } from "../components/firestore/firestore";

//mui imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//mui style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SignOut() {
  const navigate = useNavigate();

  const UserLogout = (e) => {
    e.preventDefault();
    try {
      Logout();
    } catch (error) {
      console.log(error);
    }
    return navigate("/");
  };

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Are you sure you want to log out?
      </Typography>
      <Button
        fullWidth
        size="large"
        to={"/"}
        variant="contained"
        onClick={(e) => UserLogout(e)}
      >
        Logout
      </Button>
    </Box>
  );
}
