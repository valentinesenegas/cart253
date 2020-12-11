"use strict";

let score = 0;
let scoreHit = 0;         // Moves that were correct = hit moves.
let scoreMissed = 0;      // Missed moves.
let scoreIncorrect = 0;   // Incorrect moves.
let scoreMax = 0;

// Position of text on screen.
let scorePercentX = 1150;
let scorePercentY = 800;
let scorePercentDiameterSmall = 75;
let scorePercentDiameterLarge = 100;
let scoreIncorrectX = 1072;
let scoreIncorrectY = 878;

function scoreHitMove() {
  score++;
  scoreHit++;
}

function scoreMissedMove() {
  score--;
  scoreMissed++;
}

function scoreIncorrectMove() {
  score--;
  scoreIncorrect++;
}

function drawScorePercentHit(percent, x, y, scorePercentDiameter, fontSize) {
  // Circle
  push();
  fill(42, 50, 80);
  strokeWeight(4);
  stroke('white');
  circle(x, y, scorePercentDiameter);
  noStroke();
  // Text
  textSize(fontSize);
  textAlign(CENTER);
  textFont(openSansRegular);
  fill(255, 255, 255);
  text(percent + "%", x, y + 10);
  pop();
}

function drawScoreIncorrectMoves() {
  // Display number of incorrect moves.
  push();
  textSize(24);
  textAlign(LEFT);
  fill(35, 55, 62);
  text(`Incorrect moves: ` + scoreIncorrect, scoreIncorrectX, scoreIncorrectY);
  pop();
}

function drawScore() {
  // Display number of incorrect moves.
  drawScoreIncorrectMoves();

  // Display percentage of correct moves.
  drawScorePercentHit(getScorePercentHit(), scorePercentX, scorePercentY, scorePercentDiameterLarge, 32);
}

function resetScore(scoreMaxParam) {
  score = 0;
  scoreHit = 0;
  scoreMissed = 0;
  scoreIncorrect = 0;
  scoreMax = scoreMaxParam;
}

function getScorePercentHit() {
  return Math.floor((scoreHit / scoreMax) * 100);
}

function getScoreIncorrectMoves() {
  return scoreIncorrect;
}

// Returns the score max for the last song or 0 if the song was cancelled.
function getScoreMax() {
  return scoreMax;
}
