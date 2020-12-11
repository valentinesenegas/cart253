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

let regionNames = ["northwest", "northeast" , "southwest" , "southeast"];
let regionDifficulty = [1, 2, 3, 3];
let regionNormalColors = [[255, 193, 249], [209, 254, 194], [157, 194, 249], [255, 215, 178]];
let regionHoverColors = [[244, 143, 234], [169, 237, 145], [114, 170, 255], [255, 162, 75]];
let currentSelectedRegionId = -1;   // No selected region.

// In each region, rectangle that is always clickable, even when the color is not the color of the region.
let starRects =
  [
    [210, 280, 394, 439],
    [515, 350, 735, 557],
    [217, 476, 460, 650],
    [480, 575, 670, 740]
  ];


// Button.
let imgButtonReleased;
let imgButtonHover;
let imgButtonPressed;

// Position and size of the Start button.
let startButtonX = 1000;
let startButtonY = 800;
let startButtonW = 225;
let startButtonH = 50;
let imgLastStartButton = null;

// Position and size of the How to Play button.
let howToPlayButtonX = 1000;
let howToPlayButtonY = 730;
let howToPlayButtonW = 225;
let howToPlayButtonH = 50;
let imgLastHowToPlayButton = null;
let howToPlay = false;
let imgHowToPlay;
let closeButtonX = 580;
let closeButtonY = 830;
let closeButtonW = 225;
let closeButtonH = 50;
let imgLastCloseButton = null;

// Stars indicating level of difficulty.
let imgStar1;
let imgStar2;
let imgStar3;
let starX = 40;
let star1Y = 720;
let star2Y = 770;
let star3Y = 820;
let imgDifficulties = [];

let imgBackgroundHome;

