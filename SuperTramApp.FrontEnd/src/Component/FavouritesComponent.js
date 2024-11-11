import React, { useState, useEffect } from 'react';
import lineColours from "../utils/lineColours";
import { fetchReachableTermini, generateDepartures } from './departures';
import '../styles/FavouritesComponent.css'; 
import '../styles/App.css'; 

const FavouritesComponent = () => {
  const [routes, setRoutes] = useState([]);
  const [routeColours, setRouteColours] = useState({});
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [departures, setDepartures] = useState([]);

  const handleGetRoutes = async () => {
    try {
      const response = await fetch('https://localhost:7058/api/FavouriteRoutes/favourite-routes');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const routesArray = Array.isArray(data) ? data : [];
      setRoutes(routesArray);
      fetchRouteColours(routesArray);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const fetchRouteColours = async (routesArray) => {
    const colours = {};
    for (const route of routesArray) {
      const url = `https://localhost:7058/api/JourneyPlanner/find-route?startStop=${route.startStop}&endStop=${route.endStop}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const routeData = Array.isArray(data) ? data : [];
        if (routeData.length > 0) {
          const startLine = routeData[0].tramLineName;
          const endLine = routeData[routeData.length - 1].tramLineName;
          colours[route.id] = {
            startColour: lineColours[startLine] || 'black',
            endColour: lineColours[endLine] || 'black',
          };
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    setRouteColours(colours);
  };

  const handleDeleteRoute = async (routeId) => {
    const url = `https://localhost:7058/api/FavouriteRoutes/${routeId}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setRoutes(routes.filter(route => route.id !== routeId));
      const newRouteColours = { ...routeColours };
      delete newRouteColours[routeId];
      setRouteColours(newRouteColours);
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
    }
  };

  const handleViewRoute = async (startStop) => {
    try {
      const termini = await fetchReachableTermini(startStop);
      const departures = generateDepartures(termini);
      setDepartures(departures);
      setSelectedRoute(startStop);
    } catch (error) {
      console.error('Error fetching departures:', error);
    }
  };

  useEffect(() => {
    handleGetRoutes();
  }, []);

  return (
    <div className='phone-screen'>
      <div>
        <h2>Favourite Routes</h2>
        {Array.isArray(routes) && routes.map((route, index) => {
          const colours = routeColours[route.id] || { startColour: 'black', endColour: 'black' };

          return (
            <div key={index} className='route-item'>
              <div className='route-details'>
                <strong><p style={{ color: colours.startColour, backgroundColor: 'lightgrey', padding: '2px 4px', borderRadius: '4px'  }}>{route.startStop}</p></strong> ➡️
                <strong><p style={{ color: colours.endColour, backgroundColor: 'lightgrey', padding: '2px 4px', borderRadius: '4px'  }}>{route.endStop}</p></strong>
                <button className='find-route-button' onClick={() => handleViewRoute(route.startStop)}>View</button>
                <button className='find-route-button' onClick={() => handleDeleteRoute(route.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
      {selectedRoute && (
        <div className="departures">
          <h2>Upcoming Departures for 
          <br /> 
            {selectedRoute}</h2>
          <ul>
            {departures.length > 0 ? (
              departures.map((departure, index) => (
                <li key={index}>
                  <span className={`line-color ${departure.line}-line`}>
                    {departure.terminus}
                  </span>
                  <span>{departure.time}</span>
                </li>
              ))
            ) : (
              <li>No departures available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FavouritesComponent;