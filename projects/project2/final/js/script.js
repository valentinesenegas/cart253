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

// Dance moves
let currentDanceMove = null;

let atRestDanceMove;

// Instructions
let instructions = [];

// Feedback messages when missed or successful move
let missedMessages = ["ZERO!", "WRONG!", "WEAK!", "REALLY BAD!", "LOSER!", "HORRIBLE!"];
let hitMessages = ["YUUUGE!", "SO SMART!", "TOUGH MOVE!", "CLASSY!", "TREMENDOUS!", "GREAT!"];

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
  createCanvas(1267, 900);
  textFont(allanBold);

  setupScore();
  setupDanceMove();

  atRestDanceMove = new AtRestDanceMove(noInstruction);  // -1 = not associated with an instruction.
  currentDanceMove = atRestDanceMove;
}

// draw()
//
// Description of draw() goes here.
function draw() {

  // Place the background image
  image(bg, 0, 0);

  handleInput();
  if (currentDanceMove != null)
  {
    if (currentDanceMove.isFinished())
      currentDanceMove = atRestDanceMove;
    currentDanceMove.draw();
  }

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

      if (currentDanceMove.verifyInstructionIndex(instructions[instruction].getInstructionIndex())) {
        currentDanceMove.setInstructionIndex(noInstruction);
        instructions.splice(instruction, 1);
        let message = Math.floor(Math.random() * hitMessages.length);
        addMessage(hitMessages[message]);
        hit();
      } else {
        // Remove instruction from the array.
        instructions.splice(instruction, 1);
        let message = Math.floor(Math.random() * missedMessages.length);
        addMessage(missedMessages[message]);
        missed();
      }
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
    currentDanceMove = new PunchLeftDanceMove(instructionPunchLeftDanceMove);
  } else if (keyIsDown(keyS)) {
    currentDanceMove = new ClapLeftDanceMove(instructionClapLeftDanceMove);
  } else if (keyIsDown(keyD)) {
    currentDanceMove = new PointLeftDanceMove(instructionPointLeftDanceMove);
  } else if (keyIsDown(keyF)) {
    currentDanceMove = new AccordionDanceMove(instructionAccordionDanceMove);
  }

  // Right side
  if (keyIsDown(keyH)) {
   currentDanceMove = new SplitDanceMove(instructionSplitDanceMove);
  } else if (keyIsDown(keyJ)) {
  currentDanceMove = new PointRightDanceMove(instructionPointRightDanceMove);
  } else if (keyIsDown(keyK)) {
    currentDanceMove = new ClapRightDanceMove(instructionClapRightDanceMove);
  } else if (keyIsDown(keyL)) {
   currentDanceMove = new PunchRightDanceMove(instructionPunchRightDanceMove);
  }

} // End handleInput()
