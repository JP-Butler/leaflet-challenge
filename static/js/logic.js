// Earthquake URL storing json data from "all earthquakes from last 7 days worldwide"
let geoUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// Perform a GET request to the earthquake URL
d3.json(geoUrl).then(function(data){
    console.log(data)
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Function to apply on each feature & create a popup on each earthquake with location, time 
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Variable to hold the GeoJson earthquake data & apply the onEachFeature to all the data 
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

    // Create the base layers.
    let borderStreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let borderlessTopo =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    })
    // Create baseMaps to apply to Map object
    let baseMaps = {
      "Street Map with Borders": borderStreet,
      "Borderless Topographic Map": borderlessTopo
    };
  
    // Create an overlaymaps object
    let overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create Map and assign borderStreet layer & earthquake points to display on default load
    let myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [borderStreet, earthquakes]
    });


  // Create the layer control with the base and overlay maps as selectable options
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}