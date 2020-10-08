/**************************************************
Exercise 3
Valentine Sénégas

Hello there!
Your character is a little pig trying to meet with his friends.
Use the arrows to move and try to touch one of the other animals.
**************************************************/

// Variables for the images of the animals
let imgChick;
let imgHorse;
let imgPig;

let chick = {
  x: 150,
  y: 150,
  vx: 0,
  vy: 0,
  speed: 1
}

let pig = {
  x: 250,
  y: 150,
  vx: 0,
  vy: 0,
  speed: 2.5
}

let horse = {
  x: 350,
  y: 150,
  vx: 0,
  vy: 0,
  speed: 1
}

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
    createCanvas(windowWidth, windowHeight);

    chick.vx = random(-chick.speed, chick.speed);
    chick.vy = random(-chick.speed, chick.speed);

    horse.vx = random(-horse.speed, horse.speed);
    horse.vy = random(-horse.speed, horse.speed);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(150);

  imageMode(CENTER);
  image(imgChick, chick.x, chick.y);
  image(imgHorse, horse.x, horse.y);
  image(imgPig, pig.x, pig.y);

// Move the animals
  chick.x = chick.x + chick.vx;
  chick.y = chick.y + chick.vy;

  horse.x = horse.x + horse.vx;
  horse.y = horse.y + horse.vy;

  pig.x = pig.x + pig.vx;
  pig.y = pig.y + pig.vy;



  if (keyIsDown(LEFT_ARROW)) {
  // If it is, set the x velocity to be negative
  pig.vx = -pig.speed;
}
// Otherwise is the right arrow pressed?
else if (keyIsDown(RIGHT_ARROW)) {
  // If it is, set the x velocity to be positive
  pig.vx = pig.speed;
}
// If neither of those keys are pressed...
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
