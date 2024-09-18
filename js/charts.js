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

let industrydata = '../data/industry_county.json'

function pieChart(County, year) {
    // Filter the data for "Alameda" county
    d3.json(industrydata).then(data => {
        // Filter the data for "Alameda" county
        const filteredData = data.filter(item => item.County_ID === County);
        console.log(year)

        const topTenData = filteredData.slice(0, 10);
        // Prepare the data for the pie chart
        let trace = {
            values: topTenData.map(d => d[`${Number(year)+ 2010}_Average`]), // Map the 2023 average values
            labels: topTenData.map(d => d.TITLE), // Map the titles for labels
            type: 'pie'
        };
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

function scatterPlot(industrylabel = 'Civilian Labor Force'){
    const filteredData = data.filter(item => item.TITLE === industrylabel)
    Promise.all([d3.json(filteredData),d3.csv(yearlink)]).then(function([data, costdata]) {
        let mergedData = data.map(feature =>{
            let countyName = feature.County_ID
        })
    })
}

function barChart(industrylabel = 'Civilian Labor Force', year = 2013){
    d3.json(industrydata).then(data => {
        let filteredData = data.filter(item => item.TITLE === industrylabel)
        const yearKey = `${year}_Average`;

        // Sort the data by the year-specific value in descending order
        let sortedData = filteredData.sort((a, b) => b[yearKey] - a[yearKey]);
    
        // Get the top ten entries
        const topTenData = sortedData.slice(0, 10);
        console.log(topTenData)
        console.log(yearKey)
        let trace = {
            x: topTenData.map(d => d.County_ID), // Labels for the x-axis
            y: topTenData.map(d => Number(d[yearKey])), // Values for the y-axis
            type: 'bar',
            marker: {
                color: 'gold' // Change this to your desired color
            }
        };
        let layout = {
            showlegend: false,
            margin: {
                l: 40, // Left margin
                r: 40, // Right margin
                t: 40, // Top margin
                b: 80  // Bottom margin
            },
        }
        Plotly.newPlot('bar', [trace], layout)
    })
}
barChart();