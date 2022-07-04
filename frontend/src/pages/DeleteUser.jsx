// react imports
import React, { useState } from "react";

//image import
import DontGo from "../img/DontGo.png";

// mui imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

//firestore imports
import { DeleteCurrentUser } from "../components/firestore/firestore";

function DeleteUser() {
  const [password, setPassword] = useState("");

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 10,
        bgcolor: "white",
      }}
    >
      <Box
        alt="DontGo"
        component="img"
        src={DontGo}
        sx={{ height: "100%", width: "100%", mb: 2 }}
      />
      <Typography
        sx={{ textAlign: "center" }}
        component="div"
        gutterBottom
        variant="h6"
      >
        Are you sure you want to delete all user data?
      </Typography>

      <Typography color="text.secondary">There is no turning back!</Typography>
      <TextField
        type="password"
        id="password"
        fullWidth
        label="Password for verification"
        margin="normal"
        variant="outlined"
        onChange={(e) => setPassword(e.currentTarget.value)}
      ></TextField>
      <Button
        fullWidth
        type="click"
        size="small"
        sx={{ mt: 2 }}
        variant="contained"
        onClick={() => DeleteCurrentUser(password)}
      >
        Delete User
      </Button>
    </Container>
  );
}

export default DeleteUser;
