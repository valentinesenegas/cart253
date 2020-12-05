"use strict";

/**************************************************
Home screen with the map
**************************************************/

let rgba = 0;     // Last RGBA of the pixel pointed by the mouse.

// Display state of the regions.
let normal = 0;
let hover = 1;
let selected = 2;

// Arrays containing the images for the regions.
let imgNormalArray = [];
let imgHoverArray = [];
let imgSelectedArray = [];

let regionNames = ["northwest", "midwest" , "northeast" , "southwest" , "southeast"];
let regionDifficulty = [1, 2, 1, 3, 2];
let regionNormalColors = [193, 248, 254, 194, 215];
let regionHoverColors = [143, 240, 237, 170, 162];
let currentSelectedRegionId = -1;   // No selected region.

// In each region, rectangle that is always clickable, even when the color is not the color of the region.
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

// Position and size of the Start button.
let startButtonX = 1000;
let startButtonY = 800;
let startButtonW = 225;
let startButtonH = 50;

// Stars indicating level of difficulty.
let imgStar1;
let imgStar2;
let imgStar3;
let starX = 40;
let star1Y = 720;
let star2Y = 770;
let star3Y = 820;
let imgDifficulty = [];

let imgBackgroundHome;


//*********************************************************************
//
//                   I N I T I A L I Z A T I O N
//
//*********************************************************************


// Preload the images, sounds.
function preloadHome() {
  // Background image
  imgBackgroundHome = loadImage("assets/images/backgroundhome.png");

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

  // Draw the current selected region above the others.
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

// Starts indicating the level of difficulty of each region.
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
  textSize(24);
  textFont(openSansRegular);
  textAlign(LEFT, CENTER);
  text("Easy",      starX + 180, star1Y + 22);
  text("Medium",    starX + 180, star2Y + 22);
  text("Difficult", starX + 180, star3Y + 22);
  pop();
}


//*********************************************************************
//
//                      B A C K G R O U N D
//
//*********************************************************************

function drawBackground() {
  background(241,242,252);
  image(imgBackgroundHome, 0, 0);
}


//*********************************************************************
//
//               L A S T   &   R E G I O N   S C O R E S
//
//*********************************************************************

function drawLastAndRegionScores() {
  // Draw last score.
  let lastScoreMax = getScoreMax();
  if (lastScoreMax == 0) {
    push();
    textSize(40);
    textAlign(LEFT, CENTER);
    text("Select a region and press START", 400, 100);
    pop();
  }
  else {
    push();
    textSize(40);
    textAlign(CENTER);
    text("Last Score", 600, 65);
    text("Incorrect moves: " + getScoreIncorrectMoves(), 600, 250);
    pop();
    drawScorePercentHit(getScorePercentHit(), 600, 140, scorePercentDiameterLarge, 32);
  }

  // Draw region scores.
  let regionId;
  for (regionId = 0; regionId < regionNames.length; regionId++) {
    let song = getSong(regionId);
    let scorePercentHit = song.getPercentScoreHit();
    if (scorePercentHit != -1) {
      push();
      textSize(16);
      textAlign(LEFT, CENTER);
      text("Incorrect moves: " + getScoreIncorrectMoves(), regionRects[regionId][0], regionRects[regionId][1] + 50);
      pop();
      drawScorePercentHit(scorePercentHit, regionRects[regionId][0] + 120, regionRects[regionId][1] + 80, scorePercentDiameterSmall, 16);
    }
  }
}

//*********************************************************************
//
//                             D R A W
//
//*********************************************************************


function drawHome() {
  // BEGIN - For testing purposes only.
  rgba = get(mouseX, mouseY);
  // END - For testing purposes only.

  drawBackground();
  drawRegions();
  drawStars();
  drawStartButton();
  drawLastAndRegionScores();

  // BEGIN - For testing purposes only.
  // push();
  // textFont(openSansRegular);
  // text("R:" + rgba[0] + " G:" + rgba[1] + " B:" + rgba[2] + " A:" + rgba[3], 100, 100);
  // text("X:" + mouseX + " Y:" + mouseY, 100, 150);
  // pop();
  // END - For testing purposes only.
} // End of drawHome()
