/**************************************************
Conditionals
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 3
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500,500);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(backgroundShade);

circle.x = circle.x + circle.speed;

fill(255,255,255);

if (!(circle.x < width/3)) {
  fill(255, 0, 0);
}

// if (circle.x > width) {
//   // this is called a block of code
//   circle.speed = -circle.speed;
// }

// if (circle.x < 0) {
//   circle.speed = -circle.speed;
// }

// // The position of the mouse determines the circle's color
// if (mouseX < width/3) {
//   fill(255, 0, 0);
// }
// else if (mouseX < 2* width/3){
//   fill(0, 255, 0);
// }
//
// else {
//   fill(0, 0, 255);
// }


ellipse(circle.x,circle.y,circle.size);
}
