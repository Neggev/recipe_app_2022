// react imports

import React, { useState, createContext } from "react";

// firebase imports
import { updateFavorites } from "../firestore/firestore";
// create context
export const FavoritesContext = createContext();

export default function Favorites({ children }) {
  // state for list of favorites
  const [favorite, setFavorite] = useState([]);

  const AddToFavorites = (fav) => {
    favorite.push(fav);
    console.log(favorite);
    updateFavorites(favorite);
  };
  return (
    <FavoritesContext.Provider
      value={{
        favorite: favorite,
        setFavorite: setFavorite,
        AddToFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
