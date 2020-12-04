"use strict";

/**************************************************
Project 2 - Just PresiDance
Valentine Sénégas

Make the president dance!
**************************************************/


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
  preloadGame();
  preloadHome();
}

// Setup of the score, creation of the canvas, apply the main font for the text
function setup() {
  setupScene();
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
  if (isGameStarted())
  {
   // Handle game logic.
   handleGameLogic();

   // Display feedbacks, messages, score and progress.
   // Draw instuctions
   drawGame();
 }
  else
    drawHome();
} // End of draw()
