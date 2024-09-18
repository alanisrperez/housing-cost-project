//This Provides Color for the Gradient in the slider
const slider = document.querySelector('.mySlider');
slider.addEventListener('input', function() {
    const value = (this.value - this.min) / (this.max - this.min) * 100;
    this.style.setProperty('--value', `${value}%`);
});

//getting the industry selection button that is on the right side of the header
selectIndustryButton = document.querySelector('.js-select-industry');
//Colors that industry button
selectIndustryButton.addEventListener('click', () =>{
    //if it contains the colored-button attribute, remove it, stops it from being active
    if (selectIndustryButton.classList.contains('colored-button'))
        selectIndustryButton.classList.remove('colored-button');
    // this adds the feature and show it the animation
    else
        selectIndustryButton.classList.add('colored-button');
    const dropdownMenu = document.querySelector(".dropdown-menu-industry");
    dropdownMenu.classList.toggle("show");
});

let yearlink = '../data/housing_by_year.csv'

//clears existing map info
function clearMap() {
    myMap.eachLayer(function(layer) {
      // Ensure that we do not remove the base tile layer
      if (layer != tileLayer) {
        myMap.removeLayer(layer);
      }
    });
  }
// a function for the house prices to decide the given color
function costColor(value) {
    //returns gray, if below 10000 - meaning not a real value
    if(value < 10000){
        return 'gray';
    }
    // then it goes through a color scale
    const costcolorScale = d3.scaleLinear()
        .domain([100000, 500000, 750000, 1000000])
        .range(["green", "gold", "orange", "red"]);
    
    return costcolorScale(value);
}
// year slider input
const inputSlider = document.querySelector('.mySlider');
// Add an event listener for the 'input' event
inputSlider.addEventListener('input', function() {
   //checks to see if any of the main selector buttons are highlighted, if not it won't activate
    pricesbutton = document.querySelector('.js-prices');
    industrybutton = document.querySelector('.js-industry');
    if(!pricesbutton.classList.contains('colored-button') && !industrybutton.classList.contains('colored-button'))
       return 
  // Log the current value of the slider
  year =  Number(this.value) + 2010;
  //Temp Merge of the two data types
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
              pieChart(feature.properties.countyName,
                document.querySelector('.mySlider').value
              );
            }
          });
        }
      }).addTo(myMap);
  });
});

//this creates the drop down menu of industry types as a checklist

function CreateDropDownElementIndustry(inputText, index){
    //finding the check box location
    const dropdownMenu = document.querySelector('.dropdown-menu-industry');
    const dropElement = document.createElement('div');
    //createing an drop down element with an associated id value/index
    dropElement.classList.add('drop-element');
    dropElement.id = index;

    // Create the checkbox input
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    //event listener makes it so that only one checkbox can be selected at a time
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            // Uncheck all other checkboxes in the dropdown
            const allCheckboxes = dropdownMenu.querySelectorAll('input[type="checkbox"]');
            allCheckboxes.forEach((box) => {
                if (box !== checkbox) {
                    box.checked = false;
                }
            });
        }
        const textContent = checkbox.nextSibling ? checkbox.nextSibling.textContent : '';
        console.log(textContent);
        barChart(checkbox.textContent,2013)
    });

    // Create the span element
    const span = document.createElement('span');
    span.textContent = inputText;

    // Append the checkbox and span to the drop element
    dropElement.appendChild(checkbox);
    dropElement.appendChild(span);
    dropdownMenu.appendChild(dropElement);
};

let industrylink = '../data/California_county.csv'

//this loops the creation of a drop down element/ the function directly above
function AddingDropDownDataIndustry(){
    d3.csv(industrylink).then((data) => {
        for(let i = 0; i < data.length; i++){
            let row = data[i];
            const industry = `${row.TITLE}`;
            CreateDropDownElementIndustry(industry, i)
        }
    }); 
}

AddingDropDownDataIndustry();