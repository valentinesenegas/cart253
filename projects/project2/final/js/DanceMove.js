"use strict";

// ---------- //
// Images used for the dance moves

// At rest
let imgAtRest;

// Split
let imgSplit1;
let imgSplit2;
let imgSplit3;

// Accordion
let imgAccordion1;
let imgAccordion2;
let imgAccordion3;

// pointLeft & pointRight
let imgPointLeft1;
let imgPointLeft2;
let imgPointRight1;
let imgPointRight2;
let imgRightArmNormal;

// punchLeft & punchRight
// Left
let imgClenchedFistFrontLeft1;
let imgClenchedFistBackLeft1;
let imgClenchedFistFrontLeft2;
let imgClenchedFistBackLeft2;
// Right
let imgClenchedFistFrontRight1;
let imgClenchedFistBackRight1;
let imgClenchedFistFrontRight2;
let imgClenchedFistBackRight2;

// clapLeft & clapRight
let imgOpenHandFrontLeft1;
let imgOpenHandBackLeft1;
let imgOpenHandFrontLeft2;
let imgOpenHandBackLeft2;

let imgOpenHandFrontRight1;
let imgOpenHandBackRight1;
let imgOpenHandFrontRight2;
let imgOpenHandBackRight2;

// Left and right dance move.
let leftDanceMove = 1;
let rightDanceMove = 2;

// The dance move for the rest position.
let atRestDanceMove;

let danceMoveDuration = 30;

// ---------- //
// Preload the images and sounds
function preloadMoves() {
  // At rest.
  imgAtRest = loadImage("assets/images/at-rest.png");

  // Split
  imgSplit1 = loadImage("assets/images/split1.png");
  imgSplit2 = loadImage("assets/images/split2.png");
  imgSplit3 = loadImage("assets/images/split3.png");

  // Accordion
  imgAccordion1 = loadImage("assets/images/accordion.png");
  imgAccordion2 = loadImage("assets/images/accordion2.png");
  imgAccordion3 = loadImage("assets/images/accordion3.png");

  // pointLeft & pointRight
  imgPointLeft1 = loadImage("assets/images/pointLeft1.png");
  imgPointLeft2 = loadImage("assets/images/pointLeft2.png");
  imgPointRight1 = loadImage("assets/images/pointRight1.png");
  imgPointRight2 = loadImage("assets/images/pointRight2.png");
  imgRightArmNormal = loadImage("assets/images/rightArmNormal.png");

  // punchLeft & punchRight
  // Left
  imgClenchedFistFrontLeft1 = loadImage("assets/images/clenchedFistFrontLeft1.png");
  imgClenchedFistBackLeft1 = loadImage("assets/images/clenchedFistBackLeft1.png");
  imgClenchedFistFrontLeft2 = loadImage("assets/images/clenchedFistFrontLeft2.png");
  imgClenchedFistBackLeft2 = loadImage("assets/images/clenchedFistBackLeft2.png");
  // Right
  imgClenchedFistFrontRight1 = loadImage("assets/images/clenchedFistFront1.png");
  imgClenchedFistBackRight1 = loadImage("assets/images/clenchedFistBack1.png");
  imgClenchedFistFrontRight2 = loadImage("assets/images/clenchedFistFrontRight2.png");
  imgClenchedFistBackRight2 = loadImage("assets/images/clenchedFistBackRight2.png");

  // clapLeft & clapRight
  imgOpenHandFrontLeft1 = loadImage("assets/images/openHandFrontLeft.png");
  imgOpenHandBackLeft1 = loadImage("assets/images/openHandBackLeft.png");
  imgOpenHandFrontLeft2 = loadImage("assets/images/openHandFrontLeft2.png");
  imgOpenHandBackLeft2 = loadImage("assets/images/openHandBackLeft2.png");

  imgOpenHandFrontRight1 = loadImage("assets/images/openHandFront1.png");
  imgOpenHandBackRight1 = loadImage("assets/images/openHandBack1.png");
  imgOpenHandFrontRight2 = loadImage("assets/images/openHandFrontRight2.png");
  imgOpenHandBackRight2 = loadImage("assets/images/openHandBackRight2.png");
}

function setupDanceMove() {
  atRestDanceMove = new AtRestDanceMove(noInstructionId);  // -1 = not associated with an instruction.
}

function getRestDanceMove() {
  return atRestDanceMove;
}

function getDanceMoveDuration() {
  return danceMoveDuration;
}

// ---------- //

class DanceMove {
  constructor(instructionId) {
    this.instructionId = instructionId;
    this.character = GetCharacter();
    this.timeToLive = danceMoveDuration;   // Draw the dance move during 30 frames.
  }

