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

  //---- BACKGROUND & GENERAL ----//

  background(24, 5, 85);
  noStroke();

  // Planet
  fill(48, 16, 209, 60);
  ellipse(546, 35, 260, 260);


  //---- BODY ----//

  // Draw the body

  fill(255, 204, 0);
  triangle(100, 100, 120, 400, 500, 400);

  // Draw the holes on the body

  fill(223, 186, 37, 80);

  //Top left
  ellipse(156, 205, 30, 30);

  //Bottom left
  ellipse(156, 345, 40, 43);


    //---- EYES ----//

    // Draw the eyeshadow
    fill(223, 186, 37);
    ellipse(246, 235, 120, 120);
    ellipse(366, 298, 100, 100);

    // Draw the eyes
    fill(1000);
    ellipse(250, 240, 120, 120);
    ellipse(370, 300, 100, 100);

    // Draw the iris
    fill(4);
    ellipse(230, 240, 40, 40);
    ellipse(370, 310, 25, 25);


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


//---- ARMS AND LEGS ----//
// 2 first numbers = hand/foot, 2 last numbers, attached to body

    // Draw the left arm
    stroke('#D1AB10');
    strokeWeight(10); // Beastly
    line(145, 295, 30, 350);

    // Draw the right arm
    line(490, 330, 370, 380);

    // Draw the left leg
    line(110, 450, 145, 395);

    // Draw the right leg
    line(350, 450, 315, 395);


//---------------------------------//

// Basic alien
/*
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
*/


}

// draw()
//
// Does nothing.
function draw() {

}
