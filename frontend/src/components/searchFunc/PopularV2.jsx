// react imports
import React from "react";
import { useEffect, useState } from "react";

// mui imports
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// mui style
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Popular() {
  const [expanded, setExpanded] = useState(false);
  const [btnColor, setColor] = useState("");
  const [expandedId, setExpandedId] = useState(-1);

  //useState for state of popular items
  const [popular, setPopular] = useState([]);

  //calling fetch function anytime component is rendered
  useEffect(() => {
    getPopularItems();
  }, []);

  //fetching data from api and setting data to state
  const getPopularItems = async () => {
    const api = await fetch(`http://localhost:8000/search`);
    const data = await api.json();
    setPopular(data.recipes);
    console.log(data.recipes);
  };

  const handleExpandClick = (key) => {
    setExpandedId(expandedId === key ? -1 : key);
  };
  function addToFavorites(event) {
    if (btnColor === "red") {
      setColor("grey");
    } else setColor("red");
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Box sx={{ textAlign: "start", mb: 10 }}>
          <Typography variant="h4" sx={{ color: "white" }}>
            Popular Recipes:
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {!popular ? (
            <>
              <h1>Loading...</h1>
            </>
          ) : (
            popular.map((item, key) => (
              <Grid key={item.id} item>
                <Card
                  sx={{
                    minWidth: 345,
                    maxWidth: 345,
                    minHeight: "40vh",
                    position: "relative",
                  }}
                  key={item.id}
                >
                  <CardHeader title={item.title} sx={{ minHeight: "3.2vh" }} />
                  <section
                    style={{
                      position: "absolute",
                      bottom: "0",
                      width: "100%",
                      background: "white",
                      maxHeight: 600,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="194"
                      image={item.image}
                      alt="No Pic"
                    />

                    <CardActions disableSpacing>
                      <IconButton
                        aria-label="add to favorites"
                        className={btnColor}
                        onClick={() => addToFavorites(item.id)}
                      >
                        <FavoriteIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => handleExpandClick(key)}
                        aria-expanded={expandedId === key}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse
                      in={expandedId === key}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        <Typography sx={{ textAlign: "start" }}>
                          <b>{item.title}</b>
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            marginTop: "1vh",
                            bgColor: "white",
                          }}
                        >
                          <div>
                            <Typography sx={{ textAlign: "start" }}>
                              <b>Diet Type:</b>
                            </Typography>
                            {Object.entries(item.diets).map(([key, diet]) => (
                              <Typography
                                key={key}
                                color="text.secondary"
                                sx={{
                                  display: "flex",
                                  justifyContent: "start",
                                }}
                              >
                                {diet}
                              </Typography>
                            ))}
                          </div>
                          <div>
                            <Typography sx={{ textAlign: "start" }}>
                              <b>Diet Type:</b>
                            </Typography>
                            {Object.entries(item.dishTypes).map(
                              ([key, dishType]) => (
                                <Typography
                                  key={key}
                                  color="text.secondary"
                                  sx={{
                                    display: "flex",
                                    justifyContent: "start",
                                  }}
                                >
                                  {dishType}
                                </Typography>
                              )
                            )}
                          </div>
                        </div>
                        <div>
                          <Typography sx={{ textAlign: "start" }}>
                            <b>Credit:</b>
                          </Typography>
                          {!item.creditsText ? (
                            <>Credits: None available</>
                          ) : (
                            <Typography
                              key={key}
                              color="text.secondary"
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              {item.creditsText}
                            </Typography>
                          )}
                        </div>
                      </CardContent>
                    </Collapse>
                  </section>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
}
