/**************************************************
Exercise 1: I like to move it move it
Valentine Sénégas

Here is a description of this wonderful project:
The iris of the monster will change size as the mouse moves on the canvas.
**************************************************/
// Variables

let bg = {
  r: 108,
  g: 88,
  b: 188
};

let head = {
  x: 250,
  y:250,
  size: 300,
  r: 193,
  g: 250,
  b: 235
};

let eye1 = {
  x: 150,
  y:150,
  size: 100,
  r: 228,
  g: 245,
  b: 240
};

let irisEye1 = {
  x: 150,
  y:150,
  size: 40,
  sizeRatio: 0.75,
  r: 28,
  g: 25,
  b: 20
};

let eye2 = {
  x: 350,
  y:150,
  size: 100,
  r: 228,
  g: 245,
  b: 240
};

let irisEye2 = {
  x: 350,
  y:150,
  size: 40,
  r: 28,
  g: 25,
  b: 20
};

let eye3 = {
  x: 250,
  y:150,
  size: 50,
  r: 228,
  g: 245,
  b: 240
};

let irisEye3 = {
  x: 250,
  y:150,
  size: 20,
  r: 28,
  g: 25,
  b: 20
};

let mouth = {
  strokeColor: '#EE90C2',
  strokeWeight: 4,
  r:243,
  g:178,
  b:213,
  arcX:256,
  arcY:300,
  arcWidth:80,
  arcHeight:80,
  arcStart:0,
  // arcStop:PI + QUARTER_PI, CHORD
};

let tooth = {
  arcWidth:20,
  arcHeight:20
};

// setup()
//
// Creation of the canvas and setting no stroke for shapes.
function setup() {
  createCanvas(500, 500);
  noStroke();
}


// draw()
//
// Drawing of the shapes and setting the background color.
function draw() {

  // Background
  background(bg.r, bg.g, bg.b);

  // As the mouse moves in all direction, the background color will change
  bg.r = map(mouseY, 0, width, 108, 150);
  bg.g = map(mouseY, 0, width, 88, 100);
  bg.g = map(mouseX, 0, width, 188, 230);

   console.log(`background.r is ${background.r}`); // NEW!


  // Head of the monster
  fill(head.r, head.g, head.b);
  ellipse(head.x, head.y, head.size);

//--------- EYE 1 ---------//

  // Eye 1
  fill(eye1.r, eye1.g, eye1.b);
  ellipse(eye1.x, eye1.y, eye1.size);

  // Iris of Eye 1
  fill(irisEye1.r, irisEye1.g, irisEye1.b);
  ellipse(irisEye1.x, irisEye1.y, irisEye1.size);

  // As the mouse goes from left to right, the iris will go from left to right inside the eye
  irisEye1.x = map(mouseX, 0, width, eye1.x-irisEye1.size*irisEye1.sizeRatio, eye1.x+irisEye1.size*irisEye1.sizeRatio);

  // As the mouse goes from the top to the bottom of the canvas, the iris will go from the top to the bottom of the eye
  irisEye1.y = map(mouseY, 0, width, eye1.y-irisEye1.size*irisEye1.sizeRatio, eye1.y+irisEye1.size*irisEye1.sizeRatio);

  // The iris will stay inside the limits of the eye
  irisEye1.x = constrain(irisEye1.x, eye1.x-irisEye1.size*irisEye1.sizeRatio, eye1.x+irisEye1.size*irisEye1.sizeRatio);
  irisEye1.y = constrain(irisEye1.y, eye1.y-irisEye1.size*irisEye1.sizeRatio, eye1.y+irisEye1.size*irisEye1.sizeRatio);


//--------- EYE 2 ---------//

  // Eye 2
  fill(eye2.r, eye2.g, eye2.b);
  ellipse(eye2.x, eye2.y, eye2.size);

  // Iris of Eye 2
  fill(irisEye2.r, irisEye2.g, irisEye2.b);
  ellipse(irisEye2.x, irisEye2.y, irisEye2.size);

  // As the mouse goes from left to right, the size of the iris will grow
  irisEye2.size = map(mouseX, 0, width, 50, 70);

  // As the mouse moves in all direction, the color of the iris will change
  irisEye2.r = map(mouseY, 0, width, 0, 150);
  irisEye2.g = map(mouseY, 0, width, 40, 150);
  irisEye2.b = map(mouseX, 0, width, 60, 200);


//--------- EYE 3 ---------//

  // Eye 3
  fill(eye3.r, eye3.g, eye3.b);
  ellipse(eye3.x, eye3.y, eye3.size);

  // Iris of Eye 2
  fill(irisEye3.r, irisEye3.g, irisEye3.b);
  ellipse(irisEye3.x, irisEye3.y, irisEye3.size);


    //---- MOUTH  AND TEETH ----//

    // Draw the mouth
    stroke('#EE90C2');
    // stroke(arc.strokeColor);
    strokeWeight(mouth.strokeWeight);
    fill(mouth.r, mouth.g, mouth.b);
    arc(mouth.arcX, mouth.arcY, mouth.arcWidth, mouth.arcHeight, mouth.arcStart, PI + QUARTER_PI, CHORD);


    // Draw the teeth
    noStroke();
    fill(1000);
    arc(mouth.arcX, mouth.arcY-10, tooth.arcWidth, tooth.arcHeight, 0, PI + QUARTER_PI, OPEN);          // Left tooth
    arc(mouth.arcX+26, mouth.arcY+1, tooth.arcWidth, tooth.arcHeight, 0, PI + QUARTER_PI, OPEN);       // Right tooth



}
