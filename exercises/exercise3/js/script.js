/**************************************************
Exercise 3
Valentine Sénégas

Hello there!
Your character is a little pig trying to meet with his friends.
Use the arrows to move and try to touch one of the other animals.
**************************************************/

// Variables
let imgPig;
let imgChick;
let imgHorse;

let pig = {
  x: 250,
  y: 150,
  vx: 0,
  vy: 0,
  speed: 2.5,
  size: 20
}

let chick = {
  x: 150,
  y: 150,
  vx: 0,
  vy: 0,
  speed: 1,
  size:20
}

let horse = {
  x: 350,
  y: 150,
  vx: 0,
  vy: 0,
  speed: 1,
  size: 20
}

let state = `title`; // Can be: title, simulation, friends or sadness


// preload()
//
// Preloading the images of the animals
function preload() {
  imgChick = loadImage('assets/images/chick.png');
  imgHorse = loadImage('assets/images/horse.png');
  imgPig = loadImage('assets/images/pig.png');
}

// setup()
//
// Setting the size of the canvas
function setup() {
    createCanvas(1500, 1000);
    setupCharacters();
}

function setupCharacters() {

  // Position circles separated from one another
  chick.x = width / 3;
  chick.y = height / 2;

  horse.x = 2* width / 3;
  horse.y = height / 2;

  pig.x = width / 2;
  pig.y = height / 2;


  // Start characters moving in a random direction
  chick.vx = random(-chick.speed, chick.speed);
  chick.vy = random(-chick.speed, chick.speed);

  horse.vx = random(-horse.speed, horse.speed);
  horse.vy = random(-horse.speed, horse.speed);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(186, 229, 255);

  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
  else if (state === `friends`) {
    friends();
  }
  else if (state === `sadness`) {
    sadness();
  }
}

function title() {
  push();
  textSize(64);
  fill(197, 97, 131);
  textAlign(CENTER, CENTER);
  text(`Find your friends!`, width/2, height/2);
  pop();
}

function simulation() {
  display();
  move();
  checkOffscreen();
  checkOverlap();
  checkKeys();
}

function friends() {
  push();
  textSize(64);
  fill(255,150,150);
  textAlign(CENTER, CENTER);
  text(`Yay! You found your friends`, width/2, height/2);
  pop();
}

function sadness() {
  push();
  textSize(64);
  fill(150,150,255);
  textAlign(CENTER, CENTER);
  text(`:(`, width/2, height/2);
  pop();
}

function checkKeys() {
  if (keyIsDown(LEFT_ARROW)) {
  // If it is, set the x velocity to be negative
  pig.vx = -pig.speed;
  }
  // Otherwise is the right arrow pressed?
  else if (keyIsDown(RIGHT_ARROW)) {
  // If it is, set the x velocity to be positive
  pig.vx = pig.speed;
  }
  // If neither of those keys are pressed
  else {
  // Then set the x velocity to 0 to stop moving horizontally
  pig.vx = 0;
  }

  // Do the same thing with vertical movement and the UP and DOWN keys
  if (keyIsDown(UP_ARROW)) {
  pig.vy = -pig.speed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
  pig.vy = pig.speed;
  }
  else {
  pig.vy = 0;
  }
}

function move() {
  // Move the animals
    chick.x = chick.x + chick.vx;
    chick.y = chick.y + chick.vy;

    horse.x = horse.x + horse.vx;
    horse.y = horse.y + horse.vy;

    pig.x = pig.x + pig.vx;
    pig.y = pig.y + pig.vy;
}

function checkOffscreen() {
// Check if the characters have gone off screen
  if (isOffScreen(chick) || isOffScreen(horse)) {
    // Sad ending :(
    state = `sadness`;
    console.log("sadness");
  }
}

function isOffScreen(character) {
  if (character.x < 0 || character.x > width || character.y < 0 || character.y > height) {
    return true;
  }
  else {
    return false;
  }
}

function checkOverlap() {
  // Check if the characters overlap
  let d1 = dist(pig.x, pig.y, chick.x, chick.y);

  if (d1 < pig.size / 2 + chick.size / 2) {
    state = `friends`;
    }

  let d2 = dist(pig.x, pig.y, horse.x, horse.y);

  if (d2 < pig.size / 2 + horse.size / 2) {
    state = `friends`;
  }

}


function display() {
  // Display the images of the animals at the accurate position
  imageMode(CENTER);
  image(imgPig, pig.x, pig.y);
  image(imgChick, chick.x, chick.y);
  image(imgHorse, horse.x, horse.y);
}

//-------------//
function mousePressed(){
  if (state === `title`){
    state = `simulation`;
  }
}
