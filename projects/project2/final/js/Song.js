"use strict;"

let ymcaFile;
let ymcaDelay = 1000;
let ymcaTempo = 40;
let ymcaDuration = 20000;
let ymcaMoves = [
    // Intro
    0, 1, 2, 4, 9,

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

function getSong(index) {
  return songs[index];
}

function preloadSongs() {
  ymcaFile = loadSound('assets/sounds/YMCA.mp3');
}

class Song {
  constructor(file, delay, tempo, duration, moves) {
    this.file = file;
    this.delay = delay;
    this.tempo = tempo;
    this.duration = duration;
    this.moves = moves;
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

  getMoves(index) {
    return moves[index];
  }

  play(){
    this.file.play();
  }
}

function setupSongs() {
  songs.push(new Song(ymcaFile, ymcaDelay, ymcaTempo, ymcaDuration, ymcaMoves));
}
