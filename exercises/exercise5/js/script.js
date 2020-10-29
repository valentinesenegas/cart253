/**************************************************
Exercise 5
Valentine Sénégas

Here is a description of this template p5 project.
**************************************************/

let gravityForce = 0.0025;

let paddle;

let balls = [];
let numBalls = 10;

let bombs = [];
let numBombs = 3;
let imgBomb;


function preload() {
  imgBomb = loadImage("assets/images/bomb.png");
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  paddle = new Paddle(300, 20);

  for (let i = 0; i < numBalls; i++) {
    createBalls();
  }

  for (let i = 0; i < numBombs; i++) {
    createBombs();
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(57, 57, 58);

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

  for (let i = 0; i < bombs.length; i++) {
    let bomb = bombs[i];

    if (bomb.active) {
      bomb.gravity(gravityForce);
      bomb.move();
      bomb.explode(paddle);
      bomb.display();
    }
  }
}

function createBalls() {
  let x = random(0, width);
  let y = random(-400, -100);
  let ball = new Ball(x, y);
  balls.push(ball);
}

function createBombs() {
  let x = random(0, width);
  let y = random(-400, -100);
  let bomb = new Bomb(x, y);
  bombs.push(bomb);
}

// When clicking, a new ball is added.
function mousePressed() {
  createBalls();
}
