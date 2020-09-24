/**************************************************
03 Moving pictures
Valentine Sénégas

Here is a description of this template p5 project.
Two circles will move from each side of the canvas, one from the left, the other from the right, and they will stop in the center of the canvas. They are growing as they move, until their width equals the width of the canvas.
The background is going to change from black to red.
**************************************************/

// Variables
let bg = {
  r:0,
  g:0,
  b:0
};

let circle1 = {
  x: 0,
  y:250,
  size: 100,
  growthRate: 1,
  speed: 1,
  fill: 255,
  alpha: 200
};

let circle2 = {
  x: 500,
  y:250,
  size: 75,
  sizeRatio: 0.75,
  speed: -1,
  fill: 255,
  alpha: 200
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
// Drawing of the circles and setting the background color.
function draw() {

  // Background
  background(bg.r, bg.g, bg.b);
  // The diameter of circle1 changes the background color
  bg.r = map(circle1.size, 100, width, 0, 255);
  // bg.r += 1 ;

  // Left circle
  circle1.x += circle1.speed;
  circle1.x = constrain(circle1.x, 0, width/2);

  circle1.size += circle1.growthRate;
  circle1.size = constrain(circle1.size, 0, width);

  fill(circle1.fill, circle1.alpha);
  ellipse(circle1.x, circle1.y, circle1.size);

  // Right circle
  circle2.x += circle2.speed;
  circle2.x = constrain(circle2.x, width/2, width);

  circle2.size = circle1.size * circle2.sizeRatio;

  fill(circle2.fill, circle2.alpha);
  ellipse(circle2.x, circle2.y, circle2.size);
}
