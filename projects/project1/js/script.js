"use strict";
/**************************************************
Project 1
Valentine Sénégas

Collect the votes before the Donald !
Use the arrow keys to move around !
You have one minute to collect 20 letters.
**************************************************/

// Images for decoration
let imgLotsOfLetters;
let imgBigDonaldStealsMail;

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
  repulsionIntensity: 5
};

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
let win = false;

let state = `title`; // Can be title, simulation, win

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

  for (let mailIdx = 0; mailIdx < mailCount; mailIdx++)
    mails.push(createMail(loadImage("assets/images/mail.png")));

    // Title state
    imgBigDonaldStealsMail = loadImage("assets/images/bigdonaldstealsmail.png");
    imgLotsOfLetters = loadImage("assets/images/lotsofletters.png");

  // Google Font: Secular One
  myFont = loadFont('assets/fonts/SecularOne-Regular.ttf');
}

// setup()
//
// Creation of the canvas, position of the letters
function setup() {
  createCanvas(1400, 900);
  textFont(myFont);
  setupMails();
}

function setupMails() {
  // Create mails
  for (let mailIdx = 0; mailIdx < mailCount; mailIdx++) {
    mails[mailIdx].x = random(
      mails[mailIdx].img.width / 2,
      width - mails[mailIdx].img.width / 2
    );
    mails[mailIdx].y = random(
      mails[mailIdx].img.height / 2,
      height - mails[mailIdx].img.height / 2
    );
    mails[mailIdx].vx = random(-mailParam.initVX, mailParam.initVX);
    mails[mailIdx].vy = random(-mailParam.initVY, mailParam.initVY);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bg.r, bg.g, bg.b);

  // States management
  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
  else if (state === `win`) {
    democracySaved();
  }

}

//--- States ---//
function title() {
  push();
  textSize(65);
  textFont(myFont);
  fill(65, 146, 240);
  textAlign(CENTER, CENTER);
  text(`Save democracy!`, width/2, height/2);
  image(imgLotsOfLetters, width/4, 0);
  image(imgBigDonaldStealsMail, width-imgBigDonaldStealsMail.width, height - imgBigDonaldStealsMail.height);
  pop();
}

function simulation() {
  display();
  move(); // Movement of the Donald
  checkKeys(); // Movement of the mailman
  checkMailCatch();
}

function democracySaved() {
  push();
  textSize(64);
  fill(150,150,255);
  textAlign(CENTER, CENTER);
  text(`You saved democracy! `, width/2, height/2);
  pop();

  image(imgDonald, width - imgDonald.width , height - imgDonald.height);
}

function instructions() {
  push();
  textSize(42);
  textFont(myFont);
  fill(65, 146, 240);
  textAlign(CENTER, CENTER);
  text(`Catch the letters and avoid the Donald!`, width/2, height/2);
  image(imgLotsOfLetters, width/4, 0);
  image(imgBigDonaldStealsMail, width-imgBigDonaldStealsMail.width, height - imgBigDonaldStealsMail.height);
  pop();
}


function display() {
  // DISPLAY
  imageMode(CENTER);
  image(imgMailman, mailman.x, mailman.y);
  image(imgDonald, donald.x, donald.y);
  for (let mailIdx = 0; mailIdx < mailCount; mailIdx++)
    if (mails[mailIdx].img != undefined)
      image(mails[mailIdx].img, mails[mailIdx].x, mails[mailIdx].y);
}

function checkMailCatch() {
  for (let mailIdx = 0; mailIdx < mailCount; mailIdx++) {
    if (mails[mailIdx].img != undefined) {
      if (
        mailman.x < mails[mailIdx].x + mails[mailIdx].img.width &&
        mailman.x + imgMailman.width > mails[mailIdx].x &&
        mailman.y < mails[mailIdx].y + mails[mailIdx].img.height &&
        mailman.y + imgMailman.height > mails[mailIdx].y
      ) {
        // Collision detected
        mails[mailIdx].img = undefined;
        score += 1;

        if (score === mailCount) {
          win = true;
          state = `win`;
        }
      }
    }
  }
}

function move() {
  // Mailman
  mailman.x = mailman.x + mailman.vx;
  mailman.y = mailman.y + mailman.vy;

  // Donald is attracted by the mailman.
  if (mailman.x + imgMailman.width / 2 > donald.x + imgDonald.width / 2)
    donald.vx =  donald.attractIntensity;
  else if (mailman.x + imgMailman.width / 2 < donald.x + imgDonald.width / 2)
    donald.vx =  -donald.attractIntensity;
  if (mailman.y + imgMailman.height / 2 > donald.y + imgDonald.height / 2)
    donald.vy =  donald.attractIntensity;
  else if (mailman.y + imgMailman.height / 2 < donald.y + imgDonald.height / 2)
    donald.vy =  -donald.attractIntensity;

  // Random change of direction for the Donald
  let change = random(); // Generate a random number between 0 and 1

  // Change direction 1% of the time
  if (change < 0.01) {
    // Choose random velocities within the "speed limit"
    donald.vx = random(-donald.speed, donald.speed);
    donald.vy = random(-donald.speed, donald.speed);
  }
  donald.x = donald.x + donald.vx;
  donald.y = donald.y + donald.vy;

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

        let d2 = dist(mails[mailIdx].x, mails[mailIdx].y, donald.x, donald.y);

        if (d2 < donald.repulsion) {
          if (mails[mailIdx].x + mails[mailIdx].img.width / 2 > donald.x + imgDonald.width / 2)
            mails[mailIdx].vx += ((donald.repulsion - d2) / donald.repulsionIntensity) ;
          else if (mails[mailIdx].x + mails[mailIdx].img.width / 2 < donald.x + imgDonald.width / 2)
            mails[mailIdx].vx -= ((donald.repulsion - d2) / donald.repulsionIntensity)  ;
          if (mails[mailIdx].y + mails[mailIdx].img.height / 2 > donald.y + imgDonald.height / 2)
            mails[mailIdx].vy += ((donald.repulsion - d2) / donald.repulsionIntensity) ;
          else if (mails[mailIdx].y + mails[mailIdx].img.height / 2 < donald.y + imgDonald.height / 2)
            mails[mailIdx].vy -= ((donald.repulsion - d2) / donald.repulsionIntensity) ;
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

// --------------------------------- //
// To start the simulation, click with the mouse
function mousePressed(){
  if (state === `title`){
    state = `simulation`;
  }
}
