//mui imports
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Box from "@mui/material/Box/Box";
import Link from "@mui/material/Link/Link";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        bottom: "0",
        width: "100%",
        height: "7rem",
      }}
    >
      <Box
        py={{ xs: 5, sm: 3 }}
        bgcolor="text.primary"
        color="white"
        style={{ position: "fixed", bottom: "0", width: "100%" }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link href="/" color="inherit">
                  Contact
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Support
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Account</Box>
              <Box>
                <Link href="/login" color="inherit">
                  Login
                </Link>
              </Box>
              <Box>
                <Link href="/register" color="inherit">
                  Register
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}
