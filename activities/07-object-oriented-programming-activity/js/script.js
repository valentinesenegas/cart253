"use strict";
/**************************************************
Juggling simulation
Valentine Sénégas

Juggling simulation
The user will control a rectangular “paddle” at the bottom of the screen, moving it horizontally with the mouse position. Balls will fall from the top of the screen. If they hit the paddle, they will bounce upward and fall again. If they miss the paddle, they will disappear off the bottom.
**************************************************/

let gravityForce = 0.0025;

let paddle;

let balls = [];
let numBalls = 10;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  paddle = new Paddle(300, 20);

  for (let i = 0; i < numBalls; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let ball = new Ball(x, y);
    balls.push(ball);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  paddle.move();
  paddle.display();

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];

    if (ball.active) {
      ball.gravity(gravityForce);
      ball.move();
      ball.bounce(paddle);
      ball.display();
    }
  }
}
