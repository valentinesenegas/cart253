let mic;

function setupMic() {
  mic = new p5.AudioIn();
  mic.start();
}

class MicBall extends Ball {

  constructor(x, y, note) {
    super(x, y, note);
    this.size = 10;
    this.sizeMax = 150;
    this.vxMax = 50;
    this.fill = {
      r: random(80, 90),
      g: random(80, 90),
      b: random(240, 250)
    };
  }

  move() {
    this.x += this.vx * (mic.getLevel() * this.vxMax);
    this.y += this.vy * (mic.getLevel() * this.vxMax);

    // Update frequency
    let d = dist(this.x, this.y, width / 2, height / 2);
    let maxDist = dist(0, 0, width / 2, height / 2);
    let newFreq = map(d, 0, maxDist, this.nearFreq, this.farFreq);
    this.oscillator.freq(newFreq);
  }

  display() {
    this.size = (mic.getLevel() + 0.1) * this.sizeMax;
    super.display();
  }
}
