let imgBodyCharacterRight;
let imgBodyCharacterLeft;

// ---------- //
// Preload the images and sounds
function preloadCharacter() {
  imgBodyCharacterRight = loadImage("assets/images/bodyRight.png");
  imgBodyCharacterLeft = loadImage("assets/images/bodyLeft.png");
}

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
