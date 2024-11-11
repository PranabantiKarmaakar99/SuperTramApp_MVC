import React, { useState, useEffect } from "react";
import "../styles/App.css";
import lineColours from "../utils/lineColours";

const JourneyPlannerComponent = () => {
  const [tramStops, setTramStops] = useState([]);
  const [startStop, setStartStop] = useState("");
  const [endStop, setEndStop] = useState("");
  const [routeData, setRouteData] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7058/api/TramStops/all-tram-stop-names")
      .then((response) => response.json())
      .then((data) => setTramStops(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `https://localhost:7058/api/JourneyPlanner/find-route?startStop=${startStop}&endStop=${endStop}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setRouteData(data))
      .catch((error) => console.error("Error fetching route:", error));
  };

  const handleSave = (event) => {
    event.preventDefault();
    const url = `https://localhost:7058/api/FavouriteRoutes/favourite-routes`;
    const payload = { startStop, endStop };

    console.log('Saving route with payload:', payload);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Route saved successfully:', data);
      })
      .catch((error) => console.error("Error saving route:", error));
  };

  return (
    <div className="phone-screen">
      <h1>Journey Planner</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="start">Start:</label>
          <input
            list="tramStops"
            id="start"
            name="start"
            value={startStop}
            onChange={(e) => setStartStop(e.target.value)}
          />
        </div>
        <datalist id="tramStops">
          {tramStops.map((tramStop, index) => (
            <option key={index} value={tramStop} />
          ))}
        </datalist>
        <div className="form-group">
          <label htmlFor="end">End:</label>
          <input
            list="tramStops"
            id="end"
            name="end"
            value={endStop}
            onChange={(e) => setEndStop(e.target.value)}
          />
        </div>
        <datalist id="tramStops">
          {tramStops.map((tramStop, index) => (
            <option key={index} value={tramStop} />
          ))}
        </datalist>
        <button className="find-route-button rounded-lg" type="submit">Find Route</button>
      </form>
      <br />
      {routeData && routeData.length > 0 && (
        <div>
          <strong>Your journey from {startStop} to {endStop}: </strong>
          <button className="find-route-button" onClick={handleSave}>Save Route</button>
          <br />
          {routeData.map((segment, index) => {
            const lineColour = lineColours[segment.tramLineName] || 'black';
            const isLineChange = index === 0 || routeData[index - 1].tramLineName !== segment.tramLineName || routeData[index - 1].tramLineTerminus !== segment.tramLineTerminus;
            const isLastSegment = index === routeData.length - 1 || routeData[index + 1].tramLineName !== segment.tramLineName || routeData[index + 1].tramLineTerminus !== segment.tramLineTerminus;
            const isFirstStopOfNewLeg = index > 0 && routeData[index - 1].tramLineName !== segment.tramLineName;

            if (index === 0 || isFirstStopOfNewLeg) {
              return (
                <div key={index} className="route-segment">
                  <div>
                    <br />
                    <strong>
                      <div className="line-instruction">Get on the <span style={{ color: lineColour, backgroundColor: 'lightgrey', padding: '2px 4px', borderRadius: '4px' }}>{segment.tramLineName}</span> tram to <span style={{ color: lineColour, backgroundColor: 'lightgrey', padding: '2px 4px', borderRadius: '4px' }}>{segment.tramLineTerminus}</span>:</div>
                    </strong>
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="route-segment">
                {isLineChange && (
                  <div>
                    <br />
                    <strong>
                      <div className="line-instruction">Get on the <span style={{ color: lineColour, backgroundColor: 'lightgrey', padding: '2px 4px', borderRadius: '4px' }}>{segment.tramLineName}</span> tram to <span style={{ color: lineColour, backgroundColor: 'lightgrey', padding: '2px 4px', borderRadius: '4px' }}>{segment.tramLineTerminus}</span>:</div>
                    </strong>
                  </div>
                )}
                <div className="stop" style={{ borderColor: lineColour }}>
                  <div className="dot" style={{ backgroundColor: lineColour }}></div>
                  {isLastSegment ? (
                    <span><strong>{segment.stopName}</strong> (Get off here.)</span>
                  ) : (
                    segment.stopName
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JourneyPlannerComponent;