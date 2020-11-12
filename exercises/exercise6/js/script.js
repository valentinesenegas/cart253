/**************************************************
Exercise 6
Valentine Sénégas

A program that plays music based on primitive physics
**************************************************/

// The balls
let balls = [];

let miniballs = [];

let specialballs = [];

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

// setup()
//
// Just creates the canvas
function setup() {
  createCanvas(600, 600);
  userStartAudio();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(242, 255, 246);
  instructions();
  // Normal balls
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.move();
    ball.bounce();
    ball.display();
  }

  // Mini balls
  for (let i = 0; i < miniballs.length; i++) {
    let miniball = miniballs[i];
    miniball.move();
    miniball.bounce();
    miniball.display();
  }

  // Special balls
  for (let i = 0; i < specialballs.length; i++) {
    let specialball = specialballs[i];
    specialball.move();
    specialball.bounce();
    specialball.display();
  }


}

function instructions() {
  push();
  textSize(34);
  textAlign(LEFT, CENTER);
  fill(100);
  text(`Click to create normal balls.`, 50, height / 2);
  text(`Press A to create mini balls.`, 50, height / 2 + 34);
  text(`Press D to create special balls.`, 50, height / 2 + 68);
  pop();
}

// Create normal balls when the mouse is pressed
function mousePressed() {
  createBall(mouseX, mouseY);
}

// Create mini balls when any key is pressed
function keyPressed() {

  if (keyIsDown(keyA)) {
    createMiniBall(random(0, width), random(0, height));
  } else if (keyIsDown(keyD)) {
    createSpecialBall(random(0, width), random(0, height));
  }
}

function createBall(x, y) {
  let note = random(notesFMinor);
  let ball = new Ball(x, y, note);
  balls.push(ball);
}

function createMiniBall(x, y) {
  let note = random(notesEFlat);
  let miniball = new MiniBall(x, y, note);
  miniballs.push(miniball);
}


function createSpecialBall(x, y) {
  let note = random(notesBFlat);
  let specialball = new SpecialBall(x, y, note);
  specialballs.push(specialball);
}
