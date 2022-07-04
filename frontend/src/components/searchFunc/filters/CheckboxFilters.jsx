import React, { useContext, useState } from "react";
import { FiltersContext } from "./FiltersContext/FiltersContext";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

export default function CheckboxFilters() {
  const [glutenCheck, setGlutenCheck] = useState(false);
  const [veganCheck, setVeganCheck] = useState(false);
  const [vegetarianCheck, setVegetarianCheck] = useState(false);

  const fromContext = useContext(FiltersContext);
  const {
    glutenFree,
    vegan,
    vegetarian,
    setGlutenFree,
    setVegan,
    setVegetarian,
    submitFetch,
  } = fromContext;

  return (
    <>
      <FormControl
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <FormLabel sx={{ color: "#9e9e9e" }} component="legend">
          Gluten Free
          <Checkbox
            sx={{ color: "#9e9e9e" }}
            checked={glutenFree}
            onClick={(e) => setGlutenFree(e.target.checked)}
            inputProps={{ "aria-label": "glutenFree" }}
          />
        </FormLabel>
        <FormLabel sx={{ color: "#9e9e9e" }} component="legend">
          Vegan
          <Checkbox
            sx={{ color: "#9e9e9e" }}
            checked={vegan}
            onChange={(e) => setVegan(e.target.checked)}
            inputProps={{ "aria-label": "vegan" }}
          />
        </FormLabel>
        <FormLabel sx={{ color: "#9e9e9e" }} component="legend">
          Vegetarian
          <Checkbox
            sx={{ color: "#9e9e9e" }}
            checked={vegetarian}
            onChange={(e) => setVegetarian(e.target.checked)}
            inputProps={{ "aria-label": "vegetarian" }}
          />
        </FormLabel>
        <Button
          variant="contained"
          onClick={submitFetch}
          sx={{ bgcolor: "#313131" }}
        >
          Apply Filters
        </Button>
      </FormControl>
    </>
  );
}
