"use strict";

/**************************************************
Project 2 - Just PresiDance
Valentine Sénégas

Make the president dance!
**************************************************/

let stateHome = 1;
let stateGame = 2;

// State of the game: can be title, song1,... endWin, endLose
let state = stateHome;


//*********************************************************************
//
//                   I N I T I A L I Z A T I O N
//
//*********************************************************************


// Preload the images, sounds, fonts
function preload() {
  preloadScene();
  preloadCharacter();
  preloadMoves();
  preloadInstructions();
  preloadSongs();
  preloadHome();
}

// Setup of the score, creation of the canvas, apply the main font for the text
function setup() {
  setupScene();
  setupScore();
  setupSongs();
  setupDanceMove();
  setupGame();
  setupHome();
}


//*********************************************************************
//
//                          D R A W
//
//*********************************************************************

// Description of draw() goes here.
function draw() {
  if (state == stateHome)
    drawHome();
  // Game is started.
  else {
    // Handle game logic.
    handleGameLogic();

    // Display feedbacks, messages, score and progress.
    // Draw instuctions
    drawGame();
  }
} // End of draw()