// President character.
let imgPresidentLeft;
let imgPresidentRight;
let presidentTimeToLive = 0;
let presidentX = 935;
let presidentY = 130;

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

  // Button.
  imgButtonReleased  = loadImage("assets/images/buttons/bluebuttonReleased.png");
  imgButtonHover     = loadImage("assets/images/buttons/bluebuttonHover.png");
  imgButtonPressed   = loadImage("assets/images/buttons/bluebuttonPressed.png");

  // Stars.
  imgStar1 = loadImage("assets/images/1star.png");
  imgStar2 = loadImage("assets/images/2stars.png");
  imgStar3 = loadImage("assets/images/3stars.png");
  imgDifficulties.push(imgStar1);
  imgDifficulties.push(imgStar2);
  imgDifficulties.push(imgStar3);

  // President.
  imgPresidentLeft  = loadImage("assets/images/presidentLeft.png");
  imgPresidentRight = loadImage("assets/images/presidentRight.png");

  // How to play.
  imgHowToPlay  = loadImage("assets/images/howToPlay.png");
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
    let rgbNormal = regionNormalColors[this.id];
    let rgbHover = regionHoverColors[this.id];
    let img;
    if (this.id == currentSelectedRegionId)
      img = this.imgSelected;
    else if (( mouseX >= starRects[this.id][0] &&
               mouseX <= starRects[this.id][2] &&
               mouseY >= starRects[this.id][1] &&
               mouseY <= starRects[this.id][3]) ||
               ((rgba[0] == rgbNormal[0] && rgba[1] == rgbNormal[1] && rgba[2] == rgbNormal[2]) ||
                (rgba[0] == rgbHover[0] && rgba[1] == rgbHover[1] && rgba[2] == rgbHover[2]))) {
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
    imageMode(LEFT);
    image(img, 0, 0);

    imageMode(CENTER);
    let imgDifficulty = imgDifficulties[regionDifficulty[this.id] - 1];
    image(imgDifficulty,
        starRects[this.id][0] + (starRects[this.id][2] - starRects[this.id][0]) / 2, // dx
        starRects[this.id][1] + 23, // dy
        imgDifficulty.width, // dWidth
        imgDifficulty.height, // dHeight
        0, 0          // sx, sy

      );
    pop();

    // Draw clickable rectangles.
    // THIS CODE IS FOR TEST PURPOSE ONLY. DO NOT DELETE.
      // push();
      // fill('rgba(127,127,127, 0.25)');
      // rect( starRects[this.id][0],
      //       starRects[this.id][1],
      //       starRects[this.id][2] - starRects[this.id][0],  // W
      //       starRects[this.id][3] - starRects[this.id][1]); // H
      // pop();
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

function drawStartAndHowToPlayButtons() {
  let imgStartButton = imgButtonReleased;

  if (mouseX >= startButtonX && mouseX <= startButtonX + startButtonW &&
      mouseY >= startButtonY && mouseY <= startButtonY + startButtonH) {
    if (mouseIsPressed)
      imgStartButton = imgButtonPressed;
    else if (imgLastStartButton == imgButtonPressed && currentSelectedRegionId != -1) {
      startGame(currentSelectedRegionId);
    }
    else
      imgStartButton = imgButtonHover;
  }
  imgLastStartButton = imgStartButton;

  let imgHowToPlayButton = imgButtonReleased;

  if (mouseX >= howToPlayButtonX && mouseX <= howToPlayButtonX + howToPlayButtonW &&
      mouseY >= howToPlayButtonY && mouseY <= howToPlayButtonY + howToPlayButtonH) {
    if (mouseIsPressed)
      imgHowToPlayButton = imgButtonPressed;
    else if (imgLastHowToPlayButton == imgButtonPressed) {
      howToPlay = true;
    }
    else
      imgHowToPlayButton = imgButtonHover;
  }
  imgLastHowToPlayButton = imgHowToPlayButton;

  push();
  imageMode(CORNER);
  image(imgStartButton,     startButtonX,     startButtonY);
  image(imgHowToPlayButton, howToPlayButtonX, howToPlayButtonY);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill('#ffffff');
  text("HOW TO PLAY", howToPlayButtonX, howToPlayButtonY, howToPlayButtonW, howToPlayButtonH);
  if (currentSelectedRegionId == -1)
    fill('#777777');
  text("START", startButtonX, startButtonY, startButtonW, startButtonH);
  pop();
}


function drawCloseButton() {
  let imgCloseButton = imgButtonReleased;

  if (mouseX >= closeButtonX && mouseX <= closeButtonX + closeButtonW &&
      mouseY >= closeButtonY && mouseY <= closeButtonY + closeButtonH) {
    if (mouseIsPressed)
      imgCloseButton = imgButtonPressed;
    else if (imgLastCloseButton == imgButtonPressed) {
      howToPlay = false;
    }
    else
      imgCloseButton = imgButtonHover;
  }
  imgLastCloseButton = imgCloseButton;

  push();
  imageMode(CORNER);
  image(imgCloseButton,     closeButtonX,     closeButtonY);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill('#ffffff');
  text("CLOSE", closeButtonX, closeButtonY, closeButtonW, closeButtonH);
  pop();
}


//*********************************************************************
//
//                            S T A R S
//
//*********************************************************************

// Starts indicating the level of difficulty of each region.
function drawStars() {
  let img = imgButtonReleased;
  if (mouseX >= startButtonX && mouseX <= startButtonX + startButtonW &&
      mouseY >= startButtonY && mouseY <= startButtonY + startButtonH) {
    if (mouseIsPressed)
      img = imgButtonPressed;
    else if (imgLastStartButton == imgButtonPressed && currentSelectedRegionId != -1) {
      startGame(currentSelectedRegionId);
    }
    else
      img = imgButtonHover;
  }
  imgLastStartButton = img;

  push();
  imageMode(CORNER);
  image(imgStar1, starX, star1Y);
  image(imgStar2, starX, star2Y);
  image(imgStar3, starX, star3Y);
  fill(42, 50, 80);
  textSize(28);
  textFont(allanBold);
  textAlign(LEFT, CENTER);
  text("EASY",      starX + 180, star1Y + 22);
  text("MEDIUM",    starX + 180, star2Y + 22);
  text("DIFFICULT", starX + 180, star3Y + 22);
  pop();
}


//*********************************************************************
//
//                      P R E S I D E N T
//
//*********************************************************************

// Draw a small animation of the president.
function drawPresident() {
  push();
  imageMode(CORNER);
  if (presidentTimeToLive == 0)
    presidentTimeToLive = 100;
  else
    presidentTimeToLive--;
  if (presidentTimeToLive >= 50)
    image(imgPresidentLeft, presidentX, presidentY);
  else
    image(imgPresidentRight, presidentX, presidentY);
  pop();
}


//*********************************************************************
//
//                      B A C K G R O U N D
//
//*********************************************************************

function drawBackground() {
  background(241,242,252);
  if (howToPlay)
    image(imgHowToPlay, 0, 0);
  else
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
    fill(241, 243, 252);
    text("Select a region and press START", 400, 100);
    pop();
  }
  else {
    push();
    fill(241, 243, 252);
    textSize(40);
    textAlign(CENTER);
    text("Last Score", 600, 65);
    textSize(30);
    text("Incorrect moves: " + getScoreIncorrectMoves(), 600, 230);
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
      textAlign(CENTER);
      textFont(openSansRegular);
      text("Incorrect moves: " + getScoreIncorrectMoves(),
        starRects[regionId][0],
        starRects[regionId][1] + 125,
        starRects[regionId][2] - starRects[regionId][0],
        starRects[regionId][3] - starRects[regionId][1]
        );
      pop();
      drawScorePercentHit(scorePercentHit,
        starRects[regionId][0] + (starRects[regionId][2] - starRects[regionId][0]) / 2,
        starRects[regionId][1] + 85,
        scorePercentDiameterSmall,
        28);
    }
  }
}

//*********************************************************************
//
//                             D R A W
//
//*********************************************************************


function drawHome() {
  rgba = get(mouseX, mouseY); // Keep the color of the pixel beneath the mouse. This is used to detect the region hovered by the mouse.
  drawBackground();
  if (howToPlay)
    drawCloseButton();
  else {
    drawRegions();
    drawStars();
    drawStartAndHowToPlayButtons();
    drawPresident();
    drawLastAndRegionScores();
  }

  // BEGIN - For testing purposes only -- DO NOT DELETE.
  // push();
  // textSize(20);
  // textFont(openSansRegular);
  // text("R:" + rgba[0] + " G:" + rgba[1] + " B:" + rgba[2] + " A:" + rgba[3], 100, 100);
  // text("X:" + mouseX + " Y:" + mouseY, 100, 150);
  // pop();
  // END - For testing purposes only.
} // End of drawHome()
