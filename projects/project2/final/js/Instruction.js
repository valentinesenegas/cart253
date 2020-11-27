"use strict";

// ID constants for our instructions.
let noInstructionId = -1;
let instructionPunchLeftId = 0;
let instructionClapLeftId = 1;
let instructionPointLeftId = 2;
let instructionAccordionId = 3;
let instructionSplitId = 4;
let instructionPointRightId = 5;
let instructionClapRightId = 6;
let instructionPunchRightId = 7;

// Number of instructions
let maxInstructions = 8;

// The array containing the images for the instructions
let instructionImages = [];

// Preload the images for the instructions
function preloadInstructions() {
  //  LEFT
  instructionImages.push(loadImage("assets/images/instructions/instruction-punch-left.png"));
  instructionImages.push(loadImage("assets/images/instructions/instruction-clap-left.png"));
  instructionImages.push(loadImage("assets/images/instructions/instruction-point-left.png"));
  instructionImages.push(loadImage("assets/images/instructions/instruction-accordion.png"));

  //  RIGHT
  instructionImages.push(loadImage("assets/images/instructions/instruction-split.png"));
  instructionImages.push(loadImage("assets/images/instructions/instruction-point-right.png"));
  instructionImages.push(loadImage("assets/images/instructions/instruction-clap-right.png"));
  instructionImages.push(loadImage("assets/images/instructions/instruction-punch-right.png"));
}

class Instruction {
  constructor(imgInstruction, instructionId) {
    this.img = imgInstruction;
    this.instructionId = instructionId;
    this.startX = (instructionId < (maxInstructions / 2) ? instructionId * 87 + 10 : instructionId * 87 + 555);
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

  getInstructionId() {
    return this.instructionId;
  }

} // End of Instruction class

function createRandomInstruction() {
  let instructionId = Math.floor(random() * maxInstructions);
  return new Instruction(instructionImages[instructionId], instructionId);
}

function createInstructionFromId(instructionId) {
  return new Instruction(instructionImages[instructionId], instructionId);
}
