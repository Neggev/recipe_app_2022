// react imports

import { useState, useContext } from "react";

// MUI imports
import Container from "@mui/material/Container";
import React from "react";
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

// context imports
import { FiltersContext } from "./filters/FiltersContext/FiltersContext";
import { FavoritesContext } from "../favorites/FavoritesContext";

// mui styles
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

export default function SearchResults() {
  // context imports
  const fromFilterContext = useContext(FiltersContext);
  const { output } = fromFilterContext;

  const fromFavoritesContext = useContext(FavoritesContext);
  const { favorite, setFavorite, AddToFavorites } = fromFavoritesContext;

  // mui style states and functions
  const [expanded, setExpanded] = useState(false);
  const [btnColor, setColor] = useState({ color: "grey" });
  const [expandedId, setExpandedId] = useState(-1);

  const handleExpandClick = (key) => {
    setExpandedId(expandedId === key ? -1 : key);
  };

  // fetch function for getting info by recipe id
  const showMore = async (e) => {
    const recipeID = e.id;
    console.log(recipeID);

    const getData = await fetch(
      `http://localhost:8000/search/idsearch/${recipeID}`
    );

    const dataJson = await getData.json();
    const originURL = dataJson.sourceUrl;
    console.log(originURL);
  };
  function addToFavorites(event) {
    console.log(event);
    AddToFavorites(event);
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box sx={{ textAlign: "start", mb: 2 }}>
          <Typography variant="h4" sx={{ color: "white" }}>
            Search Results:
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {!output ? (
            <>
              <h1>No Results yet...</h1>
            </>
          ) : (
            output.map((item, key) => (
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
                        onClick={() => addToFavorites(item)}
                      >
                        <FavoriteIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => showMore(item)}
                        aria-label="show more"
                      >
                        Show original recipe
                      </IconButton>
                    </CardActions>
                    <Collapse
                      in={expandedId === key}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            marginTop: "1vh",
                            bgColor: "white",
                          }}
                        ></div>
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
