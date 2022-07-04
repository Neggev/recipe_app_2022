//react imports

import * as React from "react";

//mui imports
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link/Link";

export default function Album() {
  return (
    <main style={{ display: "flex", alignItems: "center", height: "45rem" }}>
      <Container
        maxWidth="sm"
        sx={{ bgcolor: "#313131", borderRadius: "25px" }}
      >
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="white"
          gutterBottom
        >
          Welcome to our recipe search website
        </Typography>
        <Typography variant="h5" align="center" color="white" paragraph>
          This website is for people who have a hard time managing their meals.
          Search from our curated community recipes and easily add them to your
          favorites.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            textDecoration: "none",
            color: "white",
          }}
        >
          <Button variant="contained" sx={{ bgcolor: "#313131" }}>
            <Link href="/login" color="inherit">
              Login
            </Link>
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#313131" }}>
            <Link href="/register" color="inherit">
              Register
            </Link>
          </Button>
        </Box>
      </Container>
    </main>
  );
}
