"use strict;"

let strokeText;
let colorText;

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
    stroke(strokeText);
    strokeWeight(4);
    fill(colorText);
    text(this.text, this.startX, this.startY + this.offsetY);
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
  colorText = "#DD4E6C";
  strokeText = "#A00828";
  let message = Math.floor(Math.random() * missedMessages.length);
  addMessage(missedMessages[message]);
}

function createHitMessage() {
  colorText = "#144490";
  strokeText = "#002868";
  let message = Math.floor(Math.random() * hitMessages.length);
  addMessage(hitMessages[message]);

}

function drawMessages() {
  let message;
  for (message = 0; message < messages.length; message++) {
    messages[message].draw();
    if (messages[message].hasReachedLimit())
      messages.splice(message, 1);
  }
}
