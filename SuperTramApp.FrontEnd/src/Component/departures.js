// departures.js

export const fetchReachableTermini = async (tramStopName) => {
  try {
    const response = await fetch(`https://localhost:7058/api/TramStops/reachable-termini?tramStopName=${tramStopName}`);
    const data = await response.json();
    console.log('API response data:', data); // Log the raw API response
    return data.$values || data; // Ensure correct data structure
  } catch (error) {
    console.error('Error fetching reachable termini:', error);
    return [];
  }
};

export const formatDepartureTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

export const generateDepartures = (termini) => {
  const departures = [];
  const now = new Date();

  if (!termini || !Array.isArray(termini) || termini.length === 0) {
    console.error('Invalid termini data:', termini);
    return departures;
  }

  for (let i = 0; i < 10; i++) {
    const departureTime = new Date(now.getTime() + i * 5 * 60000); // Departures are every 5 minutes
    const terminus = termini[i % termini.length];

    if (!terminus || !terminus.tramLineTerminus || !terminus.tramLineName) {
      console.error('Invalid terminus data:', terminus);
      continue;
    }

    departures.push({
      time: formatDepartureTime(departureTime),
      terminus: terminus.tramLineTerminus,
      line: terminus.tramLineName.toLowerCase()
    });
  }

  return departures;
};