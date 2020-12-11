"use strict";

// Creation of canvas, background, prealoading fonts.
// ---------- //
let bg;

// Fonts
let allanBold;
let allanRegular;
let openSansRegular;


function preloadScene() {
  // Google Fonts: Allan and Open Sans
  allanBold = loadFont("assets/fonts/Allan-Bold.ttf");
  allanRegular = loadFont("assets/fonts/Allan-Regular.ttf");
  openSansRegular = loadFont("assets/fonts/OpenSans-Regular.ttf");

  // Background
  bg = loadImage("assets/images/backgroundgame.png");
}


function setupScene() {
  createCanvas(1267, 900);
  textFont(allanBold);
}


function drawScene() {
  // Place the background image.
  image(bg, 0, 0);
}
