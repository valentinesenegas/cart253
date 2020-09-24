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
  irisEye1.x = map(mouseX, 0, width, eye1.x-irisEye1.size*0.75, eye1.x+irisEye1.size*0.75);

  // The iris will stay inside the limits of the eye
  irisEye1.x = constrain(irisEye1.x, eye1.x-irisEye1.size*0.75, eye1.x+irisEye1.size*0.75);

  // As the mouse goes from top to bottom of the canvas, the iris will go from the top to the bottom of the eye
  irisEye1.y = map(mouseY, 0, width, eye1.y-irisEye1.size*0.75, eye1.y+irisEye1.size*0.75);

  // The iris will stay inside the limits of the eye
  irisEye1.y = constrain(irisEye1.y, eye1.y-irisEye1.size*0.75, eye1.y+irisEye1.size*0.75);

//--------- EYE 2 ---------//

  // Eye 2
  fill(eye2.r, eye2.g, eye2.b);
  ellipse(eye2.x, eye2.y, eye2.size);

  // Iris of Eye 2
  fill(irisEye2.r, irisEye2.g, irisEye2.b);
  ellipse(irisEye2.x, irisEye2.y, irisEye2.size);

  //--------- EYE 3 ---------//
  // Eye 3
  fill(eye3.r, eye3.g, eye3.b);
  ellipse(eye3.x, eye3.y, eye3.size);

  // Iris of Eye 2
  fill(irisEye3.r, irisEye3.g, irisEye3.b);
  ellipse(irisEye3.x, irisEye3.y, irisEye3.size);

    //---- MOUTH ----//

    // Draw the mouth
    stroke('#EE90C2');
    strokeWeight(4);
    fill(243, 178, 213);
    arc(286, 340, 80, 80, 0, PI + QUARTER_PI, CHORD);

    // Draw the teeth
    noStroke();
    fill(1000);
    arc(286, 330, 20, 20, 0, PI + QUARTER_PI, OPEN);
    arc(312, 341, 20, 20, 0, PI + QUARTER_PI, OPEN);




}
