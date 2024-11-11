import React from "react";
import JourneyPlannerComponent from "../components/JourneyPlannerComponent";
import "../styles/App.css";

const JourneyPlannerPage = () => {
  return (
    <div className="App">
      <div className="phone-screen">
        <h1>Journey Planner</h1>
        <JourneyPlannerComponent />
      </div>
    </div>
  );
};

export default JourneyPlannerPage;