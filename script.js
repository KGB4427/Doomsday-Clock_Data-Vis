let table;
let sliderYear;
let clockFace;
let HourH;
let ratio = 1.7778; //16:9
let globeScale;
let clockW, clockH, clockX, clockY;
let r = 0; //clock rotation angle

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

     clockW = globeScale*0.6;
     clockH = globeScale*0.6;
     clockX = 10 + clockW/1.6;
     clockY = height*0.1 + clockH/1.5;
        
    //Access the data
    let dataArray = table.getArray();
    //console.log(dataArray);

    //Access the specific data
    let columnArray = table.getColumn('year');
    //console.log(columnArray);

    let infoArray = table.getColumn('reason');
    console.log(infoArray);
  
    //Create a slider : Parameters - (min value, max value, starting value, step value)
    sliderYear = createSlider(table.getColumn('year')[0], table.getColumn('year')[table.getRowCount() - 1], table.getColumn('year')[0], 1);
    let offset = 50;
    let sliderSize = width - offset * 1.75;
    let sliderX = width/2 - sliderSize/2;
    let sliderY = height*0.9;
   
    sliderYear.position(sliderX, sliderY);
    sliderYear.size(sliderSize);

    
    
}

function draw() {

    //Clear the background
    background(0); //0 - 100

    //circle(mouseX, mouseY, globeScale*0.1);

    //Importing the clock
    //change 10 to width*0.01
    imageMode(CENTER);
    image(clockFace, clockX, clockY, clockW, clockH);
    image(HourH, clockX, clockY / 1.2, globeScale * .1, globeScale *.25);
  
    // Display the slider value
    let val = sliderYear.value();

    fill(255, 253, 208); // Set text color to cream
    textSize(globeScale*0.03);
    textAlign(CENTER);
    let offset = 14;
    let sliderPos = map(val, sliderYear.elt.min, sliderYear.elt.max, sliderYear.x, sliderYear.x + sliderYear.width - offset);
    text(val, sliderPos, sliderYear.y - 10); // Adjusted position to be centered above the slider handle
    let iconX = width*0.37;
    let iconY = height*0.78; 
    let iconS = globeScale*0.05;

    let d = dist(mouseX, mouseY, clockX, clockY / 2);
    
    
    if(d < iconS / 2){
        //showText();
        textWrap(WORD);
        textAlign(LEFT);
        doomsdayInfo();
    }

    circle(clockX, clockY / 2.01, iconS); //icon

    textAlign(CENTER);
    exClockHand();


}


function showText() {

    //csv text info
    fill(255);
    textSize(globeScale*0.05);
    text("This is the test data", width*0.8, height*0.7);

}

function exClockHand() {

    let rectW = globeScale*0.01;
    let rectH = -globeScale*0.3;
    let rectX = clockX;
    let rectY = clockY; 

    push();
    translate(rectX, rectY);
    rotate(radians(r));

    rect(0, 0, rectW, rectH);
    pop(); 

    //move the clock hand
    //r += 1; //just keep rotating
    
    // Move the clock hand based on the slider value
    // r = map(sliderYear.value(), 0, 270, -(table.getColumn('sec_to_midnight')[0]) / 10, -(table.getColumn('sec_to_midnight')[table.getRowCount() - 1]) / 10);

    textSize(globeScale*0.07);
    textFont('Georgia');

    for (let i = 0; i < table.getRowCount(); i++) {

            if (sliderYear.value() == table.getColumn('year')[i]) {
                
                r = -table.getColumn('sec_to_midnight')[i] / 10;

                if (table.getColumn('sec_to_midnight')[i] <= 120) {
                    text(addLetterSpacing(table.getColumn('sec_to_midnight')[i] + " Seconds \ntill Midnight", 2), clockX, clockY - clockH/1.45);
                }
                else {
                    text(addLetterSpacing(table.getColumn('sec_to_midnight')[i] / 60.0 + " Minutes \ntill Midnight", 2), clockX, clockY - clockH/1.45);
                }        
        }
    }
}

function doomsdayInfo() {
    for (let i = 0; i < table.getRowCount(); i++) {

        if (sliderYear.value() == table.getColumn('year')[i]) {
            textSize(globeScale*0.02);
            text(addLetterSpacing(table.getColumn('reason')[i], 2), width*0.45, clockY, globeScale*0.9);

    }
}
}

function imageShow() {
    
}

/*
ADJUST LETTER SPACING
Jeff Thompson | 2021 | jeffreythompson.org

If you're used programs like Adobe Illustrator, you've
probably gotten used to really fine control over your
typography. Things like letter spacing can transform
ordinary type into something new. Sadly, we don't have
access to all of those settings in web design and even
fewer in the canvas.

Which means we need a hack! In this case, we create a
function that adds blank 'space separator' characters
(invisible characters that have width) between each
letter in our string.

SEE ALSO
+ Other 'space separator' characters (with varying
  widths) that you might want to try!
  https://www.fileformat.info/info/unicode/category/Zs/list.htm

*/

function addLetterSpacing(input, amount, spacer) {
  
    // 'spacer' character to use
    // (can be passed in as an optional argument, or it
    // will use the unicode 'hair space' one by default)
    spacerCharacter = '\u200A' || spacer;
    
    // split the string into a list of characters
    let characters = input.split('');
    
    // create a series of spacers using the
    // repeat() function
    spacerCharacter = spacerCharacter.repeat(amount);
    
    // use join() to combine characters with the spacer
    // and send back as a string
    return characters.join(spacerCharacter);
  }