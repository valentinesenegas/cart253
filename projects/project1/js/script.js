"use strict";
/**************************************************
Project 1: Save Democracy
Valentine Sénégas

Collect the mails (votes) before time runs out!
Beware, the Donald scares the mails!
Use the arrow keys to move around.
You have one minute to collect 30 mails.
**************************************************/

// ---- Global Variables ---- //

// MailMan
let imgMailman;
let mailman = {
  x: 0,
  y: 0,
  vx: 1,
  vy: 1,
  speed: 5,
};

// The Donald
let imgDonald;
let donald = {
  x: 0,
  y: 0,
  vx: 1,
  vy: 1,
  speed: 2,
  attract: 300,
  attractIntensity: 2,
  repulsion: 400,
  repulsionIntensity: 4,
};

// Mail
let mailParam = {
  initVX: 3,
  initVY: 3,
  minVX: 1,
  minVY: 1,
  maxVX: 4,
  maxVY: 4,
};
let mails = Array();

// Number of mails that the mailman will have to catch and current score
const mailCount = 30;
let score = 0;

// Time allowed to collect the mail in seconds and start time
const timeAllowed = 60;
let startTime;

//Images used in the Title state
let imgLotsOfMails;
let imgBigDonaldStealsMail;
let imgbigMailman;

// Images when winning (win state)
let imgBigMailmanHappy;
let imgBigDonaldSad;

// Images when loosing (lost state)
let imgBigMailmanSad;
let imgBigDonaldHappy;

// Background during the game
let bg;

// Initial background
let bgLight = {
  r: 186,
  g: 219,
  b: 250,
};

// Background when lost
let bgDark = {
  r: 36,
  g: 36,
  b: 36,
};

// Font used by the program
let myFont;

// Music
let musicSimulation;
let musicHappyEnd;
let musicSadEnd;

// Variable that contains the current state.
// The states are:
//  - title: this is the start screen that explains the game.
//  - simulation: this is the main loop of the game.
//  - win: the player wins.
//  - lost: the player lost / the Donald wins.
let state = `title`;  // Can be title, simulation, win or lost


// ---- Functions ---- //

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
    caught: false
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
  imgLotsOfMails = loadImage("assets/images/lotsofmails.png");
  imgbigMailman = loadImage("assets/images/bigmailman.png");

  // "Win" state
  imgBigDonaldSad = loadImage("assets/images/bigdonaldsad.png");
  imgBigMailmanHappy = loadImage("assets/images/bigmailmanhappy.png");

  // "Lost" state
  imgBigDonaldHappy = loadImage("assets/images/bigdonaldhappy.png");
  imgBigMailmanSad = loadImage("assets/images/bigmailmansad.png");

  // Google Font: Secular One
  myFont = loadFont("assets/fonts/SecularOne-Regular.ttf");

  // Music and sounds
  musicSimulation = loadSound(`assets/sounds/Kubbi - Up In My Jam.mp3`);
  musicHappyEnd = loadSound(`assets/sounds/Tristan Lohengrin - Happy.mp3`);
  musicSadEnd = loadSound(`assets/sounds/Sad Violin.mp3`);
}

// setup()
//
// Creation of the canvas, position of the mails
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(myFont);
  setupMails();
  setupCharacters();
  bg = bgLight;
}

// setupMails()
//
// Creation of the mails at random positions going in random directions at random speed! So much randomness...
function setupMails() {
  // Create mails
  for (let mailIdx = 0; mailIdx < mailCount; mailIdx++) {
    // Position
    mails[mailIdx].x = random(mails[mailIdx].img.width / 2, width - mails[mailIdx].img.width / 2);
    mails[mailIdx].y = random(mails[mailIdx].img.height / 2, height - mails[mailIdx].img.height / 2);

    // Speed
    mails[mailIdx].vx = random(-mailParam.initVX, mailParam.initVX);
    mails[mailIdx].vy = random(-mailParam.initVY, mailParam.initVY);

    // Mail is not caught yet.
    mails[mailIdx].caught = false;
  }
}

// setupCharacters()
//
// Creation of the mailman and the Donald, and position them at opposite corners
function setupCharacters() {
  // Put the mailman in the top left corner of the screen
  mailman.x = (width / 10);
  mailman.y = (height / 10);

  // Put the Donald in the bottom right corner of the screen
  donald.x = (width / 10) * 9 - imgDonald.width;
  donald.y = (height / 10) * 9 - imgDonald.height;
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

  // Check input from the user
  checkKeys();
}

//--------- States --------//

// title()
//
// This is the start screen that explains the game.
function title() {
  bg = bgLight;

  push();
  // Title "Save democracy!"
  textSize(65);
  fill(65, 146, 240);
  textAlign(CENTER, CENTER);
  text(`Save democracy!`, width / 2, height / 2);

  // Images of characters and mails
  imageMode(CORNER);
  image(imgLotsOfMails, width / 4, 0);
  image(imgBigDonaldStealsMail, width - imgBigDonaldStealsMail.width, height - imgBigDonaldStealsMail.height);
  image(imgbigMailman, 0, height - imgbigMailman.height);

  // Instructions
  textSize(35);
  fill(42, 94, 155);
  text(`Catch the mails before it's too late! \n Press Enter to start`, width / 2, height / 1.25);
  pop();
}

// simulation()
//
// This is the main loop of the game.
function simulation() {
  display();
  displayTime(); // Display the time left
  move(); // Movement of the Donald
  checkMailCatch(); // Check if the mailman catches mail
  tryMusicSimulation();

  bg = bgLight;
}

