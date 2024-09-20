let costlink = '../data/avg_cost_by_county.csv';

function LinearChart(Rows) {
    d3.csv(costlink).then((data) => {
        let linearData = []
            for(let i = 0; i < Rows.length; i++){
            let Row = data[i];
            let location = `${Row['RegionName']}, ${Row['State']}`

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

function PieChart(jobData) {
    let pieData = [{
        labels: jobData.map(d => d.Industry),
        values: jobData.map(d => parseFloat(d.Percentage)),
        type: 'pie'
    }];

    Plotly.newPlot('pie', pieData);
}

function loadJobIndustryData() {
    d3.csv('../data/job_industry_data.csv').then((data) => {
        PieChart(data);
    });
}

function displayMenuElements() {

};
selectCountyButton = document.querySelector('.js-select-county');

selectCountyButton.addEventListener('click', () =>{
    if (selectCountyButton.classList.contains('colored-button'))
        selectCountyButton.classList.remove('colored-button');
    else
        selectCountyButton.classList.add('colored-button');
    const dropdownMenu = document.querySelector(".dropdown-menu");
    dropdownMenu.classList.toggle("show");
});

selectHeaderButtons = document.querySelectorAll('.js-header-button');

selectHeaderButtons.forEach(button => {
    button.addEventListener('click', () =>{
        selectHeaderButtons.forEach(b =>{
            b.classList.remove('colored-button');
        })
        button.classList.add('colored-button');
    })
})

function CreateDropDownElement(inputText, index){
    const dropdownMenu = document.querySelector('.dropdown-menu');
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

function AddingDropDownData(){
    d3.csv(costlink).then((data) => {
        for(let i = 0; i < 20; i++){
            let row = data[i];
            const location = `${row.RegionName}`;
            CreateDropDownElement(location, i)
        }
    }); 
}
const indexList = new Set();

function CreateAllLinear(){
    LinearChart(Array.from(indexList));
}

AddingDropDownData();