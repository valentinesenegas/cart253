"use strict";

/**************************************************
Home screen with the map
**************************************************/

let rgba = 0;     // Last RGBA of the pixel pointed by the mouse.

// Display state of the regions
let normal = 0;
let hover = 1;
let selected = 2;

// Arrays containing the images for the regions.
let imgNormalArray = [];
let imgHoverArray = [];
let imgSelectedArray = [];

let regionNames = ["northwest", "midwest" , "northeast" , "southwest" , "southeast"];
let regionDifficulty = [1, 2, 3, 1, 2];
let regionNormalColors = [193, 248, 254, 194, 215];
let regionHoverColors = [143, 240, 237, 170, 162];
let currentSelectedRegionId = -1;   // No selected region.

let regionRects =
  [
    [177, 294, 430, 413],
    [485, 308, 675, 465],
    [779, 448, 949, 537],
    [157, 476, 332, 583],
    [507, 594, 727, 703]
  ];

// Start button.
let imgStartButtonReleased;
let imgStartButtonHover;
let imgStartButtonPressed;
let imgLastStartButton = null;

let startButtonX = 1000;
let startButtonY = 600;
let startButtonW = 150;
let startButtonH = 50;

// Stars.
let imgStar1;
let imgStar2;
let imgStar3;
let starX = 60;
let star1Y = 700;
let star2Y = 750;
let star3Y = 800;
let imgDifficulty = [];


//*********************************************************************
//
//                   I N I T I A L I Z A T I O N
//
//*********************************************************************


// Preload the images, sounds, fonts
function preloadHome() {
  // Regions.
  let regionId;
  for (regionId = 0; regionId < regionNames.length; regionId++) {
    imgNormalArray.push(  loadImage("assets/images/regions/" + regionNames[regionId] + "Normal.png"));
    imgHoverArray.push(   loadImage("assets/images/regions/" + regionNames[regionId] + "Hover.png"));
    imgSelectedArray.push(loadImage("assets/images/regions/" + regionNames[regionId] + "Selected.png"));
  }

  // Start button.
  imgStartButtonReleased  = loadImage("assets/images/buttons/bluebuttonReleased.png");
  imgStartButtonHover     = loadImage("assets/images/buttons/bluebuttonHover.png");
  imgStartButtonPressed   = loadImage("assets/images/buttons/bluebuttonPressed.png");

  // Stars.
  imgStar1 = loadImage("assets/images/1star.png");
  imgStar2 = loadImage("assets/images/2stars.png");
  imgStar3 = loadImage("assets/images/3stars.png");
  imgDifficulty.push(imgStar1);
  imgDifficulty.push(imgStar2);
  imgDifficulty.push(imgStar3);
}

// Setup of the score, creation of the canvas, apply the main font for the text
function setupHome() {
  let regionId;
  for (regionId = 0; regionId < regionNames.length; regionId++)
    regions.push(new Region(regionId, imgNormalArray[regionId], imgHoverArray[regionId], imgSelectedArray[regionId]));  // region Id = song Id
}


//*********************************************************************
//
//                          R E G I O N
//
//*********************************************************************

let regions = [];


class Region {
  constructor (id, imgNormal, imgHover, imgSelected) {
    this.id = id;
    this.imgNormal = imgNormal;
    this.imgHover = imgHover;
    this.imgSelected = imgSelected;
  }

  draw() {
    let img;
    if (this.id == currentSelectedRegionId)
      img = this.imgSelected;
    else if (( mouseX >= regionRects[this.id][0] &&
               mouseX <= regionRects[this.id][2] &&
               mouseY >= regionRects[this.id][1] &&
               mouseY <= regionRects[this.id][3]) ||
               (rgba[1] == regionNormalColors[this.id] || rgba[1] == regionHoverColors[this.id])) {
      if (mouseIsPressed) {
        currentSelectedRegionId = this.id;
        img = this.imgSelected;
      }
      else
        img = this.imgHover;
    }
    else
      img = this.imgNormal;
    push();
    imageMode(CORNER);
    image(img, 0, 0);
    image(imgDifficulty[regionDifficulty[this.id] - 1], regionRects[this.id][0], regionRects[this.id][1]);
    pop();
    // Draw clickable rectangles.
    // THIS CODE IS FOR TEST PURPOSE ONLY. DO NOT DELETE.
      push();
      fill('rgba(127,127,127, 0.25)');
      rect( regionRects[this.id][0],
            regionRects[this.id][1],
            regionRects[this.id][2] - regionRects[this.id][0],  // W
            regionRects[this.id][3] - regionRects[this.id][1]); // H
      pop();
    }
}

function drawRegions() {
  let regionId;
  for (regionId = 0; regionId < regionNames.length; regionId++)
    regions[regionId].draw();

  // Draw the current selected region above the others
  if (currentSelectedRegionId != -1)
    regions[currentSelectedRegionId].draw();
}

//*********************************************************************
//
//                          B U T T O N
//
//*********************************************************************

function drawStartButton() {
  let img = imgStartButtonReleased;
  if (mouseX >= startButtonX && mouseX <= startButtonX + startButtonW &&
      mouseY >= startButtonY && mouseY <= startButtonY + startButtonH) {
    if (mouseIsPressed)
      img = imgStartButtonPressed;
    else if (imgLastStartButton == imgStartButtonPressed && currentSelectedRegionId != -1) {
      startGame(currentSelectedRegionId);
    }
    else
      img = imgStartButtonHover;
  }
  imgLastStartButton = img;

  push();
  imageMode(CORNER);
  image(img, startButtonX, startButtonY);
  textSize(24);
  textAlign(CENTER, CENTER);
  if (currentSelectedRegionId == -1)
    fill('#777777');
  else
    fill('#ffffff');
  text("START", startButtonX, startButtonY, startButtonW, startButtonH);
  pop();
}


//*********************************************************************
//
//                            S T A R S
//
//*********************************************************************

function drawStars() {
  let img = imgStartButtonReleased;
  if (mouseX >= startButtonX && mouseX <= startButtonX + startButtonW &&
      mouseY >= startButtonY && mouseY <= startButtonY + startButtonH) {
    if (mouseIsPressed)
      img = imgStartButtonPressed;
    else if (imgLastStartButton == imgStartButtonPressed && currentSelectedRegionId != -1) {
      startGame(currentSelectedRegionId);
    }
    else
      img = imgStartButtonHover;
  }
  imgLastStartButton = img;

  push();
  imageMode(CORNER);
  image(imgStar1, starX, star1Y);
  image(imgStar2, starX, star2Y);
  image(imgStar3, starX, star3Y);
  textSize(36);
  textAlign(LEFT, CENTER);
  text("Easy",      starX + 200, star1Y + 22);
  text("Medium",    starX + 200, star2Y + 22);
  text("Difficult", starX + 200, star3Y + 22);
  pop();
}


//*********************************************************************
//
//                             D R A W
//
//*********************************************************************

// Description of draw() goes here.
function drawHome() {
  rgba = get(mouseX, mouseY);
  background(241,242,252);
  drawRegions();
  drawStars();
  drawStartButton();

  push();
  text("R:" + rgba[0] + " G:" + rgba[1] + " B:" + rgba[2] + " A:" + rgba[3], 100, 100);
  text("X:" + mouseX + " Y:" + mouseY, 100, 150);
  pop();
} // End of drawHome()
