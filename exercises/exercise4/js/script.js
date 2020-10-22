"use strict";
/**************************************************
Exercise 04: The Age of Aquariums
Valentine Sénégas

Here is a description of this template p5 project.
**************************************************/

// Our candies
let school = [];
let schoolSize = 4;

let imgGhost;

let ghost = {
  x: 70,
  y: 70,
  vx: 1,
  vy: 1,
  speed: 3
}

// preload()
//
function preload() {
  imgGhost = loadImage('assets/images/ghost.png');
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(800, 800);

  // Create four candy, positioned randomly
  // Create four candy, positioned randomly, storing each one in four successive
  // spaces in our array by using the addresses `0` through `3`
  for (let i = 0; i < schoolSize; i++) {
    school[i] = createCandy(random(0, width), random(0, height));
  }

  ghost.x = width / 3;
  ghost.y = height / 2;
}

// createCandy(x,y)
// Creates a new JavaScript Object describing a candy and returns it
function createCandy(x, y) {
  let candy = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2
  };
  return candy;
}

// draw()
// Moves and displays our candy
function draw() {
  background(0);

  // Use a for loop to count from 0 up to 3
  // and move the candy at that index in the schools array each time and display the candy
  for (let i = 0; i < 4; i++) {
    moveCandy(school[i]);
    displayCandy(school[i]);
  }

    displayUser();
    moveUser();
}

// moveCandy(candy)
// Chooses whether the provided candy changes direction and moves it
function moveCandy(candy) {
  // Choose whether to change direction
  let change = random(0, 1);
  if (change < 0.05) {
    candy.vx = random(-candy.speed, candy.speed);
    candy.vy = random(-candy.speed, candy.speed);
  }

  // Move the candy
  candy.x = candy.x + candy.vx;
  candy.y = candy.y + candy.vy;

  // Constrain the candy to the canvas
  candy.x = constrain(candy.x, 0, width);
  candy.y = constrain(candy.y, 0, height);
}

// displayCandy(candy)
// Displays the provided candy on the canvas
function displayCandy(candy) {
  push();
  fill(200, 100, 100);
  noStroke();
  ellipse(candy.x, candy.y, candy.size);
  pop();
}

function displayUser() {
  imageMode(CENTER);
  image(imgGhost, ghost.x, ghost.y);

  // Constrain the ghost to the canvas
  ghost.x = constrain(ghost.x, 0, width);
  ghost.y = constrain(ghost.y, 0, height);
}


function moveUser() {

  ghost.x = ghost.x + ghost.vx;
  ghost.y = ghost.y + ghost.vy;

  // Allows the user to move the ghost using the arrow keys!

  if (keyIsDown(LEFT_ARROW)) {
  // If it is, set the x velocity to be negative
  ghost.vx = -ghost.speed;
  }
  // Otherwise is the right arrow pressed?
  else if (keyIsDown(RIGHT_ARROW)) {
  // If it is, set the x velocity to be positive
  ghost.vx = ghost.speed;
  }
  // If neither of those keys are pressed
  else {
  // Then set the x velocity to 0 to stop moving horizontally
  ghost.vx = 0;
  }

  // Do the same thing with vertical movement and the UP and DOWN keys
  if (keyIsDown(UP_ARROW)) {
  ghost.vy = -ghost.speed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
  ghost.vy = ghost.speed;
  }
  else {
  ghost.vy = 0;
  }
}
