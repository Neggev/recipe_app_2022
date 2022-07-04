// react imports
import React, { useState, createContext } from "react";
// create context
export const FiltersContext = createContext();

export default function Filters({ children }) {
  // search term filter's states
  const [searchBoxInput, setSearchBoxInput] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("");
  const [resultsNum, setResultsNum] = useState("");
  const [output, setOutput] = useState([]);
  const [glutenFree, setGlutenFree] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);

  const submitFetch = async () => {
    console.log(searchBoxInput);

    const query =
      (await "&query=") +
      searchBoxInput +
      (await "&number=") +
      resultsNum +
      (await "&cuisine=") +
      cuisine +
      (await "&type=") +
      mealType +
      (await "&glutenFree=") +
      glutenFree +
      (await "&vegetarian=") +
      vegetarian +
      (await "&vegan=") +
      vegan;
    console.log(query);
    const api = await fetch(
      `http://localhost:8000/search/complexsearch/${query}`
    );
    const data = await api.json();
    setOutput(data.results);
    console.log(output);
  };

  return (
    <FiltersContext.Provider
      value={{
        output: output,
        searchBoxInput: searchBoxInput,
        cuisine: cuisine,
        mealType: mealType,
        resultsNum: resultsNum,
        glutenFree: glutenFree,
        vegan: vegan,
        vegetarian: vegetarian,
        setSearchBoxInput: setSearchBoxInput,
        setCuisine: setCuisine,
        setMealType: setMealType,
        setResultsNum: setResultsNum,
        submitFetch: submitFetch,
        setGlutenFree: setGlutenFree,
        setVegan: setVegan,
        setVegetarian: setVegetarian,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
