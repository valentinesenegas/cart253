"use strict";

let noInstruction = -1;
let instructionPunchLeftDanceMove = 0;
let instructionClapLeftDanceMove = 1;
let instructionPointLeftDanceMove = 2;
let instructionAccordionDanceMove = 3;
let instructionSplitDanceMove = 4;
let instructionPointRightDanceMove = 5;
let instructionClapRightDanceMove = 6;
let instructionPunchRightDanceMove = 7;

// Number of instructions
let maxInstructions = 8;

// The array containing the images for the instructions
let instructionImages = [];

// Preload the images for the instructions
function preloadInstructions() {
  //  LEFT
  // punchLeft
  instructionImages.push(loadImage("assets/images/instructions/instruction-punch-left.png"));

  // clapLeft
  instructionImages.push(loadImage("assets/images/instructions/instruction-clap-left.png"));

  // pointLeft
  instructionImages.push(loadImage("assets/images/instructions/instruction-point-left.png"));

  // Accordion
  instructionImages.push(loadImage("assets/images/instructions/instruction-accordion.png"));

  //  RIGHT
  // Split
  instructionImages.push(loadImage("assets/images/instructions/instruction-split.png"));

  // pointRight
  instructionImages.push(loadImage("assets/images/instructions/instruction-point-right.png"));

  // clapRight
  instructionImages.push(loadImage("assets/images/instructions/instruction-clap-right.png"));

  // punchRight
  instructionImages.push(loadImage("assets/images/instructions/instruction-punch-right.png"));
}

class Instruction {
  constructor(imgInstruction, instruction) {
    this.img = imgInstruction;
    this.instruction = instruction;
    this.startX = (instruction < (maxInstructions / 2) ? instruction * 87 + 10 : instruction * 87 + 555);
    this.startY = 150;
    this.offsetY = 0;
    this.speedY = 2;
    this.limitY = 450;
  }

  draw() {
    push();
    tint(255, Math.min(255, (this.offsetY / (this.limitY / 2)) * 255));
    imageMode(CORNER);
    image(this.img, this.startX, this.startY + this.offsetY);
    this.offsetY += this.speedY;
    pop();
  }

  hasReachedLimit() {
    return this.offsetY >= this.limitY;
  }

  getInstructionIndex() {
    return this.instruction;
  }

} // End of Instruction class

function createRandomInstruction() {
  let instruction = Math.floor(random() * maxInstructions);
  return new Instruction(instructionImages[instruction], instruction);
}

// Setup instructions
