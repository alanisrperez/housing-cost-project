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
    const dropdownMenu = document.querySelector(".dropdown-menu");
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

AddingDropDownData();
