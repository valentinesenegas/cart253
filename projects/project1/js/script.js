"use strict";
/**************************************************
Project 1
Valentine Sénégas

Collect the votes before the Donald scares the mails!
Use the arrow keys to move around !
You have one minute to collect 30 mails.
**************************************************/

// Images for decoration
let imgLotsOfLetters;
let imgBigDonaldStealsMail;
let imgbigMailman;

// Images for moving objects
let imgMailman;

let imgDonald;

let mailman = {
  x: 120,
  y: 120,
  size: 141,
  vx: 1,
  vy: 1,
  speed: 5,
};

let donald = {
  x: 280,
  y: 180,
  size: 141,
  vx: 1,
  vy: 1,
  speed: 2,
  attract: 300,
  attractIntensity: 2,
  repulsion: 500,
  repulsionIntensity: 5,
};


// Number of mails that the mailman will have to catch
const mailCount = 30;

let mailParam = {
  initVX: 3,
  initVY: 3,
  maxVX: 5,
  maxVY: 5,
};

let mails = Array();

let bg = {
  r: 186,
  g: 219,
  b: 250,
};

let myFont;

let score = 0;
let startTime;

let state = `title`; // Can be title, simulation, win or lost

// createMail(imgParam)
//
// Creation of the mail and its parameters. Returns mail
function createMail(imgParam) {
  let mail = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    img: undefined,
  };
  mail.img = imgParam;
  return mail;
}

// preload()
//
// Preloading the images, fonts and sounds
function preload() {
  // Characters: mailman and the Donald
  imgMailman = loadImage("assets/images/mailman.png");
  imgDonald = loadImage("assets/images/donald.png");

  // Mail
  for (let mailIdx = 0; mailIdx < mailCount; mailIdx++)
    mails.push(createMail(loadImage("assets/images/mail.png")));

  // Title state
  imgBigDonaldStealsMail = loadImage("assets/images/bigdonaldstealsmail.png");
  imgLotsOfLetters = loadImage("assets/images/lotsofletters.png");
  imgbigMailman = loadImage("assets/images/bigmailman.png");

  // Google Font: Secular One
  myFont = loadFont("assets/fonts/SecularOne-Regular.ttf");
}

// setup()
//
// Creation of the canvas, position of the mails
function setup() {
  createCanvas(1400, 900);
  textFont(myFont);
  setupMails();
}

// setupMails()
//
// Creation of the mails at random positions going in random directions at random speed! So much randomness...
function setupMails() {
  // Create mails
  for (let mailIdx = 0; mailIdx < mailCount; mailIdx++) {
    // Position
    mails[mailIdx].x = random(
      mails[mailIdx].img.width / 2,
      width - mails[mailIdx].img.width / 2
    );
    mails[mailIdx].y = random(
      mails[mailIdx].img.height / 2,
      height - mails[mailIdx].img.height / 2
    );

    // Speed
    mails[mailIdx].vx = random(-mailParam.initVX, mailParam.initVX);
    mails[mailIdx].vy = random(-mailParam.initVY, mailParam.initVY);
  }
}

// draw()
//
// Background color and States management (title, simulation, win, lost)
function draw() {
  background(bg.r, bg.g, bg.b);

  // States management
  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `win`) {
    democracySaved();
  } else if (state === `lost`) {
    donaldWon();
  }
}

//--- States ---//

// Title
function title() {
  push();

  // Title "Save democracy!"
  textSize(65);
  fill(65, 146, 240);
  textAlign(CENTER, CENTER);
  text(`Save democracy!`, width / 2, height / 2);

  // Images of characters and mails
  image(imgLotsOfLetters, width / 4, 0);
  image(
    imgBigDonaldStealsMail,
    width - imgBigDonaldStealsMail.width,
    height - imgBigDonaldStealsMail.height
  );
  image(imgbigMailman, 0, height - imgbigMailman.height);

  // Instructions
  textSize(35);
  fill(42, 94, 155);
  text(`Catch the mails and avoid the Donald!`, width / 2, height / 1.25);

  pop();
}

// The actual game!
function simulation() {
  display();
  displayTime(); // Display the time left
  move(); // Movement of the Donald
  checkKeys(); // Movement of the mailman
  checkMailCatch(); // Check if the mailman catches mail
}

