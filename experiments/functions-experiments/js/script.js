/**************************************************
Functions experiments
Valentine Sénégas


**************************************************/

let bg = 0;

function setup() {
  createCanvas(500, 500);

}

function draw() {
  background(bg);

  textAlign(CENTER);
  textSize(64);
  fill(255);
  text(keyCode, width/2, height/2);

}

function keyPressed() {
  // bg = random(0,255);

  if (keyCode === UP_ARROW) {
    bg = bg + 10;
    bg = constrain(bg, 0, 255);
  }
  else if (keyCode === DOWN_ARROW) {
    bg = bg - 10;
    bg = constrain(bg, 0, 255);
  }
  else if (key === `c`) {
    bg = 255;
  }
}

// ------------------------- //

//
// let circle = {
//   x: 0,
//   y: 250,
//   size: 100,
//   vx: 1,
//   vy: 0
// }
//
// // setup()
// //
// // Description of setup() goes here.
// function setup() {
//   createCanvas(500, 500);
// }
//
// // draw()
// //
// // Description of draw() goes here.
// function draw() {
//   background(0);
//
//   move();
//   wrap();
//   display();
// }
//
// // Defining our move function
// function move() {
//   circle.x = circle.x + circle.vx;
//   circle.y = circle.y + circle.vy;
// }
//
// // Defining our wrap function
// function wrap() {
//   if (circle.x > width) {
//     reset();
//   }
// }
//
// // Defining our display function
// function display() {
//   fill(205, 0, 100);
//   ellipse(circle.x, circle.y, circle.size);
// }
//
// // Resets the circle's position to the left side of the screen + increase size
// function reset() {
//   circle.x = 0;
//   circle.vx = circle.vx + 2;
//   circle.vy = circle.vy -0.25;
//   circle.size = circle.size + 5;
// }
//
//
// function mousePressed() {
//   reset();
// }
