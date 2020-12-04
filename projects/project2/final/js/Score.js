"use strict";

let score = 0;
let scoreX = 1090;
let scoreY = 875;

function scoreHit() {
  score++;
}

function scoreMissed() {
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

function resetScore() {
  score = 0;
}
