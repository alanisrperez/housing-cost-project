// Creating the map object
let myMap = L.map("map", {
    center: [37.2, -119.41],
    zoom: 6
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  }).addTo(myMap);
  
  // Use this link to get the GeoJSON data.
  let link = '../json-data/California_County_Boundaries.geojson'
  let yearlink = '../data/housing_by_year.csv'
// Getting our GeoJSON data
Promise.all([d3.json(link), d3.csv(yearlink)]).then(function([data, costdata]) {
  // Creating a GeoJSON layer with the retrieved data

  //fillColor = costColorScale(data.feature.value)

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
          console.log(feature.properties.CountyName)
        }
      });
    }
  }).addTo(myMap);
});

const costcolorScale = d3.scaleLinear()
    .domain([100000, 500000, 750000, 1000000])
    .range(["green", "gold", "orange", "red"]);