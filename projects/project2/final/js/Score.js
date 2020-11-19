"use strict";

let score = 0;
let scoreX = 1090;
let scoreY = 875;

function danceMoveSuccess() {
  score++;
}

function danceMoveMissed() {
  score--;
}

function drawScore() {
  push();
  textSize(36);
  textAlign(LEFT);
  // textAlign(RIGHT);
  fill(35, 55, 62);
  text(`SCORE : ` + score, scoreX, scoreY);
  pop();
}

function setupScore() {
  score = 0;
}
