//react imports
import { useEffect, useState, useContext } from "react";

// mui imports

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//firebase imports

import {
  GetFavorites,
  deleteFavorite,
} from "../components/firestore/firestore";

// favorites context imports
import { FavoritesContext } from "../components/favorites/FavoritesContext";

export default function Favorites() {
  const [tempFav, setTempFav] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const items = await GetFavorites();
    console.log(items);
    setTempFav(items);
  };

  const deleteData = async (index) => {
    const removed = tempFav.splice(index, 1);
    // console.log(tempFav);
    deleteFavorite(tempFav);
    getData();
  };
  return (
    <>
      <div style={{ textAlign: "center", color: "white" }}>
        <h1>Favorites</h1>
      </div>
      {!tempFav ? (
        <>
          <h4>No favorites listed</h4>
        </>
      ) : (
        <Box component="section">
          <Grid container spacing={3}>
            {tempFav.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Card
                  variant="outlined"
                  sx={{
                    height: 400,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt={item.title}
                      src={item.image}
                      sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h6" component="div">
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      ID: {item.id}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                  >
                    <Button size="small">Open original</Button>
                    <Button size="small" onClick={() => deleteData(index)}>
                      Remove from favorites
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}
