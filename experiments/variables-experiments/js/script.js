/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 1,
  fill: 255
};

// setup()
//
// Description of setup() goes here.
function setup() {
createCanvas(500, 500);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(backgroundShade);

  // circle.speed = random(-5, 5);
  circle.x += circle.speed;
  circle.x = constrain(circle.x, 0, width);

  // circle.y = random(0, height);
  // circle.size = random(10, 100);
  // circle.fill = random(0, 255);

  // circle.size = map(mouseY, 0, height, 50, 500);

  circle.fill = map(circle.x, 0, width, 0, 255);
  fill(circle.fill);
  ellipse(circle.x, circle.y, circle.size);

  // let randomNumber = random();
  // console.log(randomNumber);
}
