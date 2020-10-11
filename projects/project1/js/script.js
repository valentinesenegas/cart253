"use strict";
/**************************************************
Project 1
Valentine Sénégas

Here is a description of this first project!
**************************************************/

let imgMailman;

let imgDonald;

let imgMail;

let mailman = {
  x: 120,
  y: 120,
  size: 141,
  vx: 1,
  vy: 1,
  speed: 5,
};

let donald = {
  x: 280,
  y: 180,
  size: 141,
  vx: 1,
  vy: 1,
  speed: 2,
};

let mail;

let bg = {
  r: 186,
  g: 219,
  b: 250,
};

let state = `simulation`;

// preload()
//
// Preloading the images
function preload() {
  imgMailman = loadImage("assets/images/mailman.png");
  imgDonald = loadImage("assets/images/donald.png");
  imgMail = loadImage("assets/images/mail.png");
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1400, 900);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bg.r, bg.g, bg.b);

  display();
  move();      // Movement of the Donald
  checkKeys(); // Movement of the mailman
}

function display() {
  // DISPLAY
  imageMode(CENTER);
  image(imgMailman, mailman.x, mailman.y);
  image(imgDonald, donald.x, donald.y);
}


function move() {

  // Mailman
  mailman.x = mailman.x + mailman.vx;
  mailman.y = mailman.y + mailman.vy;

  // The Donald
  donald.x = donald.x + donald.vx;
  donald.y = donald.y + donald.vy;

  // Random change of direction for the Donald
  let change = random(); // Generate a random number between 0 and 1

  // Change direction 1% of the time
  if (change < 0.01) {
    // Choose random velocities within the "speed limit"
    donald.vx = random(-donald.speed, donald.speed);
    donald.vy = random(-donald.speed, donald.speed);
  }

}


function checkKeys() {
  // Allows the user to move the mailman using the arrow keys!

  if (keyIsDown(LEFT_ARROW)) {
  // If it is, set the x velocity to be negative
  mailman.vx = -mailman.speed;
  }
  // Otherwise is the right arrow pressed?
  else if (keyIsDown(RIGHT_ARROW)) {
  // If it is, set the x velocity to be positive
  mailman.vx = mailman.speed;
  }
  // If neither of those keys are pressed
  else {
  // Then set the x velocity to 0 to stop moving horizontally
  mailman.vx = 0;
  }

  // Do the same thing with vertical movement and the UP and DOWN keys
  if (keyIsDown(UP_ARROW)) {
  mailman.vy = -mailman.speed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
  mailman.vy = mailman.speed;
  }
  else {
  mailman.vy = 0;
  }
}
