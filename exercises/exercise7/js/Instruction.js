"use strict";

// Index constants for our instructions.
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
  constructor(imgInstruction, instructionIndex) {
    this.img = imgInstruction;
    this.instructionIndex = instructionIndex;
    this.startX = (instructionIndex < (maxInstructions / 2) ? instructionIndex * 87 + 10 : instructionIndex * 87 + 555);
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
    return this.instructionIndex;
  }

} // End of Instruction class

function createRandomInstruction() {
  let instructionIndex = Math.floor(random() * maxInstructions);
  return new Instruction(instructionImages[instructionIndex], instructionIndex);
}
