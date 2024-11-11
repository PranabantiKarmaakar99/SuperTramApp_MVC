export const fetchReachableTermini = async (tramStopName) => {
    try {
      const response = await fetch(`https://localhost:7091/api/TramStops/reachable-termini?tramStopName=${tramStopName}`);
      const data = await response.json();
      return data.$values || [];
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
    for (let i = 0; i < 10; i++) {
      const departureTime = new Date(now.getTime() + i * 5 * 60000); // Departures are every 5 minutes but it's the same at every stop as there is no real-time data
      const terminus = termini[i % termini.length];
      departures.push({
        time: formatDepartureTime(departureTime),
        terminus: terminus.tramLineTerminus,
        line: terminus.tramLineName.toLowerCase()
      });
    }
    return departures;
  };