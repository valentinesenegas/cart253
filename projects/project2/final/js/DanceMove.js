"use strict";

// ---------- //
// Images used for the dance moves

// At rest
let imgAtRest;

// Split
let imgSplit;

// Accordion
let imgAccordion;

// pointLeft & pointRight
let imgPointLeft;
let imgPointRight;
let imgRightArmNormal;

// punchLeft & punchRight
let imgClenchedFistFrontLeft;
let imgClenchedFistBackLeft;
let imgClenchedFistFrontRight;
let imgClenchedFistBackRight;

// clapLeft & clapRight
let imgOpenHandFrontLeft;
let imgOpenHandBackLeft;
let imgOpenHandFrontRight;
let imgOpenHandBackRight;


// ---------- //
// Preload the images and sounds
function preloadMoves() {
  // At rest.
  imgAtRest = loadImage("assets/images/at-rest.png");

  // Split
  imgSplit = loadImage("assets/images/split.png");

  // Accordion
  imgAccordion = loadImage("assets/images/accordion.png");

  // pointLeft & pointRight
  imgPointLeft = loadImage("assets/images/pointLeft.png");
  imgPointRight = loadImage("assets/images/pointRight1.png");
  imgRightArmNormal = loadImage("assets/images/rightArmNormal.png");

  // punchLeft & punchRight
  imgClenchedFistFrontLeft = loadImage("assets/images/clenchedFistFrontLeft.png");
  imgClenchedFistBackLeft = loadImage("assets/images/clenchedFistBackLeft.png");
  imgClenchedFistFrontRight = loadImage("assets/images/clenchedFistFront1.png");
  imgClenchedFistBackRight = loadImage("assets/images/clenchedFistBack1.png");

  // clapLeft & clapRight
  imgOpenHandFrontLeft = loadImage("assets/images/openHandFrontLeft.png");
  imgOpenHandBackLeft = loadImage("assets/images/openHandBackLeft.png");
  imgOpenHandFrontRight = loadImage("assets/images/openHandFront1.png");
  imgOpenHandBackRight = loadImage("assets/images/openHandBack1.png");
}

// ---------- //

class DanceMove {
  constructor(instructionIndex) {
    this.instructionIndex = instructionIndex;
    this.character = GetCharacter();
    this.timeToLive = 30;   // Draw the dance move during 30 frames.
  }

  draw() {
    if (this.timeToLive > 0)
      this.timeToLive--;
  }

  isFinished() {
    return (this.timeToLive <= 0);
  }

  verifyInstructionIndex(instructionIndexToVerify) {
    return (this.instructionIndex === instructionIndexToVerify);
  }

  setInstructionIndex(instructionIndexToSet) {
    this.instructionIndex = instructionIndexToSet;
  }

  getInstructionIndex() {
    return this.instructionIndex;
  }
}

// Dance moves on the right sides (5 to 8) - JKL keys
class DanceMoveRight extends DanceMove {
  constructor(instructionIndex, imgBack, imgFront, backHandDX, backHandDY, frontHandDX, frontHandDY) {
    super(instructionIndex);
    this.imgBack = imgBack;
    this.imgFront = imgFront;

    // Offset for animations on the right side
    this.backHandDX = backHandDX;
    this.backHandDY = backHandDY;
    this.frontHandDX = frontHandDX;
    this.frontHandDY = frontHandDY;
  }

  draw() {
    push();
    imageMode(CORNER);
    image(this.imgBack, this.character.getX() + this.backHandDX, this.character.getY() + this.backHandDY);
    this.character.drawCharacterRight();
    image(this.imgFront, this.character.getX() + this.frontHandDX, this.character.getY() + this.frontHandDY);
    pop();
    super.draw();
  }
}

// Dance moves on the left sides (1 to 4) - ASD keys
class DanceMoveLeft extends DanceMove {
  constructor(instructionIndex, imgBack, imgFront, backHandDX, backHandDY, frontHandDX, frontHandDY) {
    super(instructionIndex);
    this.imgBack = imgBack;
    this.imgFront = imgFront;

    // Offset for animations on the left side
    this.backHandDX = backHandDX;
    this.backHandDY = backHandDY;
    this.frontHandDX = frontHandDX;
    this.frontHandDY = frontHandDY;
  }

