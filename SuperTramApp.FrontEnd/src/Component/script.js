
function reverseCoordinates(coords) {
    return coords.map(function(coord) {
        return [coord[1], coord[0]];
    });
}

var map = L.map('map').setView([
53.380669568195714, -1.4702109856030177], 13);

var tramIcon = L.icon({
    iconUrl: 'https://i.ibb.co/09BPNPn/stlogo-icon.png',
    // iconUrl: 'https://i.ibb.co/ZXnTTjc/stlogo-icon-alt.png', // (Alternative icon)
    iconSize: [30, 33],
});

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

 // Fetch the JSON data
 fetch('tt-data.json')
 .then(response => response.json())
 .then(data => {
     // Extract the LineString coordinates
     var routeFeature = data.features.find(f => f.geometry.type === 'LineString');
     var routeCoordinates = routeFeature.geometry.coordinates;

     // Add the tram route to the map
     L.polyline(routeCoordinates.map(coord => [coord[1], coord[0]]), {color: 'black'}).addTo(map);

     // Extract the stop points and add them to the map
     data.features.filter(f => f.geometry.type === 'Point').forEach(stop => {
         var stopCoords = stop.geometry.coordinates;
         L.marker([stopCoords[1], stopCoords[0]], {icon: tramIcon})
             .addTo(map)
             .bindPopup(stop.properties.name);
     });
 })
 
 fetch('yellow-data.json')
 .then(response => response.json())
 .then(data => {
     var routeFeature = data.features.find(f => f.geometry.type === 'LineString');
     var routeCoordinates = routeFeature.geometry.coordinates;

     L.polyline(routeCoordinates.map(coord => [coord[1], coord[0]]), {color: 'yellow'}).addTo(map);

     data.features.filter(f => f.geometry.type === 'Point').forEach(stop => {
         var stopCoords = stop.geometry.coordinates;
         L.marker([stopCoords[1], stopCoords[0]], {icon: tramIcon})
             .addTo(map)
             .bindPopup(stop.properties.name);
     });
 })

fetch('blue-data.json')
 .then(response => response.json())
 .then(data => {
     var routeFeature = data.features.find(f => f.geometry.type === 'LineString');
     var routeCoordinates = routeFeature.geometry.coordinates;

     L.polyline(routeCoordinates.map(coord => [coord[1], coord[0]]), {color: 'darkblue'}).addTo(map);

     data.features.filter(f => f.geometry.type === 'Point').forEach(stop => {
         var stopCoords = stop.geometry.coordinates;
         L.marker([stopCoords[1], stopCoords[0]], {icon: tramIcon})
             .addTo(map)
             .bindPopup(stop.properties.name);
     });
 })

fetch('purple-data.json')
 .then(response => response.json())
 .then(data => {
     var routeFeature = data.features.find(f => f.geometry.type === 'LineString');
     var routeCoordinates = routeFeature.geometry.coordinates;

     L.polyline(routeCoordinates.map(coord => [coord[1], coord[0]]), {color: 'purple'}).addTo(map);

     data.features.filter(f => f.geometry.type === 'Point').forEach(stop => {
         var stopCoords = stop.geometry.coordinates;
         L.marker([stopCoords[1], stopCoords[0]], {icon: tramIcon})
             .addTo(map)
             .bindPopup(stop.properties.name);
     });
 })
 
