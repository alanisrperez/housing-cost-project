// Creating the map object
let myMap = L.map("map", {
    center: [37.2, -119.41],
    zoom: 6
  });
  
  // Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(myMap);
  
  // Use this link to get the GeoJSON data.
let link = 'https://cecgis-caenergy.opendata.arcgis.com/api/download/v1/items/ce721c35ab7e4e4b89ef2080b4c331f6/geojson?layers=0';

// Initialize a variable to hold the GeoJSON data

d3.json(link).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data


  L.geoJson(data, {
    style: {
      color: 'white',
      fillColor: 'orange',
      fillOpacity: 0.5,
      weight: 0.5
    },
    // This is called on each feature.
    onEachFeature: function(feature, layer) {
      // Set the mouse events to change the map styling.
      layer.on({
        // When a user's mouse cursor touches a map feature, the mouseover event calls this function
        // This changes the feature's opacity to 90% so that it stands out.
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature (mouseout event), the feature's opacity reverts back to 50%.
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
          L.popup()
            .setLatLng(event.latlng) // Set popup to the clicked location
            .setContent(`<b>${feature.properties.NAME}</b>`) // Set the content of the popup
            .openOn(myMap);
          pieChart(feature.properties.NAME,
            document.querySelector('.mySlider').value
          );
        }
      });
    }
  }).addTo(myMap);
});