  draw() {
    push();
    imageMode(CORNER);
    image(this.imgBack, this.character.getX() + this.backHandDX, this.character.getY() + this.backHandDY);
    this.character.drawCharacterLeft();
    image(this.imgFront, this.character.getX() + this.frontHandDX, this.character.getY() + this.frontHandDY);
    pop();
    super.draw();
  }
}


// Split
class AtRestDanceMove extends DanceMove {
  draw() {
    push();
    imageMode(CENTER);
    image(imgAtRest, this.character.getX(), this.character.getY());
    pop();
    super.draw();
  }
}

// Split
class SplitDanceMove extends DanceMove {
  draw() {
    push();
    imageMode(CENTER);
    image(imgSplit, this.character.getX(), this.character.getY() + 60);
    pop();
    super.draw();
  }
}

// Accordion
class AccordionDanceMove extends DanceMove {
  draw() {
    push();
    imageMode(CENTER);
    image(imgBodyCharacterLeft, this.character.getX(), this.character.getY());
    image(imgAccordion, this.character.getX(), this.character.getY() + 50);
    pop();
    super.draw();
  }
}


// pointLeft & pointRight
class PointLeftDanceMove extends DanceMoveLeft {
  constructor(instructionIndex) {
    super(instructionIndex, imgClenchedFistBackLeft, imgPointLeft, -300, 0, -230, -100);
  }
}
class PointRightDanceMove extends DanceMoveRight {
  constructor(instructionIndex) {
    super(instructionIndex, imgRightArmNormal, imgPointRight, -20, -50, -140, -100);
  }
}


// punchLeft & punchRight
class PunchLeftDanceMove extends DanceMoveLeft {
  constructor(instructionIndex) {
    super(instructionIndex, imgClenchedFistBackLeft, imgClenchedFistFrontLeft, -300, -45, -75, -70);
  }
}
class PunchRightDanceMove extends DanceMoveRight {
  constructor(instructionIndex) {
    super(instructionIndex, imgClenchedFistBackRight, imgClenchedFistFrontRight, -10, -20, -110, -30);
  }
}


// clapLeft & clapRight
class ClapLeftDanceMove extends DanceMoveLeft {
  constructor(instructionIndex) {
    super(instructionIndex, imgOpenHandBackLeft, imgOpenHandFrontLeft, -200, -50, -160, -50);
  }
}
class ClapRightDanceMove extends DanceMoveRight {
  constructor(instructionIndex) {
    super(instructionIndex, imgOpenHandBackRight, imgOpenHandFrontRight, 10, -20, -130, -30);
  }
}


function createDanceMoveFromInput() {
  //temporary
  // If the B key is pressed, start song.
  if (keyIsDown(66))
  song.play();

  // Left side
  if (keyIsDown(keyA) && keyPressedA === false) {
    keyPressedA = true;
    return new PunchLeftDanceMove(instructionPunchLeftDanceMove);
  }
  else if (keyIsDown(keyS) && keyPressedS === false) {
    keyPressedS = true;
    return new ClapLeftDanceMove(instructionClapLeftDanceMove);
  }
  else if (keyIsDown(keyD) && keyPressedD === false) {
    keyPressedD = true;
    return new PointLeftDanceMove(instructionPointLeftDanceMove);
  }
  else if (keyIsDown(keyF) && keyPressedF === false) {
    keyPressedF = true;
    return new AccordionDanceMove(instructionAccordionDanceMove);
  }

  // Right side
  else if (keyIsDown(keyH) && keyPressedH === false) {
    keyPressedH = true;
    return new SplitDanceMove(instructionSplitDanceMove);
  }
  else if (keyIsDown(keyJ) && keyPressedJ === false) {
    keyPressedJ = true;
    return new PointRightDanceMove(instructionPointRightDanceMove);
  }
  else if (keyIsDown(keyK) && keyPressedK === false) {
    keyPressedK = true;
    return new ClapRightDanceMove(instructionClapRightDanceMove);
  }
  else if (keyIsDown(keyL) && keyPressedL === false) {
    keyPressedL = true;
    return new PunchRightDanceMove(instructionPunchRightDanceMove);
  }
  return null;
}
