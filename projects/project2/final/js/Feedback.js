"use strict";

// Feedback on hit, missed and incorrect moves.
let feedbacks = [];

class Feedback {
  constructor(instructionIndex) {
    this.instructionIndex = instructionIndex;
    this.x = (instructionIndex < (maxInstructions / 2) ? instructionIndex * 87 + 15 : instructionIndex * 87 + 555);
    this.y = 600;
    this.timeToLive = 60;
  }

  draw() {
    this.timeToLive--;
  }

  hasReachedEndOfLife() {
    return (this.timeToLive <= 0);
  }
} // End of Feedback class

class HitFeedback extends Feedback {
  draw() {
    super.draw();
    push();
    stroke('green');
    strokeWeight(10);
    noFill();
    ellipse(this.x + 50, this.y + 56, 67);
    pop();
  }
}

class MissedFeedback extends Feedback {
  draw() {
    super.draw();
    push();
    stroke('black');
    strokeWeight(10);
    line(this.x + 25, this.y + 35, this.x + 70, this.y + 85);
    line(this.x + 25, this.y + 85, this.x + 70, this.y + 35);
    pop();
  }
}

class IncorrectFeedback extends Feedback {
  draw() {
    super.draw();
    push();
    stroke('red');
    strokeWeight(10);
    line(this.x + 25, this.y + 35, this.x + 70, this.y + 85);
    line(this.x + 25, this.y + 85, this.x + 70, this.y + 35);
    pop();
  }
}

function drawFeedbacks() {
  // Draw feedbacks
  let feedback;
  for (feedback = 0; feedback < feedbacks.length; feedback++)
    feedbacks[feedback].draw();
  for (feedback = feedbacks.length - 1; feedback >= 0; feedback--) {
    if (feedbacks[feedback].hasReachedEndOfLife())
      feedbacks.splice(feedback, 1);
  }
}


function createFeedbackForIncorrectMove(instructionId) {
  feedbacks.push(new IncorrectFeedback(instructionId));
}

function createFeedbackForHitMove(instructionId) {
  feedbacks.push(new HitFeedback(instructionId));
}

function createFeedbackForMissedMove(instructionId) {
  feedbacks.push(new MissedFeedback(instructionId));
}
