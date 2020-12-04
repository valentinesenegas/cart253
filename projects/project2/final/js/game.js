"use strict";

/**************************************************
Project 2 - Just PresiDance
Valentine Sénégas

Make the president dance!
**************************************************/

// --- VARIABLES --- //

// Dance moves
let currentDanceMove = null;

// Instructions
let instructions = [];

// Current song.
let currentSongId;
let song = null;

// Images for replay and exit buttons.
let imgReplayButtonReleased;
let imgReplayButtonHover;
let imgReplayButtonPressed;

let imgExitButtonReleased;
let imgExitButtonHover;
let imgExitButtonPressed;

let imgLastPressedReplayButton = null;
let imgLastPressedExitButton = null;

let replayButtonX = 100;
let exitButtonX = 160;
let controlButtonsY = 800;
let controlButtonsW = 42;
let controlButtonsH = 42;


function preloadGame() {
  // Replay and exit buttons
  imgReplayButtonReleased = loadImage("assets/images/buttons/replayReleased.png");
  imgReplayButtonHover = loadImage("assets/images/buttons/replayHover.png");
  imgReplayButtonPressed = loadImage("assets/images/buttons/replayPressed.png");

  imgExitButtonReleased = loadImage("assets/images/buttons/exitReleased.png");
  imgExitButtonHover = loadImage("assets/images/buttons/exitHover.png");
  imgExitButtonPressed = loadImage("assets/images/buttons/exitPressed.png");
}

// Setup of the score, creation of the canvas, apply the main font for the text
function setupGame() {
  currentDanceMove = getRestDanceMove();
}

function isGameStarted() {
  return (song != null);
}

function startGame(songId) {
  resetInstructions();
  resetMessages();
  currentSongId = songId;
  if (song != null)
    song.stop();
  song = getSong(currentSongId);
  resetCountdown(song.getCountdown());
  song.play();
  resetScore();
}

function stopGame() {
  resetInstructions();
  resetMessages();
  if (song != null)
    song.stop();
  song = null;
}

//*********************************************************************
//
//                        B U T T O N S
//
//*********************************************************************

function drawControlButtons() {

// Replay button
  let imgReplay = imgReplayButtonReleased;
  if (mouseX >= replayButtonX && mouseX <= replayButtonX + controlButtonsW &&
      mouseY >= controlButtonsY && mouseY <= controlButtonsY + controlButtonsH) {
    if (mouseIsPressed)
      imgReplay = imgReplayButtonPressed;
    else if (imgLastPressedReplayButton == imgReplayButtonPressed)
      startGame(currentSongId);
    else
      imgReplay = imgReplayButtonHover;
  }
  imgLastPressedReplayButton = imgReplay;

  push();
  imageMode(CORNER);
  image(imgReplay, replayButtonX, controlButtonsY);
  pop();

  // Exit button
    let imgExit = imgExitButtonReleased;
    if (mouseX >= exitButtonX && mouseX <= exitButtonX + controlButtonsW &&
        mouseY >= controlButtonsY && mouseY <= controlButtonsY + controlButtonsH) {
      if (mouseIsPressed)
        imgExit = imgExitButtonPressed;
      else if (imgLastPressedExitButton == imgExitButtonPressed)
        stopGame();
      else
        imgExit = imgExitButtonHover;
    }
    imgLastPressedExitButton = imgExit;

    push();
    imageMode(CORNER);
    image(imgExit, exitButtonX, controlButtonsY);
    pop();
}

//*********************************************************************
//
//                          D R A W
//
//*********************************************************************


function drawCurrentDanceMove(){
  if (currentDanceMove != null)
    currentDanceMove.draw();
}

function drawSongProgress() {
  if (song != null) {
    drawProgress(song.getProgress(), song.getTotalNumberOfInstructions());
  }
}

// Description of draw() goes here.
function drawGame() {
  // Display feedbacks, messages, score and progress.
  // Draw instuctions
  drawScene();
  drawCurrentDanceMove();
  drawSongProgress();
  drawInstructions();
  drawFeedbacks();
  drawMessages();
  drawScore();
  drawCountdown();
  drawControlButtons();
} // End of draw()


//*********************************************************************
//
//                       G A M E   L O G I C
//
//*********************************************************************


// Get new dance move as input by the user.
function checkForNewDanceMoveFromUserInput() {
  // If current dance move is finished and is not associated with an instruction Id then
  // it means the user input a dance move at the wrong time (i.e. no associated instruction).
  if (currentDanceMove.isAnimationFinished()) {
    if (currentDanceMove.getInstructionId() != noInstructionId)
      createFeedbackForIncorrectMove(currentDanceMove.getInstructionId());
    currentDanceMove = getRestDanceMove();
  }

  // Check for new dance move.
  // If the previous move has an instruction Id then it means that it was not finished.
  let newDanceMove;
  newDanceMove = createDanceMoveFromInput();
  if (newDanceMove != null) {
    if (currentDanceMove.getInstructionId() != noInstructionId)
      createFeedbackForIncorrectMove(currentDanceMove.getInstructionId());
    currentDanceMove = newDanceMove;
  }
}

// Check is there is a new instruction available from the song.
function checkForNewInstruction() {
  // If there is no song or a count down is active, stop here.
  if (song == null)
    return;

  // Check if a new instruction is available.
  let newInstructionId = song.getNewInstructionId();
  if (newInstructionId >= 0)
      instructions.push(createInstructionFromId(newInstructionId));
}

// Destroy the instruction once it has reached the limit
// Check also for missed instruction.
function checkForInstructionsToRemove() {
  let instruction;
  for (instruction = instructions.length - 1; instruction >= 0 ; instruction--) {
    if (instructions[instruction].hasReachedLimit()) {
      // Hit or missed instruction?
      if (currentDanceMove.verifyInstructionId(instructions[instruction].getInstructionId())) {
        // Instruction was hit on time.
        currentDanceMove.setInstructionId(noInstructionId);
        if (song != null)
          song.increaseProgress();
        createFeedbackForHitMove(instructions[instruction].getInstructionId());
        instructions.splice(instruction, 1);    // Remove instruction from array.
        createHitMessage();
        scoreHit();   // Update score.
      } else {
        // Missed instruction
        // Remove instruction from the array.
        if (song != null)
          song.increaseProgress();
        createFeedbackForMissedMove(instructions[instruction].getInstructionId());
        instructions.splice(instruction, 1);    // Remove instruction from array.
        createMissedMessage();
        scoreMissed();  // Update score.
      }
    }
  }
}

function handleGameLogic() {
    //temporary
    // If the B key is pressed, start song.
    if (keyIsDown(66)) {
      resetCountdown(song.getCountdown());
      song.play();
    }

  checkForNewDanceMoveFromUserInput();    // Get new dance move as input by the user.
  checkForNewInstruction();               // Get new instruction if available.
  checkForInstructionsToRemove();         // Remove instructions that reached their end of file and check for hit/miss.
}
