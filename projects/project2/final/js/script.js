"use strict";

/**************************************************
Project 2
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

// Dance moves
let currentDanceMove = null;

let splitDanceMove;
let accordionDanceMove;
let pointLeftDanceMove;
let pointRightDanceMove;
let punchLeftDanceMove;
let punchRightDanceMove;
let clapLeftDanceMove;
let clapRightDanceMove;

// Instructions
let instructions = [];

// Feedback messages when missed or successful move
let missedMessages = ["ZERO!", "WRONG!", "WEAK!", "REALLY BAD!", "LOSER!", "HORRIBLE!"];
let successMessages = ["YUUUGE!", "SO SMART!", "TOUGH MOVE!", "CLASSY!", "TREMENDOUS!", "GREAT!"];

// Game progress
let gameProgress = 0;

// Fonts
let allanBold;
let allanRegular;

// ---------- //
// Preload the images, sounds, fonts
function preload() {
  // Background
  bg = loadImage("assets/images/bg.png");

  preloadPresident();
  preloadMoves();
  preloadInstructions();

  // Google Font: Allan
  allanBold = loadFont("assets/fonts/Allan-Bold.ttf");
  allanRegular = loadFont("assets/fonts/Allan-Regular.ttf");
}

// setup()
//
// Setup of the score, creation of the canvas, apply the main font for the text
function setup() {
  setupScore();

  createCanvas(1267, 900);
  textFont(allanBold);

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

  // Place the background image
  image(bg, 0, 0);

  handleInput();
  if (currentDanceMove != null)
    currentDanceMove.draw();

  // Create random instructions
  if (random() < 0.01)
    instructions.push(createRandomInstruction());

  // Draw instuctions
  let instruction;
  for (instruction = 0; instruction < instructions.length; instruction++)
    instructions[instruction].draw();

  // Missed instruction?
  // Destroy the instruction once it has reached the limit
  for (instruction = 0; instruction < instructions.length; instruction++) {
    if (instructions[instruction].hasReachedLimit()) {
      // Remove instruction from the array
      instructions.splice(instruction, 1);

      let message = Math.floor(Math.random() * missedMessages.length);
      addMessage(missedMessages[message]);

      danceMoveMissed();
    }
  }

  // Display messages, score and progress.
  drawMessages();
  drawScore();
  drawProgress(Math.min(gameProgress, 400), 400);
  gameProgress++;
} // End of draw()


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
