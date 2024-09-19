let costlink = '../data/housing_by_month.csv';

function LinearChart(Rows) {
    d3.csv(costlink).then((data) => {
        let linearData = []
            for(let i = 0; i < Rows.length; i++){
            let j = Rows[i];
            let Row = data[j];
            let location = `${Row['County']}`

            let dates = Object.keys(Row).slice(5);
            let values = dates.map(date => parseFloat(Row[date]));

            let trace = {
                x:dates,
                y:values,
                mode: 'lines',
                name:location
            };
            linearData.push(trace);
        }
        Plotly.newPlot('line', linearData);
    }) 
}

function displayMenuElements() {

};
selectCountyButton = document.querySelector('.js-select-county');

selectCountyButton.addEventListener('click', () =>{
    if (selectCountyButton.classList.contains('colored-button'))
        selectCountyButton.classList.remove('colored-button');
    else
        selectCountyButton.classList.add('colored-button');
    const dropdownMenu = document.querySelector(".dropdown-menu-county");
    dropdownMenu.classList.toggle("show");
});

selectHeaderButtons = document.querySelectorAll('.js-header-button');

selectHeaderButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('colored-button')) {
            // If the button is already colored, remove the class
            button.classList.remove('colored-button');
        } else {
            // Remove the class from all buttons
            selectHeaderButtons.forEach(b => {
                b.classList.remove('colored-button');
            });
            // Add the class to the clicked button
            button.classList.add('colored-button');
        }
    });
});

function CreateDropDownElement(inputText, index){
    const dropdownMenu = document.querySelector('.dropdown-menu-county');
    const dropElement = document.createElement('div');
    dropElement.classList.add('drop-element');
    dropElement.id = index;

    // Create the checkbox input
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            indexList.add(index);
            CreateAllLinear();
        } else {
            indexList.delete(index)
            CreateAllLinear();
        }
    });

    // Create the span element
    const span = document.createElement('span');
    span.textContent = inputText;

    // Append the checkbox and span to the div
    dropElement.appendChild(checkbox);
    dropElement.appendChild(span);
    dropdownMenu.appendChild(dropElement);
};

function AddingDropDownDataCounty(){
    d3.csv(costlink).then((data) => {
        for(let i = 0; i < data.length; i++){
            let row = data[i];
            const location = `${row.County} County`;
            CreateDropDownElement(location, i)
        }
    }); 
}
const indexList = new Set();

function CreateAllLinear(){
    LinearChart(Array.from(indexList));
}

AddingDropDownDataCounty();

let industrydata = '../jupyter-notebook/Industry_Housing_County_Completed.json'

function pieChart(County, year) {
    // Filter the data for "Alameda" county
    d3.json(industrydata).then(data => {
        // Filter the data for "Alameda" county
        const filteredData = data.filter(item => item.County === County);
        tempYear = Number(year)+2010;

        // Prepare the data for the pie chart
        let trace = {
            values: filteredData[0].Industry.map(industry => industry.Number_Of_Workers[tempYear]), // Get the worker numbers for the specified year
            labels: filteredData[0].Industry.map(industry => industry.Category), // Map the titles for labels
            type: 'pie'
        };
        console.log(trace);
        let layout = {
            showlegend:false,
            margin: {
                l: 50, // Left margin
                r: 50, // Right margin
                t: 50, // Top margin
                b: 50  // Bottom margin
            }
        }
        // clearing plot
    document.getElementById('pie').innerHTML = '';
    // Plot the pie chart using Plotly
    Plotly.newPlot('pie', [trace], layout);
    })
}

function scatterPlot(industryLabel = 'Leisure and Hospitality') {
    // Load the data using d3.json inside the function
    d3.json(industrydata).then(data => {
        let allScatterData = []; // Single array for all data points

        // Loop through each county's dataset
        data.forEach(item => {
            // Filter for the relevant industry within each county
            let industry = item.Industry.find(ind => ind.Category === industryLabel);
            if (!industry) {
                return; // Skip if the industry is not found
            }

            let employeeData = industry.Workers_Per_100k;
            let housingData = item.housing_cost_by_year;

            // Match years between employee data and housing cost data
            Object.keys(employeeData).forEach(year => {
                if (housingData[year]) {
                    allScatterData.push({
                        x: employeeData[year],  // Number of workers
                        y: housingData[year],   // Housing cost
                        text: `County: ${item.County} - Year: ${year}` // Tooltip with county and year
                    });
                }
            });
        });

        // Create a single trace for all data points
        let trace = {
            x: allScatterData.map(d => d.x),
            y: allScatterData.map(d => d.y),
            mode: 'markers',
            marker: {
                opacity: 0.6 
              },
            type: 'scatter',
            text: allScatterData.map(d => d.text),
            hoverinfo: 'text' // Only show the tooltip with text
        };

        // Layout for the scatter plot
        let layout = {
            title: `${industryLabel} vs Housing Costs (All Counties)`,
            xaxis: {
                title: 'Industry Worker per 100k'
            },
            yaxis: {
                title: 'Housing Costs'
            },
            showlegend: false, // No legend
            margin: {
                l: 60, // Left margin
                r: 60, // Right margin
                t: 50, // Top margin
                b: 50  // Bottom margin
            }
        };

        // Render all counties' data as a single trace on the scatter plot
        Plotly.react('scatter', [trace], layout);
    })
}


scatterPlot();


function barChart(industrylabel = 'Government', year = 2013) {
    d3.json(industrydata).then(data => {
        // Filter data by industry label
        let filteredData = data.filter(item => item.Industry.some(ind => ind.Category === industrylabel));

        // Sort the data by the year-specific value in descending order
        let sortedData = filteredData.sort((a, b) => 
            b.Industry.find(ind => ind.Category === industrylabel).Workers_Per_100k[year] - 
            a.Industry.find(ind => ind.Category === industrylabel).Workers_Per_100k[year]
        );
    
        // Get the top ten entries
        const topTenData = sortedData.slice(0, 10);
        console.log(topTenData); // Debugging
        console.log(year); // Debugging
        
        // Prepare the data for the bar chart
        let trace = {
            x: topTenData.map(d => d.County), // Labels for the x-axis (Counties)
            y: topTenData.map(d => Number(d.Industry.find(ind => ind.Category === industrylabel).Workers_Per_100k[year])), // Values for the y-axis (Workers)
            type: 'bar',
            marker: {
                color: 'gold' // Customize the bar color
            }
        };
        
        // Layout for the bar chart
        let layout = {
            showlegend: false,
            margin: {
                l: 40, // Left margin
                r: 40, // Right margin
                t: 40, // Top margin
                b: 80  // Bottom margin
            },
        };

        // Plot the bar chart using Plotly
        Plotly.newPlot('bar', [trace], layout);
    });
}
barChart();