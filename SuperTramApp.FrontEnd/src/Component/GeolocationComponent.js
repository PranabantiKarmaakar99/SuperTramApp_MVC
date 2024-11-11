import React, { useState } from 'react';

const GeolocationComponent = ({ onLocationFound }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError(null);
          onLocationFound({ latitude, longitude });
          saveLocationToAPI({ latitude, longitude });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const saveLocationToAPI = async (location) => {
    try {
      const response = await fetch('https://localhost:7091/api/UserLocation/user-location', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorDetails}`);
      }

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.indexOf('application/json') !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      console.log('Location saved:', data);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return (
    <div>
      <button className="find-route-button" onClick={handleGetLocation}>Find My Location</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default GeolocationComponent;