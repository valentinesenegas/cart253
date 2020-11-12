class SpecialBall extends Ball {

  constructor(x, y, note) {
    super(x, y, note);
    this.size = 10;
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
    this.synth.play(this.note, 0.8, 0, 0.1);

       this.increaseSize();

       push();
       background(253, 222, 255);
       pop();


   // if (drumHit.isPlaying()) {
   //   drumHit.stop();
   // background(255, 0, 0);
   // } else {
   //     drumHit.play();
   //    drumHit.stop();
   //    background(0, 255, 0);
   // }
  }

  increaseSize() {
    this.size += 0.1;
  }

}