// When winning the game
function democracySaved() {
  push();
  textSize(64);
  fill(150, 150, 255);
  textAlign(CENTER, CENTER);
  text(`You saved democracy!`, width / 2, height / 2);
  pop();

  image(imgDonald, width - imgDonald.width, height - imgDonald.height);
}

// When loosing the game
function donaldWon() {
  push();
  textSize(64);
  fill(150, 150, 255);
  textAlign(CENTER, CENTER);
  text(`The Donald won...`, width / 2, height / 2);
  pop();

  // The background turns dark...
  bg.r = 36;
  bg.g = 36;
  bg.b = 36;

  image(imgDonald, width - imgDonald.width, height - imgDonald.height);
}

//--------- Simulation --------//

// displayTime()
//
// Display the remaining time to collect the mails
function displayTime() {
  let remainingTime = 60 - (Date.now() - startTime) / 1000;

  push();
  textSize(42);
  textFont(myFont);
  fill(65, 146, 240);
  textAlign(LEFT);
  // We don't want the decimals of Date.now(), so I use Math.round to round the time left the nearest integer
  text(`Time left: ${Math.round(remainingTime)}`, (width / 2) * 1.5, 50);
  pop();

  // If the remaining time is less than zero, you loose :(
  if (remainingTime < 0) {
    state = `lost`;
  }
}

// display()
//
// Display the elements: the mailman, the Donald and the mails
function display() {
  imageMode(CENTER);
    // Mailman
  image(imgMailman, mailman.x, mailman.y);
    // The Donald
  image(imgDonald, donald.x, donald.y);
  // Mail
  for (let mailIdx = 0; mailIdx < mailCount; mailIdx++)
    if (mails[mailIdx].img != undefined)
      image(mails[mailIdx].img, mails[mailIdx].x, mails[mailIdx].y);
}

// checkMailCatch()
//
// Check if the mailman catches a mail by looking at their respective positions
function checkMailCatch() {
  for (let mailIdx = 0; mailIdx < mailCount; mailIdx++) {
    if (mails[mailIdx].img != undefined) {
      if (
        mailman.x < mails[mailIdx].x + mails[mailIdx].img.width &&
        mailman.x + imgMailman.width > mails[mailIdx].x &&
        mailman.y < mails[mailIdx].y + mails[mailIdx].img.height &&
        mailman.y + imgMailman.height > mails[mailIdx].y
      ) {
        // Collision detected:
        // The mail disappears and the score is incremented by 1.
        mails[mailIdx].img = undefined;
        score += 1;

        // If the score is equal to the number of mail collected, the user wins!
        if (score === mailCount) {
          state = `win`;
        }
      }
    }
  }
}

