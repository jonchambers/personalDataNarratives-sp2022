let canvas;
let table;

let usaButton;
let buttons;

let s = 'During the 14 days, I used the sleeping monitor to collect my sleeping data and there are something interesting happening in my dream.';

let memoryData = [];

let imageArray = [];

function preload(){
  table = loadTable('js/YinanPanDataCollection.csv', 'csv', 'header');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style("z-index", "-1");
  background(244, 230, 186);
  for (var x = 0; x < width; x += width / 50) {
    for (var y = 0; y < height; y += height / 30) {
      stroke(125, 165, 188);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }

  //create the country buttons and trigger different
  //functions to display the different country data
    chinaButton = createButton('China')
    usaButton = createButton('USA')

    chinaButton.mousePressed(chinaLocations)
    usaButton.mousePressed(usaLocations);


  textAlign(CENTER);


  //top banner rectangle
  //big rectangle
  fill(122,201,67);
  rect(306, 87, 835, 135);
  stroke(0);
  strokeWeight(1.5);
  fill(255);
  rect(287, 70, 835, 130);

  //small rectangle
  noStroke();
  fill(0, 169, 157);
  rect(432, 63, 300, 50);
  stroke(0);
  strokeWeight(1.5);
  fill(255, 161, 204);
  rect(432, 50, 289, 50);

  //smily face
  fill(241, 90, 36);
  rect(287, 70, 145, 130);
  fill(249, 180, 88);
  circle(360, 135, 120);

  //title text
  noStroke();
  fill(255);
  textSize(30);
  text('My Merrories Blog', 570, 85);

  //paragraph text
  noStroke()
  textAlign(LEFT);
  fill(0);
  textSize(14);
  text(s, 454, 140, 530, 200);

  //Date text
  noStroke();
  fill(0);
  textSize(18);
  text('2021.02.25 ~ 2021.03.10', 750, 94);

  //Data box
  noStroke();
  fill(0, 169, 157);
  rect(880, 222, 390, 535);
  stroke(0);
  strokeWeight(1.5);
  fill(255);
  rect(900, 240, 350, 498);

  //photos box
  noStroke();
  fill(59, 157, 196);
  rect(255, 208, 625, 560);
  stroke(0);
  strokeWeight(1.5);
  fill(255);
  rect(287, 240, 560, 498);

}


function chinaLocations(){

  //empty the locations data object array
  memoryData.splice(0,memoryData.length);

  //get all the buttons with class locationButtons and delete them
  //so that we start over with new buttons everytime we change countries
  buttons = document.getElementsByClassName('locationButtons');
  print(buttons.length);
  while(buttons.length > 0){
      buttons[0].parentNode.removeChild(buttons[0]);
  }


  //create new data and buttons for China
  for(let i = 0; i < table.getRowCount(); i++){
    if(table.getString(i, 'Countries') == 'China'){
      date = table.getString(i, 'Date');


      events = table.getString(i, 'Events');

      countries = table.getString(i, 'Countries');

      memoryLocation = table.getString(i, 'Location');

      memory = table.getString(i, 'Memory');

      imageArray[i] = loadImage('photos/' + table.getString(i, 'Images'));


      memoryData.push(new MemoryData(date, events, countries, memoryLocation, memory, imageArray[i]));
    }
  }

  for (let i = 0; i < memoryData.length; i++){
    memoryData[i].show();
  }
}

function usaLocations(){

  //empty the locations data object array
  memoryData.splice(0,memoryData.length);

  //get all the buttons with class locationButtons and delete them
  //so that we start over with new buttons everytime we change countries
   buttons = document.getElementsByClassName('locationButtons');
    print(buttons.length);
    while(buttons.length > 0){
        buttons[0].parentNode.removeChild(buttons[0]);
    }

  //create new data and buttons for USA
  for(let i = 0; i < table.getRowCount(); i++){
    if(table.getString(i, 'Countries') == 'USA'){
      date = table.getString(i, 'Date');


      events = table.getString(i, 'Events');

      countries = table.getString(i, 'Countries');

       memoryLocation = table.getString(i, 'Location');

        memory = table.getString(i, 'Memory');

       imageArray[i] = loadImage('photos/' + table.getString(i, 'Images'));


      memoryData.push(new MemoryData(date, events, countries, memoryLocation, memory, imageArray[i]));
    }
  }

  for (let i = 0; i < memoryData.length; i++){
    memoryData[i].show();
  }


}

class MemoryData{
  constructor(date, events, countries, memoryLocation, memory, image){
    this.date = date;
     this.events = events;
     this.countries = countries;
     this.memoryLocation = memoryLocation;
     this.memory = memory;
     this.image = image;

    this.button = createButton(this.date)

    //add the locationButtons class to the buttons
    this.button.addClass('locationButtons');

    for(let i = -1; i < memoryData.length; i++){
      this.button.position(10, i*40+100);
    }
    this.button.style('z-index', '1');
  }

  show(){
    this.button.mousePressed(() => this.update())
  }

  update(){

    //we didn't need to redraw the other boxes because they weren't being updated.
    //the illustration and data boxes do becasue text is being drawn again
    //illustration
    noStroke();
    fill(0, 113, 188);
    rect(310, 273, 326, 326);
    stroke(0);
    strokeWeight(1.5);
    fill(255);
    rect(294, 259, 326, 326);

    //Data box
    stroke(0);
    strokeWeight(1.5);
    fill(255);
    rect(900, 240, 350, 498);

    print("update");


    //
    // //this is where you create your interface and swap out
    // //the data for each dream entry.
    fill(0);
    noStroke();
    textSize(20);
    textAlign(LEFT);

     text('Events: ' + this.events, 925, 320);
     text('Countries: ' + this.countries, 925, 360)
     text('Location: ' + this.memoryLocation, 925, 400);
     text('Memory: ' + this.memory, 925, 440, 300, 800);
    image(this.image, 287, 240, 560, 498);
  }
}
