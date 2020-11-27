"use strict;"

let ymcaFile;
let ymcaDelay = 1000;
let ymcaTempo = (60 * 1000) / 96; //  beat per minute, converted to milliseconds per beat
let ymcaDuration = 20000;
let ymcaInstructionIds = [
    // Intro
    0, 1, 2, 4, 6,

    // First verse
    0, 1, 2, 4, 5,

    // Chorus
    0, 1, 2, 4, 5,

    // First verse
    0, 1, 2, 4, 5,

    // End of song.
    -1
  ];

let songs = [];

function getSong(songId) {
  return songs[songId];
}

function preloadSongs() {
  soundFormats('mp3');
  ymcaFile = loadSound('assets/sounds/YMCA');
}

class Song {
  constructor(file, delay, tempo, duration, instructionIds) {
    this.file = file;
    this.delay = delay;
    this.tempo = tempo;
    this.duration = duration;
    this.instructionIds = instructionIds;

    this.startTime = 0;
    this.lastInstructionIdIndex = -1;
    this.total = 0;
    this.progress = 0;

    // Determine the total number of instructions.
    let index;
    for (index = 0; index < instructionIds.length; index++)
      if (this.instructionIds[index] >= 0)
        this.total++;
  }

  play(){
    this.file.play();
    this.lastInstructionIdIndex = -1;
    this.startTime = Date.now();
  }

  getDelay() {
    return this.delay;
  }

  getTempo() {
    return this.tempo;
  }

  getDuration() {
    return this.duration;
  }

  // Return instruction Id as a posivite value and -1 if there is no new instruction id.
  getNewInstructionId() {
    let timeElapsed = Date.now() - this.startTime;
    if (timeElapsed < this.delay)
      return -1;  // Instructions are not available yet.
    let index = Math.floor((timeElapsed - this.delay) / this.tempo);
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
  songs.push(new Song(ymcaFile, ymcaDelay, ymcaTempo, ymcaDuration, ymcaInstructionIds));
}
