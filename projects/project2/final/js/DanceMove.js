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

// The dance move for the rest position.
let atRestDanceMove;

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

function setupDanceMove() {
  atRestDanceMove = new AtRestDanceMove(noInstructionId);  // -1 = not associated with an instruction.
}

function getRestDanceMove() {
  return atRestDanceMove;
}

// ---------- //

class DanceMove {
  constructor(instructionId) {
    this.instructionId = instructionId;
    this.character = GetCharacter();
    this.timeToLive = 30;   // Draw the dance move during 30 frames.
  }

  draw() {
    if (this.timeToLive > 0)
      this.timeToLive--;
  }

  isAnimationFinished() {
    return (this.timeToLive <= 0);
  }

  verifyInstructionId(instructionIdToVerify) {
    return (this.instructionId === instructionIdToVerify);
  }

  setInstructionId(instructionIdToSet) {
    this.instructionId = instructionIdToSet;
  }

  getInstructionId() {
    return this.instructionId;
  }
}

// Dance moves on the right sides (5 to 8) - JKL keys
class DanceMoveRight extends DanceMove {
  constructor(instructionId, imgBack, imgFront, backHandDX, backHandDY, frontHandDX, frontHandDY) {
    super(instructionId);
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
  constructor(instructionId, imgBack, imgFront, backHandDX, backHandDY, frontHandDX, frontHandDY) {
    super(instructionId);
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
  constructor(instructionId) {
    super(instructionId, imgClenchedFistBackLeft, imgPointLeft, -300, 0, -230, -100);
  }
}
class PointRightDanceMove extends DanceMoveRight {
  constructor(instructionId) {
    super(instructionId, imgRightArmNormal, imgPointRight, -20, -50, -140, -100);
  }
}


// punchLeft & punchRight
class PunchLeftDanceMove extends DanceMoveLeft {
  constructor(instructionId) {
    super(instructionId, imgClenchedFistBackLeft, imgClenchedFistFrontLeft, -300, -45, -75, -70);
  }
}
class PunchRightDanceMove extends DanceMoveRight {
  constructor(instructionId) {
    super(instructionId, imgClenchedFistBackRight, imgClenchedFistFrontRight, -10, -20, -110, -30);
  }
}


// clapLeft & clapRight
class ClapLeftDanceMove extends DanceMoveLeft {
  constructor(instructionId) {
    super(instructionId, imgOpenHandBackLeft, imgOpenHandFrontLeft, -200, -50, -160, -50);
  }
}
class ClapRightDanceMove extends DanceMoveRight {
  constructor(instructionId) {
    super(instructionId, imgOpenHandBackRight, imgOpenHandFrontRight, 10, -20, -130, -30);
  }
}

// Arrow keys and their keyCodes
let keyA = 65;
let keyS = 83;
let keyD = 68;
let keyF = 70;

let keyH = 72;
let keyJ = 74;
let keyK = 75;
let keyL = 76;


// USER INPUT with arrow keys
let keyPressedA = false;
let keyPressedS = false;
let keyPressedD = false;
let keyPressedF = false;
let keyPressedH = false;
let keyPressedJ = false;
let keyPressedK = false;
let keyPressedL = false;


function createDanceMoveFromInput() {
  // Left side
  if (keyIsDown(keyA) && keyPressedA === false) {
    keyPressedA = true;
    return new PunchLeftDanceMove(instructionPunchLeftId);
  }
  else if (keyIsDown(keyS) && keyPressedS === false) {
    keyPressedS = true;
    return new ClapLeftDanceMove(instructionClapLeftId);
  }
  else if (keyIsDown(keyD) && keyPressedD === false) {
    keyPressedD = true;
    return new PointLeftDanceMove(instructionPointLeftId);
  }
  else if (keyIsDown(keyF) && keyPressedF === false) {
    keyPressedF = true;
    return new AccordionDanceMove(instructionAccordionId);
  }

  // Right side
  else if (keyIsDown(keyH) && keyPressedH === false) {
    keyPressedH = true;
    return new SplitDanceMove(instructionSplitId);
  }
  else if (keyIsDown(keyJ) && keyPressedJ === false) {
    keyPressedJ = true;
    return new PointRightDanceMove(instructionPointRightId);
  }
  else if (keyIsDown(keyK) && keyPressedK === false) {
    keyPressedK = true;
    return new ClapRightDanceMove(instructionClapRightId);
  }
  else if (keyIsDown(keyL) && keyPressedL === false) {
    keyPressedL = true;
    return new PunchRightDanceMove(instructionPunchRightId);
  }
  return null;
}


function keyReleased() {
  // Detect released keys.
  // Left side
  if (keyCode == keyA)
    keyPressedA = false;
  else if (keyCode == keyS)
    keyPressedS = false;
  else if (keyCode == keyD)
    keyPressedD = false;
  else if (keyCode == keyF)
    keyPressedF = false;

  // Right side
  else if (keyCode == keyH)
    keyPressedH = false;
  else if (keyCode == keyJ)
    keyPressedJ = false;
  else if (keyCode == keyK)
    keyPressedK = false;
  else if (keyCode == keyL)
    keyPressedL = false;
}
