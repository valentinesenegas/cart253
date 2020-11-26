"use strict";

/**************************************************
Project 2 - Just PresiDance
Valentine Sénégas

Make the president dance!
**************************************************/

// --- VARIABLES --- //

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

// Feedback on hit, missed and incorrect moves.
let feedbacks = [];

// Messages when missed or successful move
let missedMessages = ["ZERO!", "WRONG!", "WEAK!", "REALLY BAD!", "LOSER!", "HORRIBLE!"];
let hitMessages = ["YUUUGE!", "SO SMART!", "TOUGH MOVE!", "CLASSY!", "TREMENDOUS!", "GREAT!"];

// Game progress
let gameProgress = 0;

// Current song.
let currentSong;
let song = null;

// State of the game: can be title, song1,... endWin, endLose
let state;


// ---------- //
// Fonts
let allanBold;
let allanRegular;

// ---------- //
// Preload the images, sounds, fonts
function preload() {
  // Google Font: Allan
  allanBold = loadFont("assets/fonts/Allan-Bold.ttf");
  allanRegular = loadFont("assets/fonts/Allan-Regular.ttf");

  // Background
  bg = loadImage("assets/images/bg.png");

  preloadCharacter();
  preloadMoves();
  preloadInstructions();
  preloadSongs();
}

// setup()
//
// Setup of the score, creation of the canvas, apply the main font for the text
function setup() {
  createCanvas(1267, 900);
  textFont(allanBold);

  setupScore();
  setupSongs();

  atRestDanceMove = new AtRestDanceMove(noInstruction);  // -1 = not associated with an instruction.
  currentDanceMove = atRestDanceMove;

  // Get first song.
  currentSong = 0;
  song = getSong(currentSong);
}

// draw()
//
// Description of draw() goes here.
function draw() {

  // Place the background image
  image(bg, 0, 0);

  // Get new dance move as input by the user.
  let newDanceMove;
  newDanceMove = createDanceMoveFromInput();
  if (newDanceMove != null)
    currentDanceMove = newDanceMove;

  else {
    // If current dance move is finished and is not associated with an instruction then
    // it means the user input a dance move at the wrong time (i.e. no associated instruction).
     if (currentDanceMove.isFinished()) {
      if (currentDanceMove.getInstructionIndex() != noInstruction)
        feedbacks.push(new IncorrectFeedback(currentDanceMove.getInstructionIndex()));
      currentDanceMove = atRestDanceMove;
    }
  }
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
  for (instruction = instructions.length - 1; instruction >= 0 ; instruction--) {
    if (instructions[instruction].hasReachedLimit()) {

      if (currentDanceMove.verifyInstructionIndex(instructions[instruction].getInstructionIndex())) {
        currentDanceMove.setInstructionIndex(noInstruction);
        feedbacks.push(new HitFeedback(instructions[instruction].getInstructionIndex()));
        instructions.splice(instruction, 1);
        let message = Math.floor(Math.random() * hitMessages.length);
        addMessage(hitMessages[message]);
        hit();
      } else {
        // Remove instruction from the array.
        feedbacks.push(new MissedFeedback(instructions[instruction].getInstructionIndex()));
        instructions.splice(instruction, 1);
        let message = Math.floor(Math.random() * missedMessages.length);
        addMessage(missedMessages[message]);
        missed();
      }
    }
  }

  // Draw feedbacks
  let feedback;
  for (feedback = 0; feedback < feedbacks.length; feedback++)
    feedbacks[feedback].draw();
  for (feedback = feedbacks.length - 1; feedback >= 0; feedback--) {
    if (feedbacks[feedback].hasReachedEndOfLife())
      feedbacks.splice(feedback, 1);
  }

  // Display messages, score and progress.
  drawMessages();
  drawScore();
  drawProgress(Math.min(gameProgress, 400), 400);
  gameProgress++;
} // End of draw()


// USER INPUT with arrow keys
let keyPressedA = false;
let keyPressedS = false;
let keyPressedD = false;
let keyPressedF = false;
let keyPressedH = false;
let keyPressedJ = false;
let keyPressedK = false;
let keyPressedL = false;


function keyReleased() {
  // Detect released keys.
  // Left side
  if (keyCode == keyA)
    keyPressedA = false;
  else if (keyCode == keyS)
    keyPressedS = false;
  else if (keyCode == keyD)
    keyPressedD = false;
  else if (keyCode == keyF)
    keyPressedF = false;

  // Right side
  else if (keyCode == keyH)
    keyPressedH = false;
  else if (keyCode == keyJ)
    keyPressedJ = false;
  else if (keyCode == keyK)
    keyPressedK = false;
  else if (keyCode == keyL)
    keyPressedL = false;
}
