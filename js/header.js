const slider = document.querySelector('.mySlider');
slider.addEventListener('input', function() {
    const value = (this.value - this.min) / (this.max - this.min) * 100;
    this.style.setProperty('--value', `${value}%`);
});

selectIndustryButton = document.querySelector('.js-select-industry');

selectIndustryButton.addEventListener('click', () =>{
    if (selectIndustryButton.classList.contains('colored-button'))
        selectIndustryButton.classList.remove('colored-button');
    else
        selectIndustryButton.classList.add('colored-button');
    const dropdownMenu = document.querySelector(".dropdown-menu-industry");
    dropdownMenu.classList.toggle("show");
});

const inputSlider = document.querySelector('.mySlider');

let yearlink = '../data/housing_by_year.csv'

function clearMap() {
    myMap.eachLayer(function(layer) {
      // Ensure that we do not remove the base tile layer
      if (layer != tileLayer) {
        myMap.removeLayer(layer);
      }
    });
  }

function costColor(value) {
    if(value < 10000){
        return 'gray';
    }
    const costcolorScale = d3.scaleLinear()
        .domain([100000, 500000, 750000, 1000000])
        .range(["green", "gold", "orange", "red"]);
    
    return costcolorScale(value);
}
// Add an event listener for the 'input' event
inputSlider.addEventListener('input', function() {
  // Log the current value of the slider
  year =  Number(this.value) + 2010;
  console.log('Slider value:', Number(this.value) + 2010);
  Promise.all([d3.json(link),d3.csv(yearlink)]).then(function([data, costdata]) {
    
    // Create a new array that merges data from both datasets
    let mergedData = data.features.map(feature => {
    let countyName = feature.properties.CountyName; // Extract the county name
    let geometry = feature.geometry;
      // Find the corresponding entry in costdata by matching JSON's CountyName with CSV's County
    let costEntry = costdata.find(c => c.County === countyName);
    let costForYear = costEntry ? costEntry[year.toString()] : null
      
      // Return a new object that combines fields from both datasets
      return {
        type: "Feature",
        properties: {
            countyName:countyName,
            year:year,
            costForYear: costForYear 
        },
        geometry: geometry
      };
    });
    myMap.eachLayer(function (layer) {
        if (layer instanceof L.GeoJSON) {
            myMap.removeLayer(layer);
        }
    });
    console.log(mergedData)
    L.geoJson(mergedData, {
        style: function(feature) {
            return {
                color: 'white',
                fillColor: costColor(feature.properties.costForYear),
                fillOpacity: 0.5,
                weight: 0.5
            }
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
              console.log(feature.properties.countyName)
            }
          });
        }
      }).addTo(myMap);
  });
});