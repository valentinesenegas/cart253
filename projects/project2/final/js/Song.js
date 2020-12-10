"use strict;"

// Hit the Road Jack
let hitTheRoadJackFile;
let hitTheRoadJackCountdown = 2599;   // Countdown in milliseconds
let hitTheRoadJackTempo = (60 * 1000) / 86; // Beat per minute, converted to milliseconds per beat
let hitTheRoadJackDuration = 20000;
let hitTheRoadJackInstructionIds = [
    // First verse
    2, -1, 5, -1, 2, -1, 5, -1,

    1, -1, 6, -1, 1, -1,

    // What you say
    2, -1, // Point left

    // Second verse
    0, -1, 7, -1, 0, -1, 7, -1,

    1, -1, 6, -1, 1, -1, -1,

    // Chorus
    0, -1, 1, -1, 2, -1, 5, -1,

    // First verse
    0, -1, 1, -1, 2, -1, 5, -1,

    // Chorus
    0, -1, 7, -1, 0, -1, 7, -1, // Punch
    1, -1, 1, -1, 6, -1, 6, -1, // Clap

    // What you say
    -1, 0, -1,

    // Chorus
    0, -1, 1, -1, 2, -1, 6, -1, // Escalate
    0, -1, 7, -1, 0, -1, 7, -1, // Punch

    // End of song.
    -1
  ];

// -----------------------
// YMCA
let ymcaFile;
//let ymcaCountdown = 5999;   // Countdown in milliseconds
let ymcaCountdown = 7999;   // Countdown in milliseconds
let ymcaTempo = (60 * 1000) / 142; // Beat per minute, converted to milliseconds per beat
let ymcaDuration = 20000;
let ymcaInstructionIds = [
    // Intro
    0, -1, 0, 7, -1, 7,

    // First verse
    0, -1, 1, -1, 6, -1, 1, -1, 6, -1,

    // Chorus
    2, -1, 5, -1, 5,

    // There's no need to be
    0, -1, 1, -1, 6, -1, 1, -1, 6, -1,

    // Unhappy
    2, -1, 5, -1, 2, -1, 5, -1, 5, -1,

    // It's fun to stay at the Y.M.C.A. : Accordion 1
    1, -1, 1, -1, 3, -1, 3, -1,

    6, -1, 6, -1, -1, -1,

    // Accordion 2
    3, -1, 3,

    6, -1, 6, -1,

    // They have everything: Clap
    1, -1, 1, -1, 6, -1, 6, -1,

    1, -1, 1, -1, 6, -1, 6, -1,

    // It's fun to stay at the Y.M.C.A.
    1, -1, 1, -1, 3, -1, 3, -1,

    6, -1, 6, -1, 6, -1, 6, -1,

    1, -1, 1, -1, 6, -1, 6, -1,

    // You can get yourself clean: Clap
    1, -1, 1, -1, 6, -1, 6, -1,

    1, -1, 1, -1, 6, -1, 6, -1,

    // Punch and clap
    0, -1, 1, -1, 7, -1, 6,

    // End of song.
    -1
  ];


  // -----------------------
  // Straight Outta Compton
  let straightOuttaComptonFile;
  let straightOuttaComptonCountdown = 6999;   // Countdown in milliseconds
  let straightOuttaComptonTempo = (60 * 1000) / 102; // Beat per minute, converted to milliseconds per beat
  let straightOuttaComptonDuration = 20000;
  let straightOuttaComptonInstructionIds = [
      // Intro
      2, -1, 5, -1, 2, 4, 6,

      // First verse
      0, 0, 2, -1, 2, -1,

      // Chorus
      0, 1, 2, 5, 6, -1,

      // First verse
      6, 5, 2, 1, 0,

      // Point
      2, -1, 2, -1, 5, -1, 5, -1,

      // Punch
      0, -1, 0, -1, 7, -1, 7, -1,

      // Punch point
      0, -1, 2, -1, 7, -1, 5, -1,

      0, -1, 2, -1, 7, -1, 5, -1,

      // Clap
      1, -1, 1, -1, 6, -1, 6, -1,

      // Clap point
      1, -1, 2, -1, 5, -1, 6, -1,

      // Punch
      0, -1, 0, -1, 7, -1, 7, -1,

      // Punch
      0, -1, 0, -1, 7, -1, 7, -1,

      //
      // Punch
      0, -1, 0, -1, 7, -1, 4, -1,

      1, -1, 1, -1, 6, -1, 6, -1,

      // Point
      2, -1, 2, -1, 5, -1, 5, -1,

      2, -1, 4,

      // End of song.
      -1
    ];

  // -----------------------
  // Cotton Eye Joe
  let cottonEyeJoeFile;
  let cottonEyeJoeCountdown = 3999;   // Countdown in milliseconds
  let cottonEyeJoeTempo = (60 * 1000) / 132; // Beat per minute, converted to milliseconds per beat
  let cottonEyeJoeDuration = 20000;
  let cottonEyeJoeInstructionIds = [
      // Intro
      0, -1, 0, -1, 7, -1, 7, -1,

      // Where you from where did you go
      1, -1, 1, -1, 6, -1, 6, -1,

      // Chorus
      2, -1, 5, -1, 2, -1, 5,

      // Chorus
      0, -1, 0, -1, 7, -1, 7, -1,

      //
      1, -1, 6, -1, 1, -1, 6, -1,

      1, -1, 6, -1, 1, -1, 6, -1,

      0, -1, 0, -1, 7, -1, 7, -1,

      0, -1, 0, -1, 7, -1, 7, -1,

      // Accordion
      1, -1, 3, 3, 3, -1, 2, -1,

      3, 3, 3, -1, 7, -1, 7, -1,

      // Part 2
      2, -1, 2, -1, 5, -1, 5, -1, // Point

      1, -1, 1, -1, 6, -1, 6, -1, // Clap

      //
      // Chorus
      0, -1, 0, -1, 7, -1, 7, -1, // Punch

      0, -1, 0, -1, 7, -1, 4, -1, // Punch and split

      1, -1, 1, -1, 6, -1, 6, -1, // Clap

      1, -1, 1, -1, 6, -1, 6, -1, // Clap

      // Final split
      4,

      // End of song.
      -1
    ];


