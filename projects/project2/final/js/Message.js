"use strict;"

let messages = [];

// Messages when missed or successful move
let missedMessages = ["ZERO!", "WRONG!", "WEAK!", "REALLY BAD!", "LOSER!", "HORRIBLE!"];
let hitMessages = ["YUUUGE!", "SO SMART!", "TOUGH MOVE!", "CLASSY!", "TREMENDOUS!", "GREAT!"];

class Message {

  constructor(text, colorText, strokeText) {
    this.text = text;
    this.colorText = colorText;
    this.strokeText = strokeText;
    this.startX = 633;
    this.startY = 200;
    this.offsetY = 0;
    this.speedY = -2;
    this.limitY = -200;
  }

  draw() {
    push();
    textSize(56);
    textAlign(CENTER, CENTER);
    stroke(this.strokeText);
    strokeWeight(4);
    fill(this.colorText);
    text(this.text, this.startX, this.startY + this.offsetY);
    if (isGamePaused() == false)
      this.offsetY += this.speedY;
    pop();
  }

  hasReachedLimit() {
    return this.offsetY <= this.limitY;
  }
}

function addMessage(text, colorText, strokeText) {
  messages.push(new Message(text, colorText, strokeText));
}

function createMissedMessage() {
  let message = Math.floor(Math.random() * missedMessages.length);
  addMessage(missedMessages[message], "#DD4E6C", "#A00828");
}

function createHitMessage() {
  colorText = "#144490";
  strokeText = "#002868";
  let message = Math.floor(Math.random() * hitMessages.length);
  addMessage(hitMessages[message], "#144490", "#002868");
}

function drawMessages() {
  let message;
  for (message = 0; message < messages.length; message++) {
    messages[message].draw();
    if (messages[message].hasReachedLimit())
      messages.splice(message, 1);
  }
}

function resetMessages() {
  while (messages.length > 0)
    messages.splice(0, 1);    // Remove message from array.
}
