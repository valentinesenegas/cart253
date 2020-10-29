/**************************************************
Exercise 5
Valentine Sénégas

The user looses if the paddle touches a bomb.
The user wins if the paddle never touches a bomb in the time allowed.
The user can add one new ball and one new bomb by pressing the mouse.
**************************************************/

let gravityForce = 0.0025;

let paddle;

let balls = [];
let numBalls = 10;

let bombs = [];
let numBombs = 3;
let imgBomb;

const timeAllowed = 1000; // frameCount

let state = `simulation`;

// preload()
// Preloading the images
function preload() {
  imgBomb = loadImage("assets/images/bomb.png");
}

// setup()
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  paddle = new Paddle(300, 20);

  // Create balls based on the number of balls that we want
  for (let i = 0; i < numBalls; i++) {
    createBalls();
  }

  // Create bombs based on the number of bombs that we want
  for (let i = 0; i < numBombs; i++) {
    createBombs();
  }
}

// draw()
// Description of draw() goes here.
function draw() {
  background(57, 57, 58);

  // States management
  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `win`) {
    youWon();
  } else if (state === `lost`) {
    youLost();
  }
}

//--------- States --------//
function simulation() {

  push();
  textSize(34);
  fill(41, 115, 115);
  textAlign(CENTER, CENTER);
  text(`Click with your mouse to add more balls!`, width / 2, height / 2);
  pop();

  // Paddle
  paddle.move();
  paddle.display();

  // Balls
  let isActive = false;
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];

    if (ball.active) {
      ball.gravity(gravityForce);
      ball.move();
      ball.bounce(paddle);
      ball.display();
      isActive = true;
    }
  }
  if (isActive === false)
    state = `lost`;

  // Bombs
  for (let i = 0; i < bombs.length; i++) {
    let bomb = bombs[i];

    if (bomb.active) {
      bomb.gravity(gravityForce);
      bomb.move();
      bomb.explode(paddle);
      bomb.display();
      if (bomb.exploded)
        state = `lost`;
    }
  }

  timer();
}

function youLost() {
  balls = 0;

  push();
  textSize(64);
  fill(230, 230, 230);
  textAlign(CENTER, CENTER);
  text(`You lost!`, width / 2, height / 2);
  pop();
}

function youWon() {
  balls = 0;

  push();
  textSize(64);
  fill(233, 215, 118);
  textAlign(CENTER, CENTER);
  text(`You won!`, width / 2, height / 2);
  pop();
}

//--------- Timer --------//
// When the number of frames exceeds a certain amount, the user wins.
function timer() {
  if (frameCount > timeAllowed) {
    state = `win`;
  }
}

//--------- Creation --------//
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


//--------- User input --------//
// When clicking, a new ball and a new bomb are added.
function mousePressed() {

  if (state === `simulation`) {
    createBalls();
    createBombs();
  }
}
