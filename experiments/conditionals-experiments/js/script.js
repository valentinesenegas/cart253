/**************************************************
Conditionals
Valentine Sénégas

Here is a description of this conditionals experiment.
**************************************************/

let bg = {
  r:0,
  g:0,
  b:0
}

// let circle = {
//   x: 250,
//   y: 250,
//   size: 100,
//   vx: 0,
//   vy: 0,
//   ax: 0,
//   ay: 0,
//   acceleration: 0.25,
//   maxSpeed: 10
// }

let angle = 0;
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

  background(bg.r, bg.g, bg.b);

push();
fill(255,0,0);
rectMode(CENTER);
translate(width/2, height/2);
rotate(angle);
rect(0, 0, 100, 100);
pop();

angle = angle + 0.1;


}
