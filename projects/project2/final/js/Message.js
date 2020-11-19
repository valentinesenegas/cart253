"use strict;"

let messages = [];

class Message {

  constructor(text) {
    this.text = text;
    this.startX = 600;
    this.startY = 300;
    this.offsetY = 0;
    this.speedY = -2;
    this.limitY = -200;
  }

  draw() {
    push();
    textSize(36);
    textAlign(LEFT, CENTER);
    fill(221, 78, 108);
    text(this.text, this.startX, this.startY + this.offsetY);
    this.offsetY += this.speedY;
    pop();
  }

  hasReachedLimit() {
    return this.offsetY <= this.limitY;
  }
}

function addMessage(text) {
  messages.push(new Message(text));
}

function drawMessages() {
  let message;
  for (message = 0; message < messages.length; message++) {
    messages[message].draw();
    if (messages[message].hasReachedLimit())
      messages.splice(message, 1);
  }
}
