/**************************************************
Exercise 3
Valentine Sénégas

Hello there!
Your character is a little pig trying to meet with his friends.
Use the arrows to move and try to touch one of the other animals.
But beware, a wolf is lurking around...
**************************************************/

// Variables
let imgPig;
let imgChick;
let imgHorse;
let imgWolf;
let imgUnicorn;

let pig = {
  x: 250,
  y: 150,
  vx: 0,
  vy: 0,
  speed: 2.5,
  size: 100
}

let chick = {
  x: 150,
  y: 150,
  vx: 0,
  vy: 0,
  speed: 1,
  size: 100
}

let horse = {
  x: 350,
  y: 150,
  vx: 0,
  vy: 0,
  speed: 2,
  size: 100
}

let wolf = {
  x: 250,
  y: 150,
  vx: 1,
  vy: 1,
  speed: 2.5,
  size: 100
}

let unicorn = {
  x: 250,
  y: 150,
  size: 100
}

let bg = {
  r: 186,
  g: 229,
  b: 255
}

let state = `title`; // Can be: title, simulation, friends, sadness, eatenByTheWolf or savedByUnicorn


// preload()
//
// Preloading the images of the animals
function preload() {
  imgPig = loadImage('assets/images/pig.png');
  imgChick = loadImage('assets/images/chick.png');
  imgHorse = loadImage('assets/images/horse.png');
  imgWolf = loadImage('assets/images/wolf.png');
  imgUnicorn = loadImage('assets/images/unicorn.png');
}

// setup()
//
// Setting the size of the canvas
function setup() {
    createCanvas(1400, 900);
    setupCharacters();
}

function setupCharacters() {
  // Position characters separated from one another

  chick.x = width / 3;
  chick.y = height / 2;

  horse.x = 2* width / 3;
  horse.y = height / 2;

  pig.x = width / 2;
  pig.y = height / 2;

  wolf.x = width / 2;
  wolf.y = (height / 2) - (height / 3);

  unicorn.x = width - 100;
  unicorn.y = 100;


  // Start characters moving in a random direction
  chick.vx = random(-chick.speed, chick.speed);
  chick.vy = random(-chick.speed, chick.speed);

  horse.vx = random(-horse.speed, horse.speed);
  horse.vy = random(-horse.speed, horse.speed);
}

// draw()
//
// Background, states management
function draw() {

  background(bg.r, bg.g, bg.b);
  backgroundColor();

  // States management
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
  else if (state === `eatenByTheWolf`) {
    eatenByTheWolf();
  }
  else if (state === `savedByUnicorn`) {
    savedByUnicorn();
  }
}

//--- States ---//
function title() {
  push();
  textSize(42);
  fill(197, 97, 131);
  textAlign(CENTER, CENTER);
  text(`Find your friends and escape from the wolf!`, width/2, height/2);
  pop();
}

function simulation() {
  display();
  move();
  checkOffscreen();
  checkOverlap();
  checkKeys(); // Allows the user to move the pig using the arrow keys!
}

function friends() {
  push();
  textSize(64);
  fill(255,150,150);
  textAlign(CENTER, CENTER);
  text(`Yay! You found a friend`, width/2, height/2);
  pop();
}

function sadness() {
  push();
  textSize(64);
  fill(150,150,255);
  textAlign(CENTER, CENTER);
  text(`Your friends abandoned you :(`, width/2, height/2);
  pop();
}

function eatenByTheWolf() {
  push();
  background(20);
  textSize(64);
  fill(179,54,60);
  textAlign(CENTER, CENTER);
  text(`The wolf caught you!`, width/2, height/2);
  pop();
}

function savedByUnicorn() {
  push();
  textSize(64);
  fill(150,150,255);
  textAlign(CENTER, CENTER);
  text(`The unicorn saved you from the wolf! `, width/2, height/2);
  pop();
}

//--------------//

function checkKeys() {
  // Allows the user to move the pig using the arrow keys!

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

    // Makes the wolf move towards the pig
    if (wolf.y > pig.y){
      wolf.y = wolf.y - wolf.vy;
    }
    else {
      wolf.y = wolf.y + wolf.vy;
    }
    if (wolf.x > pig.x){
      wolf.x = wolf.x - wolf.vx;
    }
    else {
      wolf.x = wolf.x + wolf.vx;
    }
}

function checkOffscreen() {
// Check if the characters have gone off screen
  if (isOffScreen(chick) || isOffScreen(horse)) {
    // Sad ending :(
    state = `sadness`;
  }
}

function isOffScreen(character) {
  // If characters go off screen, return true. Used in checkOffscreen()
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

  // Check if the pig and chick overlap
  if (d1 < pig.size / 2 + chick.size / 2) {
    state = `friends`;
    }

  // Check if the pig and horse overlap
  let d2 = dist(pig.x, pig.y, horse.x, horse.y);

  if (d2 < pig.size / 2 + horse.size / 2) {
    state = `friends`;
  }

  // Check if the wolf eats the pig
  let d3 = dist(pig.x, pig.y, wolf.x, wolf.y);

  if (d3 < pig.size / 2 + wolf.size / 2) {
    state = `eatenByTheWolf`;
    }

  // Check if the unicorn saves the pig
  let d4 = dist(pig.x, pig.y, unicorn.x, unicorn.y);

  if (d4 < pig.size / 2 + unicorn.size / 2) {
    state = `savedByUnicorn`;
    }

}

function display() {
  // Display the images of the animals at the proper position
  imageMode(CENTER);
  image(imgPig, pig.x, pig.y);
  image(imgChick, chick.x, chick.y);
  image(imgHorse, horse.x, horse.y);
  image(imgWolf, wolf.x, wolf.y);
  image(imgUnicorn, unicorn.x, unicorn.y);
}

function backgroundColor(){
  // When the wolf gets closer to the pig, the background color changes

   let d3 = dist(pig.x, pig.y, wolf.x, wolf.y);

   bg.r = map(bg.r, 0, (dist(pig.x, pig.y, wolf.x, wolf.y)), 186, 255);
}

// To start the simulation, click with the mouse
function mousePressed(){
  if (state === `title`){
    state = `simulation`;
  }
}
