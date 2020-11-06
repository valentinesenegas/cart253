// ---------- //

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
  constructor(president) {
    this.president = president;
  }
  draw() {}
}


class DanceMoveRight extends DanceMove {
  constructor(president, imgBack, imgFront, backHandDX, backHandDY, frontHandDX, frontHandDY) {
    super(president);
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
    image(this.imgBack, president.getX() + this.backHandDX, president.getY() + this.backHandDY);
    president.drawPresidentRight();
    image(this.imgFront, president.getX() + this.frontHandDX, president.getY() + this.frontHandDY);
    pop();
  }
}


class DanceMoveLeft extends DanceMove {
  constructor(president, imgBack, imgFront, backHandDX, backHandDY, frontHandDX, frontHandDY) {
    super(president);
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
    image(this.imgBack, president.getX() + this.backHandDX, president.getY() + this.backHandDY);
    president.drawPresidentLeft();
    image(this.imgFront, president.getX() + this.frontHandDX, president.getY() + this.frontHandDY);
    pop();
  }
}


// Split
class SplitDanceMove extends DanceMove {
  draw() {
    push();
    imageMode(CENTER);
    image(imgSplit, president.getX(), president.getY() + 60);
    pop();
  }
}

// Accordion
class AccordionDanceMove extends DanceMove {
  draw() {
    push();
    imageMode(CENTER);
    image(imgBodyPresidentLeft, president.getX(), president.getY());
    image(imgAccordion, president.getX(), president.getY() + 50);
    pop();
  }
}


// pointLeft & pointRight
class PointLeftDanceMove extends DanceMoveLeft {
  constructor(president) {
    super(president, imgClenchedFistBackLeft, imgPointLeft, -300, 0, -230, -100);
  }
}
class PointRightDanceMove extends DanceMoveRight {
  constructor(president) {
    super(president, imgRightArmNormal, imgPointRight, -20, -50, -140, -100);
  }
}


// punchLeft & punchRight
class PunchLeftDanceMove extends DanceMoveLeft {
  constructor(president) {
    super(president, imgClenchedFistBackLeft, imgClenchedFistFrontLeft, -300, -45, -75, -70);
  }
}
class PunchRightDanceMove extends DanceMoveRight {
  constructor(president) {
    super(president, imgClenchedFistBackRight, imgClenchedFistFrontRight, -10, -20, -110, -30);
  }
}


// clapLeft & clapRight
class ClapLeftDanceMove extends DanceMoveLeft {
  constructor(president) {
    super(president, imgOpenHandBackLeft, imgOpenHandFrontLeft, -200, -50, -160, -50);
  }
}
class ClapRightDanceMove extends DanceMoveRight {
  constructor(president) {
    super(president, imgOpenHandBackRight, imgOpenHandFrontRight, 10, -20, -130, -30);
  }
}
