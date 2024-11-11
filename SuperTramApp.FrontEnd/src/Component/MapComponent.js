import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapComponent.css'; 
import "../styles/App.css";
import { fetchReachableTermini, generateDepartures } from '../utils/departures';
import GeolocationComponent from './GeolocationComponent';

const MapComponent = () => {
  const mapRef = useRef(null);
  const tramStopMarkersRef = useRef([]);
  const [selectedStop, setSelectedStop] = useState(null);
  const [departures, setDepartures] = useState([]);
  const [yellowData, setYellowData] = useState(null);
  const [blueData, setBlueData] = useState(null);
  const [purpleData, setPurpleData] = useState(null);
  const [ttData, setTTData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const tramIcon = L.icon({
    iconUrl: 'https://i.ibb.co/09BPNPn/stlogo-icon.png',
    iconSize: [30, 33],
  });

  useEffect(() => {
    if (mapRef.current) {
      return; // If map is already initialized, do nothing
    }

    const map = L.map('map').setView([53.380669568195714, -1.4702109856030177], 13);
    mapRef.current = map; // Store the map instance in the ref

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const fetchData = async (url, color) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const routeFeature = data.features.find(f => f.geometry.type === 'LineString');
        const routeCoordinates = routeFeature.geometry.coordinates;

        L.polyline(routeCoordinates.map(coord => [coord[1], coord[0]]), { color }).addTo(map);

        data.features.filter(f => f.geometry.type === 'Point').forEach(stop => {
          const stopCoords = stop.geometry.coordinates;
          const marker = L.marker([stopCoords[1], stopCoords[0]], { icon: tramIcon })
            .addTo(map)
            .bindPopup(stop.properties.name);

          marker.on('click', async () => {
            setSelectedStop(stop.properties.name);
            const termini = await fetchReachableTermini(stop.properties.name);
            setDepartures(generateDepartures(termini));
          });

          tramStopMarkersRef.current.push(marker); 
        });
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    fetchData('/tt-data.json', 'black');
    fetchData('/yellow-data.json', 'gold');
    fetchData('/blue-data.json', 'darkblue');
    fetchData('/purple-data.json', 'purple');

    const fetchAndSetData = async (url, setData) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    fetchAndSetData('/yellow-data.json', setYellowData);
    fetchAndSetData('/blue-data.json', setBlueData);
    fetchAndSetData('/purple-data.json', setPurpleData);
    fetchAndSetData('/tt-data.json', setTTData);
  }, []);

  const fetchRouteData = async (startStop, endStop) => {
    const response = await fetch(`https://localhost:7058/api/JourneyPlanner/find-route?startStop=${startStop}&endStop=${endStop}`);
    const routeData = await response.json();
    return routeData.$values;
  };

  const extractCoordinates = (routeData) => {
    const startStop = routeData[0];
    const endStop = routeData[routeData.length - 1];
    return {
      start: [startStop.longitude, startStop.latitude],
      end: [endStop.longitude, endStop.latitude]
    };
  };

  const findSegmentInJson = (start, end, jsonData) => {
    const coordinates = jsonData.features[0].geometry.coordinates;
    const tolerance = 1e-6; // Small tolerance for floating-point comparison

    const areCoordinatesEqual = (coord1, coord2) => {
        return Math.abs(coord1[0] - coord2[0]) < tolerance && Math.abs(coord1[1] - coord2[1]) < tolerance;
    };

    // Searches for segment in the given direction
    let startIndex = coordinates.findIndex(coord => areCoordinatesEqual(coord, start));
    let endIndex = coordinates.findIndex(coord => areCoordinatesEqual(coord, end));

    if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
        return coordinates.slice(startIndex, endIndex + 1);
    }

    // If not found, searches for segment in the reverse direction
    startIndex = coordinates.findIndex(coord => areCoordinatesEqual(coord, end));
    endIndex = coordinates.findIndex(coord => areCoordinatesEqual(coord, start));

    if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
        return coordinates.slice(startIndex, endIndex + 1).reverse();
    }

    return null;
  };

  const drawLineOnMap = (coordinates, color) => {
    L.polyline(coordinates.map(coord => [coord[1], coord[0]]), { color }).addTo(mapRef.current);
  };

  const clearMapLines = () => {
    mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Polyline) {
            mapRef.current.removeLayer(layer);
        }
    });
  };

  const handleTerminiClick = async (startStop, endStop) => {
    try {
      const routeData = await fetchRouteData(startStop, endStop);
      const { start, end } = extractCoordinates(routeData);

      console.log('Start:', start);
      console.log('End:', end);

      clearMapLines();

      if (yellowData) {
        const segmentCoordinates = findSegmentInJson(start, end, yellowData);
        if (segmentCoordinates) {
          drawLineOnMap(segmentCoordinates, 'gold');
        } else {
          console.log('Yellow line segment not found');
        }
      }

      if (blueData) {
        const segmentCoordinates = findSegmentInJson(start, end, blueData);
        if (segmentCoordinates) {
          drawLineOnMap(segmentCoordinates, 'darkblue');
        } else {
          console.log('Blue line segment not found');
        }
      }

      if (purpleData) {
        const segmentCoordinates = findSegmentInJson(start, end, purpleData);
        if (segmentCoordinates) {
          drawLineOnMap(segmentCoordinates, 'purple');
        } else {
          console.log('Purple line segment not found');
        }
      }

      if (ttData) {
        const segmentCoordinates = findSegmentInJson(start, end, ttData);
        if (segmentCoordinates) {
          drawLineOnMap(segmentCoordinates, 'black');
        } else {
          console.log('TT line segment not found');
        }
      }

      // Remove all tram stop markers
      tramStopMarkersRef.current.forEach(marker => mapRef.current.removeLayer(marker));
      tramStopMarkersRef.current = [];

      // Add markers for the selected route
      routeData.forEach(stop => {
        const [lon, lat] = [stop.longitude, stop.latitude];
        const marker = L.marker([lat, lon], { icon: tramIcon }).addTo(mapRef.current);
        tramStopMarkersRef.current.push(marker);
      });

    } catch (error) {
      console.error('Error fetching route data:', error);
    }
  };

  const resetMap = () => {
    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        mapRef.current.removeLayer(layer);
      });
  
      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
  
      const addDataToMap = (data, color) => {
        const routeFeature = data.features.find(f => f.geometry.type === 'LineString');
        const routeCoordinates = routeFeature.geometry.coordinates;
  
        L.polyline(routeCoordinates.map(coord => [coord[1], coord[0]]), { color }).addTo(mapRef.current);
  
        data.features.filter(f => f.geometry.type === 'Point').forEach(stop => {
          const stopCoords = stop.geometry.coordinates;
          const marker = L.marker([stopCoords[1], stopCoords[0]], { icon: tramIcon })
            .addTo(mapRef.current)
            .bindPopup(stop.properties.name);
  
          marker.on('click', async () => {
            setSelectedStop(stop.properties.name);
            const termini = await fetchReachableTermini(stop.properties.name);
            setDepartures(generateDepartures(termini));
          });
  
          tramStopMarkersRef.current.push(marker);
        });
      };
  
      if (ttData) addDataToMap(ttData, 'black');
      if (yellowData) addDataToMap(yellowData, 'gold');
      if (blueData) addDataToMap(blueData, 'darkblue');
      if (purpleData) addDataToMap(purpleData, 'purple');
    }
  };

  const handleLocationFound = (location) => {
    console.log('User location:', location);
    setUserLocation(location);
  };

  return (
    <div>      
      <div id="map" style={{ width: '100%', height: '600px' }}></div>
      <button className="find-route-button" onClick={resetMap}>Reset Map</button>
      <GeolocationComponent onLocationFound={handleLocationFound} />
      {selectedStop && (
        <div className="departures">
          <h2>Upcoming Departures for 
          <br /> 
            {selectedStop}</h2>
          <ul>
            {departures.length > 0 ? (
              departures.map((departure, index) => (
                <li key={index}>
                  <span
                    className={`line-color ${departure.line}-line`}
                    onClick={() => handleTerminiClick(selectedStop, departure.terminus)}
                  >
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

export default MapComponent;