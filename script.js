let table;
let sliderYear;

function preload() {
    table = loadTable('Doomsday_Clock.csv', 'csv', 'header');
}

function setup() {

    //Create a canvas
    createCanvas(900, 400);
    
    
    //Access the data
    let dataArray = table.getArray();
    console.log(dataArray);

    //Access the specific data
    let columnArray = table.getColumn('year');
    console.log(columnArray);
  
    //Create a slider : Parameters - (min value, max value, starting value, step value)
    sliderYear = createSlider(table.getColumn('year')[0], table.getColumn('year')[table.getRowCount() - 1], table.getColumn('year')[0], 1);
    sliderYear.position(50, 350);
    sliderYear.size(500);
}

function draw() {

    background(220);
  
    // Display the slider value
    let val = sliderYear.value();
  
    fill(0);
    textSize(16);
    textAlign(CENTER);
    let sliderPos = map(val, sliderYear.elt.min, sliderYear.elt.max, sliderYear.x, sliderYear.x + sliderYear.width);
    text(val, sliderPos, sliderYear.y - 20); // Adjusted position to be centered above the slider handle

}