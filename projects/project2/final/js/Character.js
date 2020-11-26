"use strict;"

// Our main and beloved character.
let character = null;

// Images for the character.
let imgBodyCharacterRight;
let imgBodyCharacterLeft;

// ---------- //
// Preload the images and sounds
function preloadCharacter() {
  imgBodyCharacterRight = loadImage("assets/images/bodyRight2.png");
  imgBodyCharacterLeft = loadImage("assets/images/bodyLeft2.png");
}

// Class for the character.
class Character {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  // Displays only the body of the character
  drawCharacterRight() {
    push();
    imageMode(CENTER);
    image(imgBodyCharacterRight, this.x, this.y);
    pop();
  }

  drawCharacterLeft() {
    push();
    imageMode(CENTER);
    image(imgBodyCharacterLeft, this.x, this.y);
    pop();
  }
}

function GetCharacter() {
  if (character == null)
    character = new Character();
  return character;
}
