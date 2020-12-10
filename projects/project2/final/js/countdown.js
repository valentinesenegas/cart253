"use strict";

let textTimeToLive = 60;
let countdownTimeToLive = 0;

function resetCountdown(countdownTimeToLiveMax) {
  countdownTimeToLive = Math.floor((countdownTimeToLiveMax * 60) / 1000);  // Convert milliseconds to number of frames
}

function isCountdownActive() {
  return countdownTimeToLive != 0;
}

function drawCountdown() {
  if (countdownTimeToLive == 0)
    return;
  let countdownText = Math.floor(countdownTimeToLive/textTimeToLive);

  push();
  textSize(300 - (countdownTimeToLive % textTimeToLive) * 3);
  textAlign(CENTER, CENTER);
  stroke('#A00828');
  strokeWeight(4);
  fill(221, 78, 108);
  if (countdownText === 0)
    text("Dance!", 620, 400);
  else
    text(countdownText, 620, 400);
  pop();
  if (isGamePaused() == false)
    countdownTimeToLive--;
}
