import React, { useState, useContext } from "react";
import { FiltersContext } from "./FiltersContext/FiltersContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MealTypes() {
  // const [mealType, setMealType] = useState("");
  const [open, setOpen] = React.useState(false);

  const fromContext = useContext(FiltersContext);
  const { mealType, setMealType } = fromContext;

  const handleChange = (event) => {
    setMealType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // console.log(cuisine);
  return (
    <div>
      <FormControl
        variant="filled"
        sx={{ m: 2, minWidth: 150, bgcolor: "white" }}
      >
        <InputLabel
          id="demo-simple-select-filled-label"
          sx={{ color: "#9e9e9e" }}
        >
          Meal Type
        </InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={mealType}
          onChange={handleChange}
          sx={{ bgcolor: "#313131" }}
          variant="filled"
        >
          <MenuItem aria-label="None" value="" />
          <MenuItem value={"main course"}>Main course</MenuItem>
          <MenuItem value={"side dish"}>Side dish</MenuItem>
          <MenuItem value={"dessert"}>Dessert</MenuItem>
          <MenuItem value={"appetizer"}>Appetizer</MenuItem>
          <MenuItem value={"salad"}>Salad</MenuItem>
          <MenuItem value={"bread"}>Bread</MenuItem>
          <MenuItem value={"breakfast"}>Breakfast</MenuItem>
          <MenuItem value={"soup"}>Soup</MenuItem>
          <MenuItem value={"beverage"}>Beverage</MenuItem>
          <MenuItem value={"sauce"}>Sauce</MenuItem>
          <MenuItem value={"marinade"}>Marinade</MenuItem>
          <MenuItem value={"fingerfood"}>Fingerfood</MenuItem>
          <MenuItem value={"snack"}>Snack</MenuItem>
          <MenuItem value={"drink"}>Drink</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