let songs = [];

function getSong(songId) {
  return songs[songId];
}

function preloadSongs() {
  soundFormats('mp3');

  hitTheRoadJackFile = loadSound('assets/sounds/hitTheRoadJack');
  ymcaFile = loadSound('assets/sounds/YMCA');
  straightOuttaComptonFile = loadSound('assets/sounds/straightOuttaCompton');
  cottonEyeJoeFile = loadSound('assets/sounds/cottonEyeJoe');
}

class Song {
  constructor(file, countdown, tempo, duration, instructionIds) {
    this.file = file;
    this.countdown = countdown;
    this.tempo = tempo;
    this.duration = duration;
    this.instructionIds = instructionIds;

    this.startTime = 0;
    this.pauseTime = 0;
    this.lastInstructionIdIndex = -1;
    this.total = 0;
    this.progress = 0;
    this.percentScoreHit = -1;   // -1 = no score yet for this song.
    this.incorrectMoves = 0;

    // Determine the total number of instructions.
    let index;
    for (index = 0; index < instructionIds.length; index++)
      if (this.instructionIds[index] >= 0)
        this.total++;
  }

  play() {
    this.file.play();
    this.lastInstructionIdIndex = -1;
    this.startTime = Date.now();
  }

  pause() {
    this.file.pause();
    this.pauseTime = Date.now();
  }

  resume() {
    this.startTime += (Date.now() - this.pauseTime);    // Update time with the duration of the pause.
    this.file.play();
  }

  stop(percentScoreHit, incorrectMoves) {
    this.file.stop();
    this.startTime = 0;
    this.pauseTime = 0;
    this.lastInstructionIdIndex = -1;
    this.progress = 0;
  }

  setScore(percentScoreHit, incorrectMoves) {
    this.percentScoreHit = percentScoreHit;
    this.incorrectMoves = incorrectMoves;
  }

  getPercentScoreHit() {
    return this.percentScoreHit;
  }

  getIncorrectMoves() {
    return this.incorrectMoves;
  }

  getCountdown() {
    return this.countdown;
  }

  getTempo() {
    return this.tempo;
  }

  getDuration() {
    return this.duration;
  }

  // Return instruction Id as a posivite value and -1 if there is no new instruction id.
  getNewInstructionId() {
    if (isGamePaused() == true)
      return -1;
    let timeElapsed = Date.now() - this.startTime;
    if (timeElapsed < this.countdown)
      return -1;  // Instructions are not available yet.
    let index = Math.floor((timeElapsed - this.countdown) / this.tempo);
    if (index >= this.instructionIds.length)
      return -1;  // End of song has been reached, there is no more instruction to return.

    // If index already used, do not return the new instruction ID.
    if (index == this.lastInstructionIdIndex)
      return -1;
    this.lastInstructionIdIndex = index;
    return this.instructionIds[index];
  }

  getTotalNumberOfInstructions() {
    return this.total;
  }

  increaseProgress() {
    this.progress++;
  }

  getProgress() {
    return this.progress;
  }
}

function setupSongs() {
  songs.push(new Song(hitTheRoadJackFile, hitTheRoadJackCountdown, hitTheRoadJackTempo, hitTheRoadJackDuration, hitTheRoadJackInstructionIds));   // song with Id 0
  songs.push(new Song(ymcaFile, ymcaCountdown, ymcaTempo, ymcaDuration, ymcaInstructionIds));   // song with Id 1
  songs.push(new Song(straightOuttaComptonFile, straightOuttaComptonCountdown, straightOuttaComptonTempo, straightOuttaComptonDuration, straightOuttaComptonInstructionIds));   // song with Id 2
  songs.push(new Song(cottonEyeJoeFile, cottonEyeJoeCountdown, cottonEyeJoeTempo, cottonEyeJoeDuration, cottonEyeJoeInstructionIds));   // song with Id 3
}
