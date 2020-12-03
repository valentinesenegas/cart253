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

// Setup of the score, creation of the canvas, apply the main font for the text
function setupGame() {
  currentDanceMove = getRestDanceMove();
}

function isGameStarted() {
  return (song != null);
}

function startGame(songId) {
  currentSongId = songId;
  song = getSong(currentSongId);
  resetCountdown(song.getCountdown());
  song.play();
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
