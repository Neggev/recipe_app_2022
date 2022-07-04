import React from "react";

import SearchBox from "../components/searchFunc/SearchBox";
import Cuisine from "../components/searchFunc/filters/Cuisine";
import MealTypes from "../components/searchFunc/filters/MealType";
import SearchResultsV2 from "../components/searchFunc/SearchResultsV2";
import ResultsPerPage from "../components/searchFunc/filters/ResultsPerPage";
import CheckboxFilters from "../components/searchFunc/filters/CheckboxFilters";

export default function Search() {
  return (
    <>
      <SearchBox />
      <section style={{ display: "flex", justifyContent: "center" }}>
        <Cuisine />
        <MealTypes />
        <ResultsPerPage />
        <CheckboxFilters />
      </section>
      <SearchResultsV2 />
    </>
  );
}
