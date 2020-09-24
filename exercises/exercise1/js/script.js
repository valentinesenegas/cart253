/**************************************************
Exercise 1: I like to move it move it
Valentine Sénégas

Here is a description of this wonderful project:
We have a three-eyed monster, let's call him Steve.
Steve's left eye is a bit hyperactive, and it likes to look at things that move (move your mouse around and it will follow you).
Steve's right eye will change size and color as the mouse moves on the canvas.
Finally, Steve's middle eye will only change size as you continue to wildy move your mouse.
Enjoy playing with Steve!
**************************************************/
// Variables

let bg = {
  r: 108,
  g: 88,
  b: 188,
  maxRange: 220,
  minRangeR: 108,
  minRangeG: 88,
  minRangeB: 188
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
  r: 236,
  g: 137,
  b: 191
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
  sizeRatio: 0.2,
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
  sizeRatio: 0.85,
  r: 140,
  g: 192,
  b: 237
};

let mouth = {
  strokeR: 238,
  strokeG: 144,
  strokeB: 194,
  strokeWeight: 4,
  r:243,
  g:178,
  b:213,
  arcX:256,
  arcY:300,
  arcWidth:80,
  arcHeight:80,
  arcStart:0,
  arcStop: 0,
  mode: 0
};

let tooth = {
  arcWidth:20,
  arcHeight:20,
  fill: 1000,
  mode:0
};


// setup()
//
// Creation of the canvas, declaring constants and setting no stroke for shapes.
function setup() {
  mouth.arcStop = PI + QUARTER_PI;
  mouth.mode = CHORD;
  tooth.mode = OPEN;

  createCanvas(500, 500);
  noStroke();
}


// draw()
//
// Drawing of the shapes, setting the background color and animations!
function draw() {

//--------- BACKGROUND ---------//
  background(bg.r, bg.g, bg.b);

  // As the mouse moves in all direction, the background color will change.
  bg.r = map(mouseY, 0, width, bg.minRangeR, bg.maxRange);
  bg.g = map(mouseY, 0, width, bg.minRangeG, bg.maxRange);
  bg.b = map(mouseX, 0, width, bg.minRangeB, bg.maxRange);


  //--------- MONSTER ---------//

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

  // As the mouse goes from the left to the right, the iris will go from the left to the right
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

  // As the mouse goes from the left to the right, the size of the iris will grow
  irisEye2.size = map(mouseX, 0, width, 50, 70);

  // The iris will stay inside the limits of the eye
  irisEye2.size = constrain(irisEye2.size, eye2.size/5, eye2.size);

  // As the mouse moves in all direction, the color of the iris will change
  irisEye2.r = map(mouseY, 0, width, 0, 150);
  irisEye2.g = map(mouseY, 0, width, 40, 150);
  irisEye2.b = map(mouseX, 0, width, 60, 200);


//--------- EYE 3, the smallest eye ---------//

  // Eye 3
  fill(eye3.r, eye3.g, eye3.b);
  ellipse(eye3.x, eye3.y, eye3.size);

  // Iris of Eye 3
  fill(irisEye3.r, irisEye3.g, irisEye3.b);
  ellipse(irisEye3.x, irisEye3.y, irisEye3.size);

  // As the mouse goes from the left to the right, the size of the iris will grow
  irisEye3.size = map(mouseX, 0, width, eye3.size/3, eye3.size-2);

  // The iris will stay inside the limits of the eye
  irisEye3.size = constrain(irisEye3.size, eye3.size/5, eye3.size*irisEye3.sizeRatio);


//--------- MOUTH  AND TEETH ---------//

    // Draw the mouth
    stroke(mouth.strokeR, mouth.strokeG, mouth.strokeB);
    strokeWeight(mouth.strokeWeight);

    fill(mouth.r, mouth.g, mouth.b);
    arc(mouth.arcX, mouth.arcY, mouth.arcWidth, mouth.arcHeight, mouth.arcStart, mouth.arcStop, mouth.mode);


    // Draw the teeth
    noStroke();
    fill(tooth.fill);
    arc(mouth.arcX, mouth.arcY-10, tooth.arcWidth, tooth.arcHeight, 0, mouth.arcStop, tooth.mode);          // Left tooth
    arc(mouth.arcX+26, mouth.arcY+1, tooth.arcWidth, tooth.arcHeight, 0, mouth.arcStop, tooth.mode);       // Right tooth

}
