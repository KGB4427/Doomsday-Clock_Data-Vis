let table;
let sliderYear;
let clockFace;
let HourH;
let ratio = 1.7778; //16:9
let globeScale; 

function preload() {
    table = loadTable('Doomsday_Clock.csv', 'csv', 'header');
    clockFace = loadImage('./Doomsday_Clock_Photos/DD-clock.png');
    HourH = loadImage('./Doomsday_Clock_Photos/HH.png');
}

function setup() {

    //Create a canvas
    createCanvas(window.innerWidth, window.innerWidth / ratio);
    //background(220);
    globeScale = min(width, height);
    globeScale*0.1;
        
    //Access the data
    let dataArray = table.getArray();
    console.log(dataArray);

    //Access the specific data
    let columnArray = table.getColumn('year');
    console.log(columnArray);
  
    //Create a slider : Parameters - (min value, max value, starting value, step value)
    sliderYear = createSlider(table.getColumn('year')[0], table.getColumn('year')[table.getRowCount() - 1], table.getColumn('year')[0], 1);
    let offset = 50;
    sliderYear.position(offset, innerHeight);
    sliderYear.size(width - offset * 1.75);
    
}

function draw() {

    //Clear the background
    background(0);

    //Importing the clock
    let clockW = globeScale;
    let clockH = globeScale;
    let clockX = globeScale - 100;
    let clockY = globeScale - 100;
    imageMode(CENTER);
    image(clockFace, clockX, clockY, clockW, clockH);
    image(HourH, clockX, clockY / 1.2, 135 / 2, 453 / 2);
  
    // Display the slider value
    let val = sliderYear.value();

    fill(255, 253, 208); // Set text color to cream
    textSize(16);
    textAlign(CENTER);
    let offset = 14;
    let sliderPos = map(val, sliderYear.elt.min, sliderYear.elt.max, sliderYear.x, sliderYear.x + sliderYear.width - offset);
    text(val, sliderPos, sliderYear.y - 80); // Adjusted position to be centered above the slider handle

}