var value = d3.json('samples.json').then(function(jsonData){
    console.log(jsonData);
    
        var dropdownMenu = d3.select('#selDataset').selectAll('option');
        dropdownMenu
            .data(jsonData.names)
            .enter()
            .append('option')
            .property('value', d=>d)

            .text(d=>d)   
    optionChanged(jsonData.names[0]); 

});
  

function optionChanged(id){
    console.log(id);
    d3.json('samples.json').then(function(jsonData){

    
    // Grab values from the data json object to build the plots
    var patientId = jsonData.samples.filter(x=>x.id == id)[0];
    console.log(patientId);

    var otuId = patientId.otu_ids;
    var sampleValue = patientId.sample_values;
    var otuLabel = patientId.otu_labels;


    
    var barplot = {
        x:sampleValue.slice(0,10).reverse(),
        y:otuId.slice(0,10).map(y=>"otu "+y).reverse(),
        text: otuLabel.slice(0,10).reverse(),
        type:'bar',
        orientation: 'h'
    };

    var bubbles = {
        x:otuId,
        y:sampleValue,
        text: otuLabel,
        mode:'markers',
        marker: {
            size:sampleValue,
            color: otuId
        }
    };
        

    Plotly.newPlot('bar', [barplot]);

    Plotly.newPlot('bubble', [bubbles]);


    ///metadata of patient
    var demoData = d3.select('#sample-metadata');
    var demoInfo = jsonData.metadata.filter(x=> x.id==id)[0];

    demoData.html('');
        Object.entries(demoInfo).forEach(([key, value])=>{
        demoData
            .append('h5')
            .text(`${key} : ${value}`)
        });
   

    //guage chart
    var data = [
	    {
		domain: { x: [0, 1], y: [0, 1] },
		value: demoInfo.wfreq,
		title: { text: "Wash Frequency per week" },
		type: "indicator",
		mode: "gauge+number"
	    }
    ];

    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);
});
};



   

