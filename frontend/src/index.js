import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import FiltersContext from './components/searchFunc/filters/FiltersContext/FiltersContext'
import FavoritesContext from './components/favorites/FavoritesContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FiltersContext>
        <FavoritesContext>

          <App />

        </FavoritesContext>
      </FiltersContext>
    </BrowserRouter>
  </React.StrictMode>
);
