/**************************************************
Functions experiments
Valentine Sénégas


**************************************************/


function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  parallels(100, 100, 5, 1, 100, 1);
  parallels(50, 50, 10, 2, 20, 10);
  parallels(200, 200, 15, 7, 3, 20);
  parallels(312, 257, 20, 0.5, 300, 1);
}

// Defining the function
function parallels(x,y,numLines, lineWidth, lineHeight, lineSpacing) {

  // For loop counts from 0 to 20 in i
  for (let i = 0; i < numLines; i++) {
    // Drawing style
    noStroke();
    fill(255);
    rectMode(CENTER);
    // Draw a 2x50 rectangle at the current position
    rect(x, y, lineWidth, lineHeight);
    // Increase x so the next rectangle is to the right
    x = x + lineSpacing;
  }
}




// -------------------------

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
