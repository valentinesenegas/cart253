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

// ---------- //
let bg;

let president;

let currentDanceMove = null;

let splitDanceMove;
let accordionDanceMove;
let pointLeftDanceMove;
let pointRightDanceMove;
let punchLeftDanceMove;
let punchRightDanceMove;
let clapLeftDanceMove;
let clapRightDanceMove;

// ---------- //
// Preload the images and sounds
function preload() {
  //bg
  bg = loadImage("assets/images/bg.png");

  preloadPresident();
  preloadMoves();
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1267, 900);
  president = new President();
  splitDanceMove = new SplitDanceMove(president);
  accordionDanceMove = new AccordionDanceMove(president);
  pointLeftDanceMove = new PointLeftDanceMove(president);
  pointRightDanceMove = new PointRightDanceMove(president);
  punchLeftDanceMove = new PunchLeftDanceMove(president);
  punchRightDanceMove = new PunchRightDanceMove(president);
  clapLeftDanceMove = new ClapLeftDanceMove(president);
  clapRightDanceMove = new ClapRightDanceMove(president);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  image(bg, 0, 0);
  handleInput();
  if (currentDanceMove != null)
    currentDanceMove.draw();
}

// USER INPUT with arrow keys
function handleInput() {

  // Left side
  if (keyIsDown(keyA)) {
    currentDanceMove = punchLeftDanceMove;
  } else if (keyIsDown(keyS)) {
    currentDanceMove = clapLeftDanceMove;
  } else if (keyIsDown(keyD)) {
    currentDanceMove = pointLeftDanceMove;
  } else if (keyIsDown(keyF)) {
    currentDanceMove = accordionDanceMove;
  }

  // Right side
  if (keyIsDown(keyL)) {
    currentDanceMove = punchRightDanceMove;
  } else if (keyIsDown(keyK)) {
    currentDanceMove = clapRightDanceMove;
  } else if (keyIsDown(keyJ)) {
    currentDanceMove = pointRightDanceMove;
  } else if (keyIsDown(keyH)) {
    currentDanceMove = splitDanceMove;
  }

} // End handleInput()
