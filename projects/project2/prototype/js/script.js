/**************************************************
Prototype for Project 2
Valentine Sénégas

Make the president dance!
**************************************************/

// Arrow keys and their keyCodes
let keyA = 65;
let keyS = 83;
let keyD = 68;
let keyF = 70;

let keyH = 72;
let keyJ = 74;
let keyK = 75;
let keyL = 76;

let imgBodyPresident;

// ---------- //

// punchLeft
let clenchedFistFrontLeft;
let clenchedFistBackLeft;

// clapLeft
let openHandFrontLeft;
let openHandBackLeft;

// pointLeft
let pointLeft1;

// Accordion
let accordion;

// punchRight
let clenchedFistFront1;
let clenchedFistBack1;

// clapRight
let openHandFront1;
let openHandBack1;

// pointRight
let pointRight1;

// Split
let imgSplit;

// ---------- //
let bg;

let president = {
  x: undefined,
  y: undefined,
  frontHandX: undefined,
  frontHandY: undefined,
  backHandX: undefined,
  backHandY: undefined
}

let danceState = `none`;

// ---------- //
// Preload the images and sounds
function preload() {
  imgBodyPresident = loadImage("assets/images/body2.png");

  // punchLeft
  clenchedFistFrontLeft = loadImage("assets/images/clenchedFistFrontLeft.png");
  clenchedFistBackLeft = loadImage("assets/images/clenchedFistBackLeft.png");

  // clapLeft
  openHandFrontLeft = loadImage("assets/images/openHandFrontLeft.png");
  openHandBackLeft = loadImage("assets/images/openHandBackLeft.png");

  // pointLeft
  pointLeft1 = loadImage("assets/images/pointLeft.png");

  // Accordion
  imgAccordion = loadImage("assets/images/accordion.png");

  // punchRight
  clenchedFistFront1 = loadImage("assets/images/clenchedFistFront1.png");
  clenchedFistBack1 = loadImage("assets/images/clenchedFistBack1.png");

  // clapRight
  openHandFront1 = loadImage("assets/images/openHandFront1.png");
  openHandBack1 = loadImage("assets/images/openHandBack1.png");

  // pointRight
  pointRight1 = loadImage("assets/images/pointRight1.png");

  // Split
  imgSplit = loadImage("assets/images/split.png");

  //bg
  bg = loadImage("assets/images/bg.png");
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1267, 900);
  setupPresident();
}

// Set President's position on the canvas
function setupPresident() {
  president.x = width / 2;
  president.y = height / 2;

  // Offset for animations on the left side
  president.frontHandLeftDX = -60;
  president.frontHandLeftDY = 0;
  president.backHandLeftDX = -200;
  president.backHandLeftDY = 0;

  // Offset for animations on the right side
  president.frontHandRightDX = -110;
  president.frontHandRightDY = -30;
  president.backHandRightDX = -10;
  president.backHandRightDY = 0;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(241, 243, 252);
  image(bg, 0, 0);

  // displayPresident();

  handleInput();

  // States management

  // Left side
  if (danceState === `punchLeft`) {
    punchLeft();
  } else if (danceState === `clapLeft`) {
    clapLeft();
  } else if (danceState === `pointLeft`) {
    pointLeft();
  } else if (danceState === `accordion`) {
    playAccordion();
  }

  // Right side
  if (danceState === `punchRight`) {
    punchRight();
  } else if (danceState === `clapRight`) {
    clapRight();
  } else if (danceState === `pointRight`) {
    pointRight();
  } else if (danceState === `split`) {
    doTheSplit();
  }

}

// ---------------------------//
// STATES

// Left side
function punchLeft() {
  push();

  imageMode(CORNER);
  image(clenchedFistBackLeft, president.x + president.backHandLeftDX, president.y + president.backHandLeftDY);

  imageMode(CENTER);
  image(imgBodyPresident, president.x, president.y);

  imageMode(CORNER);
  image(clenchedFistFrontLeft, president.x + president.frontHandLeftDX, president.y + president.frontHandLeftDY);

  pop();

}

function clapLeft() {
  push();

  imageMode(CORNER);
  image(openHandBackLeft, president.x + president.backHandLeftDX, president.y + president.backHandLeftDY);

  imageMode(CENTER);
  image(imgBodyPresident, president.x, president.y);

  imageMode(CORNER);
  image(openHandFrontLeft, president.x + president.frontHandLeftDX, president.y + president.frontHandLeftDY);

  pop();
}

function pointLeft() {
  push();

  imageMode(CORNER);
  image(openHandBackLeft, president.x + president.backHandLeftDX, president.y + president.backHandLeftDY);

  imageMode(CENTER);
  image(imgBodyPresident, president.x, president.y);

  imageMode(CORNER);
  image(pointLeft1, president.x - 230, president.y - 100);
  pop();
}

function playAccordion() {
  push();

  imageMode(CENTER);
  image(imgBodyPresident, president.x, president.y);

  imageMode(CENTER);
  image(imgAccordion, president.x, president.y + 50);
  pop();
}

// Right side
function punchRight() {
  push();

  imageMode(CORNER);
  image(clenchedFistBack1, president.x + president.backHandRightDX, president.y + president.backHandRightDY);

  imageMode(CENTER);
  image(imgBodyPresident, president.x, president.y);

  imageMode(CORNER);
  image(clenchedFistFront1, president.x + president.frontHandRightDX, president.y + president.frontHandRightDY);

  pop();

}

function clapRight() {
  push();

  imageMode(CORNER);
  image(openHandBack1, president.x + president.backHandRightDX, president.y + president.backHandRightDY);

  imageMode(CENTER);
  image(imgBodyPresident, president.x, president.y);

  imageMode(CORNER);
  image(openHandFront1, president.x + president.frontHandRightDX, president.y + president.frontHandRightDY);

  pop();
}

function pointRight() {
  push();

  imageMode(CORNER);
  image(openHandBack1, president.x + president.backHandRightDX, president.y + president.backHandRightDY);

  imageMode(CENTER);
  image(imgBodyPresident, president.x, president.y);

  imageMode(CORNER);
  image(pointRight1, president.x + president.frontHandRightDX, president.y + president.frontHandRightDY);
  pop();
}

function doTheSplit() {
  push();

  imageMode(CENTER);
  image(imgSplit, president.x, president.y + 60);

  pop();
}

// Displays only the body of president
function displayPresident() {
  push();
  imageMode(CENTER);
  image(imgBodyPresident, president.x, president.y);
  pop();
}

// ---------------------------//
// USER INPUT with arrow keys
function handleInput() {

  // Left side
  if (keyIsDown(keyA)) {
    danceState = `punchLeft`;
  } else if (keyIsDown(keyS)) {
    danceState = `clapLeft`;
  } else if (keyIsDown(keyD)) {
    danceState = `pointLeft`;
  } else if (keyIsDown(keyF)) {
    danceState = `accordion`;
  }

  // Right side
  if (keyIsDown(keyL)) {
    danceState = `punchRight`;
  } else if (keyIsDown(keyK)) {
    danceState = `clapRight`;
  } else if (keyIsDown(keyJ)) {
    danceState = `pointRight`;
  } else if (keyIsDown(keyH)) {
    danceState = `split`;
  }

} // End handleInput()
