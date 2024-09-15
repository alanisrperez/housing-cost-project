let link = '../data/avg_cost_by_country.csv';

function LinearChart(Country) {
    d3.csv(link).then((data) => {
        let header = Object.keys(data[0]).slice(5);
        let firstRow = data[0]
        const location = `${firstRow[2]}, ${firstRow[3]}`;
        firstRow = firstRow.slice(5);

        let trace = {
            x:header,
            y:firstRow,
        };
        let LinearData = [trace]
    }) 
}