// move()
//
// Movement of everything: the mailman, the Donald and the mail.
function move() {
  // Mailman
  mailman.x = mailman.x + mailman.vx;
  mailman.y = mailman.y + mailman.vy;

  // Donald is attracted by the mailman.
  if (mailman.x + imgMailman.width / 2 > donald.x + imgDonald.width / 2)
    donald.vx = donald.attractIntensity;
  else if (mailman.x + imgMailman.width / 2 < donald.x + imgDonald.width / 2)
    donald.vx = -donald.attractIntensity;
  if (mailman.y + imgMailman.height / 2 > donald.y + imgDonald.height / 2)
    donald.vy = donald.attractIntensity;
  else if (mailman.y + imgMailman.height / 2 < donald.y + imgDonald.height / 2)
    donald.vy = -donald.attractIntensity;

  // Random change of direction for the Donald
  let change = random(); // Generate a random number between 0 and 1

  // Change direction 1% of the time
  if (change < 0.01) {
    // Choose random velocities within the "speed limit". Donald, don't go too fast!
    donald.vx = random(-donald.speed, donald.speed);
    donald.vy = random(-donald.speed, donald.speed);
  }
  donald.x = donald.x + donald.vx;
  donald.y = donald.y + donald.vy;

    // Movement of the mail
  for (let mailIdx = 0; mailIdx < mailCount; mailIdx++) {
    if (mails[mailIdx].img != undefined) {
      // Check screen limits.
      /*      if (
        mails[mailIdx].x <= mails[mailIdx].img.width / 2 ||
        mails[mailIdx].x > width - mails[mailIdx].img.width / 2
      )
        mails[mailIdx].vx = -mails[mailIdx].vx;
      if (
        mails[mailIdx].y <= mails[mailIdx].img.height / 2 ||
        mails[mailIdx].y > height - mails[mailIdx].img.height / 2
      )
        mails[mailIdx].vy = -mails[mailIdx].vy; */

      if (mails[mailIdx].x <= mails[mailIdx].img.width / 2)
        mails[mailIdx].x = width - mails[mailIdx].img.width / 2;
      else if (mails[mailIdx].x > width - mails[mailIdx].img.width / 2)
        mails[mailIdx].x = mails[mailIdx].img.width / 2;

      if (mails[mailIdx].y <= mails[mailIdx].img.height / 2)
        mails[mailIdx].y = height - mails[mailIdx].img.height / 2;
      else if (mails[mailIdx].y > height - mails[mailIdx].img.height / 2)
        mails[mailIdx].y = mails[mailIdx].img.height / 2;


      // The Donald scares the mail
      let d2 = dist(mails[mailIdx].x, mails[mailIdx].y, donald.x, donald.y);

      if (d2 < donald.repulsion) {
        if (
          mails[mailIdx].x + mails[mailIdx].img.width / 2 >
          donald.x + imgDonald.width / 2
        )
          mails[mailIdx].vx +=
            (donald.repulsion - d2) / donald.repulsionIntensity;
        else if (
          mails[mailIdx].x + mails[mailIdx].img.width / 2 <
          donald.x + imgDonald.width / 2
        )
          mails[mailIdx].vx -=
            (donald.repulsion - d2) / donald.repulsionIntensity;
        if (
          mails[mailIdx].y + mails[mailIdx].img.height / 2 >
          donald.y + imgDonald.height / 2
        )
          mails[mailIdx].vy +=
            (donald.repulsion - d2) / donald.repulsionIntensity;
        else if (
          mails[mailIdx].y + mails[mailIdx].img.height / 2 <
          donald.y + imgDonald.height / 2
        )
          mails[mailIdx].vy -=
            (donald.repulsion - d2) / donald.repulsionIntensity;
      }

      // Be sure not to overspeed (because we don't like tickets).
      if (mails[mailIdx].vx > 0 && mails[mailIdx].vx > mailParam.maxVX)
        mails[mailIdx].vx = mailParam.maxVX;
      else if (mails[mailIdx].vx < 0 && mails[mailIdx].vx < -mailParam.maxVX)
        mails[mailIdx].vx = -mailParam.maxVX;
      if (mails[mailIdx].vy > 0 && mails[mailIdx].vy > mailParam.maxVY)
        mails[mailIdx].vy = mailParam.maxVY;
      else if (mails[mailIdx].vy < 0 && mails[mailIdx].vy < -mailParam.maxVY)
        mails[mailIdx].vy = -mailParam.maxVY;

      mails[mailIdx].x += mails[mailIdx].vx;
      mails[mailIdx].y += mails[mailIdx].vy;
    }
  }
}

// --------------------------------------------- //
//  USER CONTROLS  //

// checkKeys()
//
// Checks if the user presses down on an arrow. This makes the mailman move
function checkKeys() {
  // Allows the user to move the mailman using the arrow keys!

  if (keyIsDown(LEFT_ARROW)) {
    // If it is, set the x velocity to be negative
    mailman.vx = -mailman.speed;
  }
  // Otherwise is the right arrow pressed?
  else if (keyIsDown(RIGHT_ARROW)) {
    // If it is, set the x velocity to be positive
    mailman.vx = mailman.speed;
  }
  // If neither of those keys are pressed
  else {
    // Then set the x velocity to 0 to stop moving horizontally
    mailman.vx = 0;
  }

  // Do the same thing with vertical movement and the UP and DOWN keys
  if (keyIsDown(UP_ARROW)) {
    mailman.vy = -mailman.speed;
  } else if (keyIsDown(DOWN_ARROW)) {
    mailman.vy = mailman.speed;
  } else {
    mailman.vy = 0;
  }
}

// mousePressed()
//
// To start the simulation, click with the mouse
// When the mouse is pressed, the simulation starts and the countdown starts too.
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
    startTime = Date.now();
  }
}
