/**************************************************
Activity 2: Draw an alien
Valentine Sénégas

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Draws an alien face
function setup() {
  createCanvas(640, 480);

  background(255, 100, 100);
  noStroke();

// Draw the body
  fill(127);
  ellipse(320, 480, 300, 200);

  // Draw the head
    fill(100);
    ellipse(320, 240, 250, 400);

    // Draw the eyes
    fill(0);
    ellipse(250, 240, 80, 250);
    ellipse(390, 240, 80, 250);

    // Draw the nostrils
    ellipse(300, 350, 10, 10);
    ellipse(340, 350, 10, 10);

    // Draw the mouth
    stroke(200, 0, 0);
    strokeWeight(5);
    rectMode(CENTER);
    rect(320, 390, 100, 25);

}

// draw()
//
// Does nothing.
function draw() {

}
