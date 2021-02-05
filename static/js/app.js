// d3.json("samples.json").then(function(data){ 
//     data.names.forEach((x)=>{
//     var dropDown = d3.select('#selDataset');
//     dropDown
//             .append('option')
//             .text(x)
//             .property('value', x)
//     });
    // chart(data.names[0]);
// });

// function chart(id){

    // d3.json("samples.json").then(function(data){ 
    //     console.log(data);
    //     id = 946;
    //     var valueID = data.samples.filter(x=>x.id == id);
    //     console.log(valueID)});
        // var otuId = valueID[0].otu_ids;
        // var bacteria = valueID[0].otu_labels;
        // var sample = valueID[0].sample_values;
        // bar chart
        //demo display
        // bubble chart

        


//     });
// }

// function optionChanged(value){
//     chart(value);

// }


//****************************************************************** */


//****************************************************************** */

var value = d3.json('samples.json').then(function(jsonData){
    console.log(jsonData);
    
        var dropdownMenu = d3.select('#selDataset').selectAll('option');
        dropdownMenu
            .data(jsonData.names)
            .enter()
            .append('option')
            .text(d=>d)   
});

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  };
  

d3.selectAll("#selDataset").on("change", optionChanged);


function optionChanged(id){
    d3.json('samples.json').then(function(jsonData){

    // jsonData.samples.forEach(item=>{
    
    // Grab values from the data json object to build the plots
    var patientId = jsonData.samples.filter(x=>x.id == id);

    // var otuId = patientId.otu_ids
    // var sortedOtuId = otuId.sort((a, b) => a.otuId - b.otuId);
    // slicedSortedOtuId = sortedOtuId.slice(0, 10);


    // var sampleValue = slicedSortedOtuId.map(y=>y.sample_values);
    // var otuLabel = slicedSortedOtuId.map(y=>y.otu_lables)

    var sampleValue = unpack(patientId.map(y=>y.sample_values));
    var otuLabel = patientId.map(y=>y.otu_lables)

    
    var barplot = {
        x:patientId,
        y:sampleValue,
        name: otuLabel,
        type:'bar',
        orientation: 'h'
    };

    var bubbles = {
        x:patientId,
        y:sampleValue,
        name: otuLabel,
        type:'markers',
        markers: {
            size:sampleValue,
            color: patientId
        }
    };
        

    Plotly.newPlot('bar', [barplot]);

    Plotly.newPlot('bubble', [bubbles]);


    ///metadata of patient
    // var demoData = d3.select('#sample-metadata').selectAll('ul').selectAll('li');
    var demoInfo = jsonData.metadata.filter((d,i)=> d);
    console.log(demoInfo);

    Object.entries(jsonData.metadata).forEach(item=>{
        Object.entries(item).forEach(([key, value])=>{
        console.log( `${key} : ${value}`);
        // demoData
        //     .data(jsonData.metadata)
        //     .enter()
        //     .append('li')
        //     .text(([key, value])=> `${key} : ${value}`)

        })
    })

    //guage chart
var washFreq = jsonData.metadata.filter(x=>x.wfreq);
console.log(washFreq)
var data = [
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: 9,
		title: { text: "Speed" },
		type: "indicator",
		mode: "gauge+number"
	}
];

var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', data, layout);
    

});
};



optionChanged(value);    

//********************************************************************** */


//*********************************************************************** */

// d3.json('samples.json').then(function(jsonData){

//     // jsonData.samples.forEach(item=>{
//     // id = 946;
//     // Grab values from the data json object to build the plots
//     // var patientId = jsonData.samples.filter(x=>x.id == id);
//     var patientId = jsonData.samples[0];
//     var otuId = patientId.otu_ids
//     console.log(otuId);

//     // var otuId = jsonData.samples.otu_ids;
//     var sortedOtuId = otuId.sort((a, b) => (a.otuId - b.otuId));
//     console.log(sortedOtuId);
//     slicedSortedOtuId = sortedOtuId.slice(0, 10);
//     console.log(slicedSortedOtuId);

//     var sampleValue = slicedSortedOtuId.map(y=>y.sample_values);
//     var otuLabel = slicedSortedOtuId.map(y=>y.otu_lables)

//     var trace1 = {
//         x:slicedSortedOtuId,
//         y:sampleValue,
//         name: otuLabel,
//         type:'bar'
        
//     };

//     Plotly.newPlot('bar', [trace1]);

// });



