import React, { useState, useContext } from "react";
import { FiltersContext } from "./FiltersContext/FiltersContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ResultsPerPage() {
  const [results, setResults] = useState("10");
  // const [output, setOutput] = useState([]);
  const [open, setOpen] = React.useState(false);

  const fromContext = useContext(FiltersContext);
  const { resultsNum, setResultsNum } = fromContext;

  const handleChange = async (event) => {
    setResultsNum(event.target.value);
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
          Max Results
        </InputLabel>
        <Select
          sx={{ bgcolor: "#313131" }}
          value={resultsNum}
          onChange={handleChange}
        >
          <MenuItem value="10">
            <em></em>
          </MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
