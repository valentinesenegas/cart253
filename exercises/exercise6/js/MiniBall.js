class MiniBall extends Ball {

  constructor(x, y, note) {
    super(x, y, note);
    this.size = 10;
    this.fill = {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255)
    };

    // Oscillator
    // Higher frequency than the normal balls
    this.oscillator = new p5.Oscillator();
    this.nearFreq = 1000;
    this.farFreq = 2000;
    this.oscillator.amp(0.025);
    this.oscillator.start();
  }

}
