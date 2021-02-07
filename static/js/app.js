//Use the D3 library to read in json data and append values to dropdown menu
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
  
//Use `d3.json` to fetch the data for the plots and display
function optionChanged(id){
    console.log(id);
    d3.json('samples.json').then(function(jsonData){

    
    // Grab values from the data json object to build the plots
    var patientId = jsonData.samples.filter(x=>x.id == id)[0];
    console.log(patientId);

    var otuId = patientId.otu_ids;
    var sampleValue = patientId.sample_values;
    var otuLabel = patientId.otu_labels;


    //Create the trace for bar plot
    var barplot = {
        x:sampleValue.slice(0,10).reverse(),
        y:otuId.slice(0,10).map(y=>"otu "+y).reverse(),
        text: otuLabel.slice(0,10).reverse(),
        type:'bar',
        orientation: 'h'
    };

    // Define the plot layout for bar plot
    var barlayout = {
        title: "Sample value vs Otu Id",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "Otu Ids" }
    };

    //Create the trace for bubble chart
    var bubbleData = {
        x:otuId,
        y:sampleValue,
        text: otuLabel,
        mode:'markers',
        marker: {
            size:sampleValue,
            color: otuId
        }
    };
    
    // Define the plot layout for bubble chart
    var bubblelayout = {
        title: "Otu Id vs Sample value ",
        xaxis: { title: "Otu Ids" },
        yaxis: { title: "Sample Values" }
    };

    //Plot the charts
    Plotly.newPlot('bar', [barplot], barlayout);

    Plotly.newPlot('bubble', [bubbleData], bubblelayout);


    ///Metadata to display an individual's demographic information
    var demoData = d3.select('#sample-metadata');
    var demoInfo = jsonData.metadata.filter(x=> x.id==id)[0];

    demoData.html('');
        Object.entries(demoInfo).forEach(([key, value])=>{
        demoData
            .append('h5')
            .text(`${key} : ${value}`)
        });
   

    //Create the trace for guage chart
    var guageData = 
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: demoInfo.wfreq,
          title: { text: "Number of belly button washes per week" },
          type: "indicator",
          mode: "gauge+number",
          
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 1], color:'lightgrey' },
              
            ],
            
          }
        };      

    var guagelayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

    Plotly.newPlot('gauge', [guageData], guagelayout);
});
};



   

