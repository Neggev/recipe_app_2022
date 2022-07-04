// react imports
import React, { useState, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
// context imports
import { FiltersContext } from "./filters/FiltersContext/FiltersContext";

//mui imports
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function Search() {
  // context imports
  const ToContext = useContext(FiltersContext);
  const { setSearchBoxInput, submitFetch } = ToContext;

  // fetch search terms and filters
  const submitHandler = async (e) => {
    e.preventDefault();
    submitFetch();
  };

  return (
    <form
      style={{ display: "flex", justifyContent: "center" }}
      onSubmit={(e) => submitHandler(e)}
    >
      <Paper
        sx={{
          p: "2px 4px",
          mt: 3,
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
      >
        <OutlinedInput
          id="mail"
          placeholder="Search for recipe"
          sx={{ bgcolor: "background.default", width: "100%" }}
          onChange={(e) => setSearchBoxInput(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="click"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={(e) => submitHandler(e)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </form>
  );
}
