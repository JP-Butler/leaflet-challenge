// Earthquake URL storing json data from "all earthquakes from last 7 days worldwide"
let geoUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// Perform a GET request to the earthquake URL
d3.json(geoUrl).then(function(data){
    console.log(data)
    createFeatures(data.features);
});


//Create the unique map features to better visualize the GeoJson Earthquake data
function createFeatures(earthquakeData) {

  // Function to apply on each feature & create a popup on each earthquake with location, time 
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date & Time: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }

  // Variable to hold the GeoJson earthquake data & apply the onEachFeature to all the data 
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    
    //Create circular markers for each earthquake point 
    pointToLayer: function(feature, latlng) {

      // If/Else to define color of markers by Earthquake depth
      let color = "";
      if (feature.geometry.coordinates[2] > 90) {
        color = "#FF0000"; // red
      }
      else if (feature.geometry.coordinates[2] > 70) {
        color = "#FFA500"; // orange
      }
      else if (feature.geometry.coordinates[2] > 50) {
        color = "#FFCC99"; // light orange
      }
        else if (feature.geometry.coordinates[2] > 30) {
          color = "#FFFF00"; // yellow
        }
        else if (feature.geometry.coordinates[2] > 10) {
          color = "#FFFF99"; // light yellow
      }
      else {
        color =  "#90EE90"; // light green 
      }

            // Stylization of circle markers 
            let geoJsonMarkers = {
                radius: feature.properties.mag * 4,
                fillColor: color,
                color: "#000", 
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            }
    return L.circleMarker(latlng, geoJsonMarkers);
    }
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
      center: [37.09, -95.71],
      zoom: 5,
      layers: [borderStreet, earthquakes]
    });


  // Create the layer control with the base and overlay maps as selectable options
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);



  //legend

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (myMap) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = ['-10', '10', '30', '50', '70', '90'],
          labels = [];
          let colorList = ["#90EE90", "#FFFF99", "#FFFF00", "#FFCC99", "#FFA500", "#FF0000"]
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + colorList[i] + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };

  legend.addTo(myMap);

}