// democracySaved()
//
// When winning the game - `Win` state
function democracySaved() {
  bg = bgLight;

  push();
  textSize(64);
  fill(42, 94, 155);
  textAlign(CENTER, CENTER);
  text(`You saved democracy!`, width / 2, height / 2);

  textSize(35);
  text(`Press Enter to play again`, width / 2, height / 1.25);

  imageMode(CORNER);
  image(imgBigDonaldSad, width - imgBigDonaldSad.width, height - imgBigDonaldSad.height);
  image(imgBigMailmanHappy, 0, height - imgBigMailmanHappy.height);
  pop();

  // Happy music!
  tryMusicHappyEnd();
}

// donaldWon()
//
// When loosing the game - `lost` state
function donaldWon() {
  // The background turns dark...
  bg = bgDark;

  push();
  textSize(64);
  fill(150, 150, 255);
  textAlign(CENTER, CENTER);
  text(`The Donald won...`, width / 2, height / 2);

  textSize(35);
  fill(255, 255, 255);
  text(`Press Enter to play again`, width / 2, height / 1.25);

  imageMode(CORNER);
  image(imgBigDonaldHappy,width - imgBigDonaldHappy.width, height - imgBigDonaldHappy.height);
  image(imgBigMailmanSad, 0, height - imgBigMailmanSad.height);
  pop();

  // A sad music starts playing dramatically
  tryMusicSadEnd();
}

// displayTime()
//
// Display the remaining time to collect the mails
function displayTime() {
  let remainingTime = timeAllowed - (Date.now() - startTime) / 1000;

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
    if (mails[mailIdx].caught === false)
      image(mails[mailIdx].img, mails[mailIdx].x, mails[mailIdx].y);
}

// checkMailCatch()
//
// Check if the mailman catches a mail by looking at their respective positions
function checkMailCatch() {
  for (let mailIdx = 0; mailIdx < mailCount; mailIdx++) {
    if (mails[mailIdx].caught === false) {
      if (
        mailman.x < mails[mailIdx].x + mails[mailIdx].img.width &&
        mailman.x + imgMailman.width > mails[mailIdx].x &&
        mailman.y < mails[mailIdx].y + mails[mailIdx].img.height &&
        mailman.y + imgMailman.height > mails[mailIdx].y
      ) {
        // Collision detected:
        // The mail disappears and the score is incremented by 1.
        mails[mailIdx].caught = true;
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

  mailman.x = constrain(
    mailman.x,
    0 + imgMailman.width / 2,
    width - imgMailman.width / 2
  );
  mailman.y = constrain(
    mailman.y,
    0 + imgMailman.height / 2,
    height - imgMailman.height / 2
  );

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
    if (mails[mailIdx].caught === false) {
      // Check screen limits.
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

      // Be sure not to overspeed (because we don't like tickets)
      if (mails[mailIdx].vx > 0 && mails[mailIdx].vx > mailParam.maxVX)
        mails[mailIdx].vx = mailParam.maxVX;
      else if (mails[mailIdx].vx < 0 && mails[mailIdx].vx < -mailParam.maxVX)
        mails[mailIdx].vx = -mailParam.maxVX;
      if (mails[mailIdx].vy > 0 && mails[mailIdx].vy > mailParam.maxVY)
        mails[mailIdx].vy = mailParam.maxVY;
      else if (mails[mailIdx].vy < 0 && mails[mailIdx].vy < -mailParam.maxVY)
        mails[mailIdx].vy = -mailParam.maxVY;

      // Be sure that we have at least the minimal speed
      if (mails[mailIdx].vx === 0)
        mails[mailIdx].vx = mails[mailIdx].minVX * (Random(-1, 1) > 0 ?  1 : -1);
      if (mails[mailIdx].vy === 0)
        mails[mailIdx].vy = mails[mailIdx].minVY * (Random(-1, 1) > 0 ?  1 : -1);

      // Update position with current speed
      mails[mailIdx].x += mails[mailIdx].vx;
      mails[mailIdx].y += mails[mailIdx].vy;
    }
  }
}

// --------------------------------------------- //
//  USER CONTROLS  //

// checkKeys()
//
// Checks if the user presses down on a key
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

// To start the simulation, press the ENTER key
  if (keyIsDown(ENTER)) {
    if (state === `title`) {
      state = `simulation`;
      startTime = Date.now();
    } else if (state === `win`) {
      state = `simulation`;
      setupMails();
      setupCharacters();
      score = 0;
      startTime = Date.now();
    } else if (state === `lost`) {
      state = `simulation`;
      setupMails();
      setupCharacters();
      score = 0;
      startTime = Date.now();
    }
  }
}



//--------- Music --------//
// Music for the simulation
function tryMusicSimulation() {
  // If the player plays again, stop the music from the last ending
  pauseMusicEnd();

  // Play music if the music is not already playing
  if (!musicSimulation.isPlaying()) {
    musicSimulation.loop();
  }
}

// Music Happy ending
function tryMusicHappyEnd() {
  // Stop the music from the simulation
  pauseMusicSimulation();

  // Play music if the music is not already playing
  if (!musicHappyEnd.isPlaying()) {
    musicHappyEnd.loop();
  }
}

// Music Sad ending
function tryMusicSadEnd() {
  // Stop the music from the simulation
  pauseMusicSimulation();

  // Play music if the music is not already playing
  if (!musicSadEnd.isPlaying()) {
    musicSadEnd.loop();
  }
}

function pauseMusicEnd() {
  // Stop the music from the sad end
  if (musicSadEnd.isPlaying()) {
    musicSadEnd.pause();
  }

  // Stop the music from the happy end
  if (musicHappyEnd.isPlaying()) {
    musicHappyEnd.pause();
  }
}

function pauseMusicSimulation() {
  // Stop the music from the simulation
  if (musicSimulation.isPlaying()) {
    musicSimulation.pause();
  }
}
