import React from "react";
import MapComponent from '../Component/MapComponent.js';
import "../styles/App.css";

const MapPage = () => {
  return (
    <div className="App">
      <div className="phone-screen">
        <h1>Map</h1>
        <MapComponent />
      </div>
    </div>
  );
};

export default MapPage;