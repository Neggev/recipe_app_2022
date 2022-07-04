import React, { useState, useContext } from "react";
import { FiltersContext } from "./FiltersContext/FiltersContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Category() {
  // const [cuisine, setCuisine] = useState("");
  const [open, setOpen] = React.useState(false);

  const fromContext = useContext(FiltersContext);
  const { cuisine, setCuisine } = fromContext;

  const handleChange = (event) => {
    setCuisine(event.target.value);
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
          Cuisine Type
        </InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={cuisine}
          onChange={handleChange}
          sx={{ bgcolor: "#313131" }}
          variant="filled"
        >
          <MenuItem aria-label="None" value="" />
          <MenuItem value={"African"}>African</MenuItem>
          <MenuItem value={"American"}>American</MenuItem>
          <MenuItem value={"British"}>British</MenuItem>
          <MenuItem value={"Cajun"}>Cajun</MenuItem>
          <MenuItem value={"Caribbean"}>Caribbean</MenuItem>
          <MenuItem value={"Chinese"}>Chinese</MenuItem>
          <MenuItem value={"Eastern European"}>Eastern European</MenuItem>
          <MenuItem value={"European"}>European</MenuItem>
          <MenuItem value={"French"}>French</MenuItem>
          <MenuItem value={"German"}>German</MenuItem>
          <MenuItem value={"Indian"}>Indian</MenuItem>
          <MenuItem value={"Italian"}>Italian</MenuItem>
          <MenuItem value={"Japanese"}>Japanese</MenuItem>
          <MenuItem value={"Jewish"}>Jewish</MenuItem>
          <MenuItem value={"Korean"}>Korean</MenuItem>
          <MenuItem value={"Latin American"}>Latin American</MenuItem>
          <MenuItem value={"Mediterranean"}>Mediterranean</MenuItem>
          <MenuItem value={"Middle Eastern"}>Middle Easter</MenuItem>
          <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
          <MenuItem value={"Nordic"}>Nordic</MenuItem>
          <MenuItem value={"Southern"}>Southern</MenuItem>
          <MenuItem value={"Spanish"}>Spanish</MenuItem>
          <MenuItem value={"Thai"}>Thai</MenuItem>
          <MenuItem value={"Vietnamese"}>Vietnamese</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
