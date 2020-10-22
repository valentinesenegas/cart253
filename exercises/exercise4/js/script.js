"use strict";
/**************************************************
Exercise 04: The Age of Aquariums
Valentine Sénégas

Here is a description of this template p5 project.
**************************************************/

// Our fish
let school = [];
let schoolSize = 4;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600, 600);

  // Create four fish, positioned randomly
  // Create four fish, positioned randomly, storing each one in four successive
  // spaces in our array by using the addresses `0` through `3`
  for (let i = 0; i < schoolSize; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }
}

// createFish(x,y)
// Creates a new JavaScript Object describing a fish and returns it
function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2
  };
  return fish;
}

// draw()
// Moves and displays our fish
function draw() {
  background(0);

  // Use a for loop to count from 0 up to 3
  // and move the fish at that index in the schools array each time and display the fish
  for (let i = 0; i < 4; i++) {
    moveFish(school[i]);
    displayFish(school[i]);
  }
}

// moveFish(fish)
// Chooses whether the provided fish changes direction and moves it
function moveFish(fish) {
  // Choose whether to change direction
  let change = random(0, 1);
  if (change < 0.05) {
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  // Move the fish
  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;

  // Constrain the fish to the canvas
  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}

// displayFish(fish)
// Displays the provided fish on the canvas
function displayFish(fish) {
  push();
  fill(200, 100, 100);
  noStroke();
  ellipse(fish.x, fish.y, fish.size);
  pop();
}
