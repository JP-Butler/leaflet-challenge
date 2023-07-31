# leaflet-challenge
----------------------------------------

## Interactive Leaflet Earthquake Map
The United States Geological Survey, or USGS for short, is responsible for researching and providing data about all things that affect our ecosystems and environment.
In this challenge, I am tasked with helping The USGS to build a new set of tools to help visualize earthquake data, which falls under their umbrella of environmental research. I accessed their data through their [USGS GeoJSON Data Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) to plot an interactive world map using ***Leaflet.js** to better visualize where these earthquakes are happening and certain characteristics about them. 


## Table of Contents

- [About & Process](#about--process)
- [Getting Started & Installing](#getting-started--installing)
- [Contributing](#contributing)

## About & Process
To begin I first fetched their data through a **GET request** `.then()` function to access the earthquake data from the site listed above, and logged to the console to verify its success. <br>
Afterwards I began defining my two main functions to plot the actual world map along with the appropriate earthquake markers. First was the `createFeatures()` function which created the unique map features such as a **circle marker** plotting the location of each earthquake, the size of which represents the magnitude of the earthquake. The color of the marker that represents the depth of the earthquake (see legend in the bottom right of the webpage to identify the color system). Finally a popup on each marker that shows when the marker is clicked that provides information on the earthquake. <br>
Secondly the `createMap()` function which creates the layers of the map, which can be seen and selected as desired in the top-right of the map. Two base layers, a "street map" layer which shows all world borders and a "borderless topographic" map that shows all world topography with no borders. One overlay map which alongs you to show the earthquake markers. <br>
As well create the map with standard `let myMap = L.map` statement with my specific parameters such as the centred view, zoom level and layers (which are the two base layers I described above). A layer control which allows you to select between the different layers to view the world map as you wish. And finally a legend which shows the color scale representing the depth in km of each earthquake by their color. <br>
In the `style.css` file I added to the provided body{} code with some sylzing of the legend, such as its position, background color, title and sizing. <br>
The `index.html` file was pre-completed.


## Getting Started & Installing
Requirements to run project:
* A web browser such as **Chrome** to be able to view and inspect the dashboard. 
* A code/text editor able to handle Javascript and HTML files, I Recommend **VS Code**. <br>
No other installations or packages are needed.


## Contributing

Justin Butler

**Aided By:** <br>
* class Teacher's Assistant
* Weekly Tutoring session