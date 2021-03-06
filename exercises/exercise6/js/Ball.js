class Ball {

  constructor(x, y, note) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.fill = {
      r: random(200, 255),
      g: random(200, 255),
      b: random(200, 255)
    };
    this.speed = 3;
    this.vx = random(-this.speed, this.speed);
    this.vy = random(-this.speed, this.speed);
    this.timeToLive = -1; // -1 = stays alive indefinitely.
    this.timeToLiveMax = 60 * 2; // auto destruct in 2 seconds.

    // Oscillator
    this.oscillator = new p5.Oscillator();
    this.nearFreq = 220;
    this.farFreq = 440;
    this.oscillator.amp(0.025);
    this.oscillator.start();

    // Synth
    this.note = note;
    this.synth = new p5.PolySynth();
    this.newFreq = 0;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    // Update frequency
    let d = dist(this.x, this.y, width / 2, height / 2);
    let maxDist = dist(0, 0, width / 2, height / 2);
    this.newFreq = map(d, 0, maxDist, this.nearFreq, this.farFreq);
    this.oscillator.freq(this.newFreq);
  }

  bounce() {
    if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
      this.vx = -this.vx;
      if (this.timeToLive === -1)
        this.playNote();
    }

    if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
      this.vy = -this.vy;
      if (this.timeToLive === -1)
        this.playNote();
    }
  }

  playNote() {
    this.synth.play(this.note, 0.4, 0, 0.1);
  }

  display() {
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b);
    if (this.timeToLive > 0) {
      ellipse(this.x, this.y, this.size * (this.timeToLive / this.timeToLiveMax));
      this.timeToLive--;
      this.newFreq = this.newFreq * 2;
      this.oscillator.freq(this.newFreq);
    } else
      ellipse(this.x, this.y, this.size);
    pop();
  }

  startSelfDestruct() {
    if (this.timeToLive === -1)
      this.timeToLive = this.timeToLiveMax;
  }

  // When the ball is destroyed, the sound stops.
  destroy() {
    this.oscillator.stop();
  }
}
