//react imports

import * as React from "react";

// mui imports
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function About() {
  return (
    <main>
      <Container maxWidth="sm">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="white"
          gutterBottom
        >
          About
        </Typography>
        <Typography variant="h5" align="center" color="white" paragraph>
          This is a personal project for Simonetix Pro
        </Typography>
      </Container>
    </main>
  );
}