  draw() {
    if (isGamePaused() == false && this.timeToLive > 0)
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
// Dance moves on the left sides (1 to 4) - ASD keys
class BasicDanceMove extends DanceMove {
  constructor(instructionId, leftOrRight,
      imgBack1, imgFront1, backHandDX1, backHandDY1, frontHandDX1, frontHandDY1,
      imgBack2, imgFront2, backHandDX2, backHandDY2, frontHandDX2, frontHandDY2) {
    super(instructionId);
    this.leftOrRight = leftOrRight;
    this.imgBack1 = imgBack1;
    this.imgBack2 = imgBack2;
    this.imgFront1 = imgFront1;
    this.imgFront2 = imgFront2;

    // Offset for animations on the right side
    this.backHandDX1 = backHandDX1;
    this.backHandDY1 = backHandDY1;
    this.frontHandDX1 = frontHandDX1;
    this.frontHandDY1 = frontHandDY1;
    this.backHandDX2 = backHandDX2;
    this.backHandDY2 = backHandDY2;
    this.frontHandDX2 = frontHandDX2;
    this.frontHandDY2 = frontHandDY2;
  }

  draw() {
    push();
    imageMode(CORNER);
    if (this.timeToLive >= 15)
      image(this.imgBack1, this.character.getX() + this.backHandDX1, this.character.getY() + this.backHandDY1);
    else
      image(this.imgBack2, this.character.getX() + this.backHandDX2, this.character.getY() + this.backHandDY2);
    if (this.leftOrRight == leftDanceMove)
      this.character.drawCharacterLeft();
    else
      this.character.drawCharacterRight();
    if (this.timeToLive >= 15)
      image(this.imgFront1, this.character.getX() + this.frontHandDX1, this.character.getY() + this.frontHandDY1);
    else
      image(this.imgFront2, this.character.getX() + this.frontHandDX2, this.character.getY() + this.frontHandDY2);
    pop();
    super.draw();
  }
}

// At Rest
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
  constructor(instructionId) {
    super(instructionId);
    this.timeToLive = 50;
  }

  draw() {
    push();
    imageMode(CENTER);
    if (this.timeToLive >= 40)
      image(imgSplit1, this.character.getX(), this.character.getY());
    else if (this.timeToLive >= 30)
      image(imgSplit2, this.character.getX(), this.character.getY() + 10);
    else if (this.timeToLive >= 10)
      image(imgSplit3, this.character.getX(), this.character.getY() + 60 + 30 - this.timeToLive);
    else
      image(imgSplit3, this.character.getX(), this.character.getY() + 60 + 10);
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

    if (this.timeToLive >= 20)
      image(imgAccordion1, this.character.getX(), this.character.getY() + 50);
    else if (this.timeToLive >= 10)
      image(imgAccordion2, this.character.getX(), this.character.getY() + 50);
    else
      image(imgAccordion3, this.character.getX(), this.character.getY() + 50);
    pop();
    super.draw();
  }
}


// pointLeft & pointRight
class PointLeftDanceMove extends BasicDanceMove {
   constructor(instructionId) {
     super(instructionId, leftDanceMove,
       imgClenchedFistBackLeft1, imgPointLeft1, -230,  -20, -230, -90,
       imgClenchedFistBackLeft2, imgPointLeft2, -230, -10, -230, -30);
   }
}
class PointRightDanceMove extends BasicDanceMove {
   constructor(instructionId) {
     super(instructionId, rightDanceMove,
     imgRightArmNormal, imgPointRight1, -50, -45, -150, -70,
     imgRightArmNormal, imgPointRight2, -50, -45, -130, -30);
   }
}


// punchLeft & punchRight
class PunchLeftDanceMove extends BasicDanceMove {
  constructor(instructionId) {
    super(instructionId, leftDanceMove,
      imgClenchedFistBackLeft1, imgClenchedFistFrontLeft1, -300,  -45, -100, -45,
      imgClenchedFistBackLeft2, imgClenchedFistFrontLeft2,  -215,  -70, -150, -70);
  }
}
class PunchRightDanceMove extends BasicDanceMove {
  constructor(instructionId) {
    super(instructionId, rightDanceMove,
    imgClenchedFistBackRight1, imgClenchedFistFrontRight1,  -10, -20,  -110, -30,
    imgClenchedFistBackRight2, imgClenchedFistFrontRight2, -110, -30, -110, -30);
  }
}


// clapLeft & clapRight
class ClapLeftDanceMove extends BasicDanceMove {
  constructor(instructionId) {
    super(instructionId, leftDanceMove,
      imgOpenHandBackLeft2, imgOpenHandFrontLeft2, -160, -50, -160, -40,
      imgOpenHandBackLeft1, imgOpenHandFrontLeft1, -200, -50, -170, -50);
  }
}
class ClapRightDanceMove extends BasicDanceMove {
  constructor(instructionId) {
    super(instructionId, rightDanceMove,
    imgOpenHandBackRight1, imgOpenHandFrontRight1,  +10, -50,  -130, -50,
    imgOpenHandBackRight2, imgOpenHandFrontRight2, +30, -50, -130, -50);
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
