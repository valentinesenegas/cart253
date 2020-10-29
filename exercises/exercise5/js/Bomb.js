// Cartoon vector created by freepik - www.freepik.com

class Bomb {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 10;
    this.size = 40;
    this.active = true;
  }

  gravity(force) {
    this.ay = this.ay + force;
  }

  move() {
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;

    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    if (this.y - this.size/2 > height) {
      this.active = false;
    }
  }

  explode(paddle) {
    if (this.x > paddle.x - paddle.width / 2 &&
      this.x < paddle.x + paddle.width / 2 &&
      this.y + this.size/2 > paddle.y - paddle.height/2 &&
      this.y - this.size/2 < paddle.y + paddle.height/2) {

// state lost

      // push();
      // textSize(65);
      // fill(65, 146, 240);
      // textAlign(CENTER, CENTER);
      // text(`You lost!`, width / 2, height / 2);
      // pop();

      // let dx = this.x - paddle.x;
      // this.vx = this.vx + map(dx, -paddle.width/2, paddle.width/2, -2, 2);
      //
      // this.vy = -this.vy;
      // this.ay = 0;
    }

  }

  display() {
    push();
    image(imgBomb, this.x, this.y);
    fill(255, 133, 82);
    stroke(0);
    ellipse(this.x, this.y, this.size);
    pop();
  }

}
