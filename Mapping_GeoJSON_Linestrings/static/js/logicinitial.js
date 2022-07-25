


// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);

// Create the map object with a center and zoom level. You can also do
//let map = L.map("mapid", {center: [40.7, -94.5], zoom: 4});

// We create the tile layer that will be the background of our map.
//the 'dark-v10' is what changes the backgroun color
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//  Add a marker to the map for Los Angeles, California.
//let marker = L.marker([34.0522, -118.2437]).addTo(map);

// Get data from cities.js
// Add GeoJSON data. Please note that the coordinates appear in reverse order [-122.375, 37.61899948120117], compared to their order in the setView() method. This is because the GeoJSON data coordinates are set with the first parameter as X (longitude) and the second parameter as Y (latitude), as documented in the GeoJSON Standard. (Links to an external site.) The L.geoJSON()layer reverses the coordinates to plot them on the map.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "state": "California",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport).addTo(map);

// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport, {
    // We turn each feature into a marker on the map.
    //this is giving the airport name and location 
    pointToLayer: function(feature, latlng) {
      console.log(feature);
      return L.marker(latlng)
      .bindPopup("<h2>" + feature.properties.name + "</h2>" + "<hr>" + "<br>" + feature.properties.city + ", " + feature.properties.state + ", " + feature.properties.country);
    }}).addTo(map);

    //this is giving the airport name and code
L.geoJson(sanFranAirport, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<b>" + "Airport code:" + " " + feature.properties.faa + "</b>" + "<hr>" + "<br>" + "<b>" + "Airport name:" + " " + feature.properties.name + "</b>");
    }
}).addTo(map);