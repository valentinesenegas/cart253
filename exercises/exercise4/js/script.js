"use strict";
/**************************************************
Exercise 04: The Age of Aquariums
Valentine Sénégas

Catch the candies!
**************************************************/

// Candies
let candies = [];
let candiesNumber = 10;

// Images
let imgGhost;
let imgCandy1;

let ghost = {
  x: 70,
  y: 70,
  vx: 1,
  vy: 1,
  speed: 4,
};

const timeAllowed = 500; // frameCount
let score = 0;

let state = `simulation`;

// preload()
//
function preload() {
  imgGhost = loadImage("assets/images/ghost.png");
  imgCandy1 = loadImage("assets/images/candy1.png");

  // Random candies
  for (let i = 0; i < candiesNumber; i++)
    candies.push(createCandy(loadImage(`assets/images/candy${Math.floor((Math.random() * 8) + 1)}.png`)));
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(800, 800);

  setupCandies();
  setupUser();
}

// Creation of the candies at random positions
function setupCandies() {
  for (let i = 0; i < candiesNumber; i++) {
    candies[i].x = random(0, width);
    candies[i].y = random(0, height);
    setCandySpeed(candies[i]);
  }
}

// Creation of the user at the center of the canvas
function setupUser() {
  ghost.x = width / 2 - imgGhost.width / 2;
  ghost.y = height / 2 - imgGhost.height / 2;
}

// createCandy(imgParam)
// Creates a new JavaScript Object describing a candy and returns it
function createCandy(imgParam) {
  let candy = {
    x: 0,
    y: 0,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2,
    img: undefined,
    caught: false,
  };
  candy.img = imgParam;
  return candy;
}

// draw()
// Moves and displays our candy
function draw() {
  background(94, 50, 186);

  if (state === `simulation`) {
    simulation();
  } else if (state === `win`) {
    youWon();
  } else if (state === `lost`) {
    youLost();
  }
}

// When the number of frames exceeds a certain amount, the user looses.
function timer() {
  if (frameCount > timeAllowed) {
    state = `lost`;
  }
}

function simulation() {
  // Use a for loop to count from 0 to the number of candies
  // and move the candy at that index in the candies array each time and display the candy
  for (let i = 0; i < candiesNumber; i++) {
    moveCandy(candies[i]);
    displayCandy(candies[i]);
  }
  displayUser();
  moveUser();
  checkOverlap();
  timer();
}

function youWon() {
  push();
  background(235, 97, 35);
  textSize(64);
  fill(24, 24, 26);
  textAlign(CENTER, CENTER);
  text(`You won!`, width / 2, height / 2);

  for (let i = 0; i < candiesNumber; i++) {
    displayCandy(candies[i]);
  }
  pop();
}

function youLost() {
  push();
  background(24, 24, 26);
  textSize(64);
  fill(235, 97, 35);
  textAlign(CENTER, CENTER);
  text(`You lost :(`, width / 2, height / 2);
  pop();
}

function setCandySpeed(candy) {
  // Chooses whether the provided candy changes direction and moves it
  let directionX = random(-1, 1);
  let speedX = random(1, candy.speed);
  candy.vx = directionX > 0 ? speedX : -speedX;
  let directionY = random(-1, 1);
  let speedY = random(1, candy.speed);
  candy.vy = directionY > 0 ? speedY : -speedY;
}

// moveCandy(candy)
function moveCandy(candy) {
  // Choose whether to change direction
  if (random(0, 100) > 95)
    setCandySpeed(candy);

  // Move the candy
  candy.x = candy.x + candy.vx;
  candy.y = candy.y + candy.vy;

  // Constrain the candy to the canvas
  candy.x = constrain(candy.x, 0, width);
  candy.y = constrain(candy.y, 0, height);
}


// displayCandy(candy)
// Displays the provided candies on the canvas
function displayCandy(candy) {
  for (let i = 0; i < candiesNumber; i++)
    if (candies[i].caught === false)
      image(candies[i].img, candies[i].x, candies[i].y);
}

// displayUser()
// Displays the user
function displayUser() {
  // Display the ghost image at the proper position
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
  } else if (keyIsDown(DOWN_ARROW)) {
    ghost.vy = ghost.speed;
  } else {
    ghost.vy = 0;
  }
}

// Check if the ghost catches candies
function checkOverlap() {
  for (let i = 0; i < candiesNumber; i++) {
    if (candies[i].caught === false) {
      if (
        ghost.x < candies[i].x + candies[i].img.width &&
        ghost.x + imgGhost.width > candies[i].x &&
        ghost.y < candies[i].y + candies[i].img.height &&
        ghost.y + imgGhost.height > candies[i].y
      ) {
        // Collision detected:
        // The candy disappears and the score is incremented by 1.
        candies[i].caught = true;
        score += 1;

        // The ghost goes faster!
        ghost.speed += 1;

        // The candies go faster!
        candies[i].speed = candies[i].speed + 1;

        // If the score is equal to the number of candies, the user wins!
        if (score === candiesNumber) {
          state = `win`;
          for (let i = 0; i < candiesNumber; i++) {
            candies[i].caught = false;
          }
        }
      }
    }
  }
}
