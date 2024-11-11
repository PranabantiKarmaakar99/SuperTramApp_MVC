import React from "react";
import FavouritesComponent from "../components/FavouritesComponent";
import "../styles/App.css";

const FavouritesPage = () => {
  return (
    <div className="App">
      <div className="phone-screen">
        <h1>Favourites</h1>
        <FavouritesComponent />
      </div>
    </div>
  );
};

export default FavouritesPage;