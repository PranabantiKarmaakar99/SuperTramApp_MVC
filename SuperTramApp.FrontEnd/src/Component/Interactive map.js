import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ttData from '../public/tt-data.json'; // Adjust the path as necessary
import yellowData from '../public/yellow-data.json'
import blueData from '../public/blue-data.json';
import purpleData from '../public/purple-data.json';

// Fixing the default icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const tramIcon = L.icon({
  iconUrl: 'https://i.ibb.co/09BPNPn/stlogo-icon.png',
  iconSize: [30, 33],
});

const reverseCoordinates = (coords) => {
  return coords.map((coord) => [coord[1], coord[0]]);
};

const fetchRouteData = (data, color, map) => {
  const routeFeature = data.features.find(f => f.geometry.type === 'LineString');
  const routeCoordinates = reverseCoordinates(routeFeature.geometry.coordinates);

  // Add the tram route to the map
  L.polyline(routeCoordinates, { color }).addTo(map);

  // Extract the stop points and add them to the map
  data.features.filter(f => f.geometry.type === 'Point').forEach(stop => {
    const stopCoords = stop.geometry.coordinates;
    L.marker([stopCoords[1], stopCoords[0]], { icon: tramIcon })
      .addTo(map)
      .bindPopup(stop.properties.name);
  });
};

const AddRoutes = () => {
  const map = useMap();

  useEffect(() => {
    fetchRouteData(ttData, 'black', map);
    fetchRouteData(yellowData, 'yellow', map);
    fetchRouteData(blueData, 'darkblue', map);
    fetchRouteData(purpleData, 'purple', map);
  }, [map]);

  return null;
};

const InteractiveMap = () => {
  return (
    <div className="map-container" style={{ width: '100%', height: '600px' }}>
      <MapContainer center={[53.380669568195714, -1.4702109856030177]} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={20}
        />
        <AddRoutes />
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;

