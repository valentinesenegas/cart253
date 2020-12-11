"use strict;"

let progressX = 293;
let progressY = 860;
let progressMaxW = 695;
let progressH = 20;
let progressRadius = 20;

function drawProgress(progress, progressMax) {
  let progressWidth = (progress / progressMax) * progressMaxW
  push();
  fill(50, 60, 70);
  rect(progressX, progressY, Math.max(progressWidth, progressRadius), progressH, progressRadius, progressRadius, progressRadius, progressRadius) ;
  pop();
}
