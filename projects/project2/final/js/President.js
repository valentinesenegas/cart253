let imgBodyPresidentRight;
let imgBodyPresidentLeft;

// ---------- //
// Preload the images and sounds
function preloadPresident() {
  imgBodyPresidentRight = loadImage("assets/images/bodyRight.png");
  imgBodyPresidentLeft = loadImage("assets/images/bodyLeft.png");
}

class President {
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

  // Displays only the body of president
  drawPresidentRight() {
    push();
    imageMode(CENTER);
    image(imgBodyPresidentRight, president.x, president.y);
    pop();
  }

  drawPresidentLeft() {
    push();
    imageMode(CENTER);
    image(imgBodyPresidentLeft, president.x, president.y);
    pop();
  }
}
