// css and react imports
import "./../components/profile/Profile.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase imports
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  db,
  sendPasswordReset,
  setNewEmail,
  updateBio,
  updateAvatar,
} from "../components/firestore/firestore";

import { getDoc, doc } from "firebase/firestore";
import "firebase/compat/storage";

// MUI imports
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

// MUI style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Input = styled("input")({
  display: "none",
});

function Profile() {
  // states for user management
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  // mui modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [photoModal, setPhotoModal] = useState(false);
  const handleOpenPhotoUpload = () => setPhotoModal(true);
  const handleClosePhotoUpload = () => setPhotoModal(false);

  // user fetch

  const fetchUserName = async () => {
    const docRef = doc(db, "users", user?.uid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = { ...docSnap.data(), id };
      setName(userData.name);
      setId(userData.uid);
      setEmail(userData.email);
      setBio(userData.bio);
      setAvatar(userData.avatar);
    } else {
      return false;
    }
  };
  // condition for user fetch
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  const setNewBio = () => {
    console.log(bio);
    updateBio(bio);
  };

  const setNewAvatar = async (event) => {
    event.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(event.target[0].files[0]);
    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    const getData = await axios.post(
      `personal-recipe-app.herokuapp.com/user/avatar`,
      {
        image: avatar,
        name: id,
      }
    );
    try {
      updateAvatar(getData.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box component="section">
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Grid container sx={{ minHeight: "55vh" }}>
            <Grid item xs={12} sm={12} md={12}>
              {/* card start */}

              <Card sx={{ display: "flex" }}>
                <section
                  style={{
                    width: "40%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CardMedia component="img" image={`${avatar}`} />
                  <Input
                    htmlFor="contained-button-file"
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    name="files[]"
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    component="span"
                    sx={{ width: "100%" }}
                    onClick={handleOpenPhotoUpload}
                    value="Upload File"
                  >
                    Upload an Avatar
                    <PhotoCamera sx={{ marginLeft: 1 }} />
                  </Button>
                </section>
                <section>
                  <CardContent>
                    <Typography variant="h3" component="div">
                      Welcome: <b>{name}</b>
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body1"
                      sx={{ mt: 5 }}
                    >
                      ID: <b>{id}</b>
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body1"
                      sx={{ mt: 2 }}
                    >
                      Email: {email}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      variant="body1"
                      sx={{ mt: 2 }}
                    >
                      About Me:
                    </Typography>
                    <TextField
                      id="message"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      variant="outlined"
                      onChange={(e) => setBio(e.target.value)}
                      value={bio}
                    />
                    <Button variant="contained" onClick={setNewBio}>
                      Save changes
                    </Button>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => sendPasswordReset(email)}
                    >
                      Send password reset email
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      fullWidth
                      onClick={handleOpen}
                    >
                      Change Email Address
                    </Button>

                    <Button
                      fullWidth
                      type="click"
                      size="small"
                      sx={{ mt: 2 }}
                      variant="contained"
                      onClick={() => navigate("/delete_user")}
                    >
                      Delete User
                    </Button>
                  </CardActions>
                </section>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Email change and verification */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form action="submit">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              What is your new Email?
            </Typography>

            <TextField
              id="New email"
              fullWidth
              label="New Email"
              margin="normal"
              variant="outlined"
              onChange={(e) => setTempEmail(e.currentTarget.value)}
            />
            <TextField
              type="password"
              id="password"
              fullWidth
              label="Password for verification"
              margin="normal"
              variant="outlined"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <Button
              type="submit"
              fullWidth
              size="large"
              to={"/profile"}
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => setNewEmail(tempEmail, password)}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      {/* avatar upload */}
      <Modal
        open={photoModal}
        onClose={handleClosePhotoUpload}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form type="form" onSubmit={(e) => setNewAvatar(e)}>
            <input
              required
              accept="image/*"
              type="file"
              onChange={(e) => setAvatar(e)}
            ></input>
            <button type="submit">Upload</button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Profile;
