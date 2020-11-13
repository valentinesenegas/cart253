"use strict";

/**************************************************
Exercise 6
Valentine Sénégas

A program that plays music based on primitive physics.
Press A S D or F to create different balls.
Talk in the mic to change the size of S balls.
Click on a ball to destroy it.
**************************************************/

// --- Variables --- //
// The balls
let balls = [];

// F-minor
let notesFMinor = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`];

// E flat
let notesEFlat = [`Eb3`, `F3`, `G4`, `Ab4`, `Bb4`, `C4`, `D4`, `E4`];

// B flat
let notesBFlat = [`Bb3`, `C3`, `D3`, `Eb3`, `F3`, `G3`, `Ab4`, `Bb4`];

// Arrow keys and their keyCodes
let keyA = 65;
let keyS = 83;
let keyD = 68;
let keyF = 70;

// -------------- //

// Creates the canvas and setup of the microphone
function setup() {
  createCanvas(600, 600);
  userStartAudio();
  setupMic();
}

// Draws balls and removes them
function draw() {
  background(242, 255, 246);
  instructions();

  // Remove balls that self destructed.
  // Loop on the array starting from the end to avoid out of bound errors.
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.timeToLive === 0) {
      ball.destroy();
      balls.splice(i, 1);
    }
  }

  // Draw balls
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.move();
    ball.bounce();
    ball.display();
  }
}

// Displays instructions on the screen
function instructions() {
  push();
  textSize(24);
  textAlign(LEFT, CENTER);
  fill(100);
  text(`Press A S D or F to create different balls.`, 50, height / 2);
  text(`Talk in the mic to change the size of S balls.`, 50, height / 2 + 34);
  text(`Click on a ball to destroy it.`, 50, height / 2 + 68);
  pop();
}

// Destroys the ball when the user clicks on it
function mousePressed() {
  // Is there a ball beneath the mouse?
  let ballsLength = balls.length;
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    let dist = Math.sqrt(Math.pow(ball.x - mouseX, 2) + Math.pow(ball.y - mouseY, 2));
    if (dist <= ball.size)
      ball.startSelfDestruct();
  }
}

// Create balls when ASDF keys are pressed
function keyPressed() {

  if (keyIsDown(keyA)) {
    createMiniBall(random(0, width), random(0, height));
  } else if (keyIsDown(keyD)) {
    createSpecialBall(random(0, width), random(0, height));
  } else if (keyIsDown(keyS)) {
    createMicBall(random(0, width), random(0, height));
  } else if (keyIsDown(keyF)) {
    createBall(random(0, width), random(0, height));
  }
}

// -------------- //
// Create balls
function createBall(x, y) {
  let note = random(notesFMinor);
  let ball = new Ball(x, y, note);
  balls.push(ball);
}

function createMiniBall(x, y) {
  let note = random(notesEFlat);
  let miniball = new MiniBall(x, y, note);
  balls.push(miniball);
}

function createSpecialBall(x, y) {
  let note = random(notesBFlat);
  let specialball = new SpecialBall(x, y, note);
  balls.push(specialball);
}

function createMicBall(x, y) {
  let note = random(notesBFlat);
  let micball = new MicBall(x, y, note);
  balls.push(micball);
}
