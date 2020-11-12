class SpecialBall extends Ball {

  constructor(x, y, note) {
    super(x, y, note);
    this.size = 20;
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

    background(random(240, 255), random(230, 255), random(225, 255))
  }

  increaseSize() {
    this.size += 1;

    if (this.size > 60) {
      this.size = 20;
    }
  }

  increaseSpeed() {
    this.speed += 20;
  }


}
