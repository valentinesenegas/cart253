"use strict;"

let progressX = 300;
let progressY = 860;
let progressMaxW = 600;
let progressH = 20;
let progressRadius = 20;

function drawProgress(progress, progressMax) {
  push();
  fill(50, 60, 70);
  rect(progressX, progressY, (progress / progressMax) * progressMaxW , progressH, progressRadius, progressRadius, progressRadius, progressRadius) ;
  pop();
}
