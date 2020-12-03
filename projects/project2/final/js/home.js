"use strict";

/**************************************************
Home screen with the map
**************************************************/

let rgba = 0;     // Last RGBA of the pixel pointed by the mouse.
let normal = 0;
let hover = 1;
let selected = 2;

let imgNormalArray = [];
let imgHoverArray = [];
let imgSelectedArray = [];

let regionNames = ["northwest", "midwest" , "northeast" , "southwest" , "southeast"];
let regionNormalColors = [193, 248, 254, 194, 215];
let regionHoverColors = [143, 240, 237, 170, 162];
let currentSelectedRegionId = -1;   // No selected region.


//*********************************************************************
//
//                   I N I T I A L I Z A T I O N
//
//*********************************************************************


// Preload the images, sounds, fonts
function preloadHome() {
  let regionId;
  for (regionId = 0; regionId < regionNames.length; regionId++) {
    imgNormalArray.push(  loadImage("assets/images/regions/" + regionNames[regionId] + "Normal.png"));
    imgHoverArray.push(   loadImage("assets/images/regions/" + regionNames[regionId] + "Hover.png"));
    imgSelectedArray.push(loadImage("assets/images/regions/" + regionNames[regionId] + "Selected.png"));
  }
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
    else if (rgba[1] == regionNormalColors[this.id] || rgba[1] == regionHoverColors[this.id]) {
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
    image(img, 0, 0);
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
//                             D R A W
//
//*********************************************************************

// Description of draw() goes here.
function drawHome() {
  rgba = get(mouseX, mouseY);
  background(241,242,252);
  drawRegions();

  push();
  text("R:" + rgba[0] + " G:" + rgba[1] + " B:" + rgba[2] + " A:" + rgba[3], 100, 100);
  pop();

} // End of drawHome()
