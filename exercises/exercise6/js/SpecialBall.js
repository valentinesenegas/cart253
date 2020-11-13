class SpecialBall extends Ball {

  constructor(x, y, note) {
    super(x, y, note);
    this.size = 20;
    this.vxMax = 20;
    this.vyMax = 20;
    this.incSize = 1;
    this.incSizeMax = 60;
    this.incSizeMin = 5;
    this.fill = {
      r: random(100, 150),
      g: random(120, 130),
      b: random(200, 220)
    };

    // Oscillator
    // Higher frequency than the normal balls
    this.oscillator = new p5.Oscillator();
    this.nearFreq = 2;
    this.farFreq = 400;
    this.oscillator.amp(0.025);
    this.oscillator.start();
  }

  playNote() {
    this.synth.play(this.note, 1, 0, 0.5);

    this.changeColor();
    this.increaseSize();
    this.increaseSpeed();

    // if (drumHit.isPlaying()) {
    //   drumHit.stop();
    // background(255, 0, 0);
    // } else {
    //     drumHit.play();
    //    drumHit.stop();
    //    background(0, 255, 0);
    // }
  }

  changeColor() {
    this.fill = {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255)
    };

    // background(random(240, 255), random(230, 255), random(225, 255));
  }

  increaseSize() {
    if (this.size > this.incSizeMax)
      this.incSize = -1;
    else if (this.size < this.incSizeMin)
      this.incSize = 1;
  this.size += this.incSize;
  }

  increaseSpeed() {
    this.vx = this.vxMax * (this.vx > 0 ? (this.size / this.incSizeMax) : -(this.size / this.incSizeMax));
    this.vy = this.vyMax * (this.vy > 0 ? (this.size / this.incSizeMax) : -(this.size / this.incSizeMax));

    // this.vx = this.vx * (this.size 1.2;
    // this.vy = this.vy * 1.2;
    //
    // if (Math.abs(this.vx) >= this.vxMax)
    //   this.vx = (this.vx > 0 ? this.vxMax : -this.vxMax);
    // if (Math.abs(this.vy) >= this.vyMax)
    //   this.vy = (this.vy > 0 ? this.vyMax : -this.vyMax);
  }


}
