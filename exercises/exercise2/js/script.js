/**************************************************
Exercise 02: Dodge-em
Valentine Sénégas

In this simulation, a friendly fish will try to escape an evil shark.
**************************************************/

// Variables

let imgFish;

let imgShark;

let bubble = {
  size:40,
  r1:143,
  g1:193,
  b1:235,
  speed: [1, 3, 7, 5, 8, 2, 9, 4, 3, 6],
  r2:255,
  g2:255,
  b2:255,
  alpha2:100,
  ratio: 4,
  count:0,
  numBubble: 10
};

let bg = {
  r: 97,
  g:181,
  b:250
}

let shark = {
  x: 0,
  y: 250,
  size: 100,
  fill: {
    r: 237,
    g: 85,
    b: 136
  },
  vx: 1,
  vy: 1,
  speed: 5

}

let fish = {
  x: 250,
  y: 250,
  size: 100,
  fill: {
    r: 138,
    g: 99,
    b: 199
  },
  vx: 0,
  vy: 0,
  vxmax : 10,
  vymax : 10,
  speed: 1
}


// preload()
//
// Preloading the images of the fish and the shark
function preload() {
  imgFish = loadImage('assets/images/fish.png');
  imgShark = loadImage('assets/images/shark.png');
}

// setup()
//
// Setting the size of the canvas, and the position & speed of the shark
function setup() {
  createCanvas(windowWidth, windowHeight);

  shark.y = random(0, height);
  shark.vx = shark.speed;
}

// draw()
//
// Drawing the background, the bubbles, the fish and the shark. Creating movement. Checking if there is a collision between the Shark and the fish
function draw() {

  // BACKGROUND AND BUBBLES

  // Background color
  background(bg.r, bg.g, bg.b);

  //-----------------------------//

  // Display bubbles
  for (let i = 0; i < bubble.numBubble; i++){
    let x = (width / bubble.numBubble) * i + (width / bubble.numBubble) /2;
    let y = height - ((bubble.count * bubble.speed[i]) % height);

    noStroke();

    // Big circle
    fill(bubble.r1, bubble.g1, bubble.b1);
    ellipse(x,y, bubble.size);

    // Small circle
    fill(bubble.r2, bubble.g2, bubble.b2, bubble.alpha2);
    ellipse(x - bubble.ratio, y - bubble.size / bubble.ratio , bubble.size / bubble.ratio);
  }
  bubble.count++;

  //-----------------------------//
  // MOVEMENT OF THE SHARK AND THE FISH

  //Shark movement
  shark.x = shark.x + shark.vx;
  shark.y = shark.y + shark.vy;

  if (shark.x > width) {
    shark.x = 0;
    shark.y = random(0, height);
  }

  // Makes the shark move vertically toward the fish while it moves left to right
  if (shark.y > fish.y){
    shark.y = shark.y - shark.vx;
  }

  else {
    shark.y = shark.y + shark.vy;
  }

  //-----------------------------//

  // Fish movement

  // If the mouse x position is GREATER than the fish x position, it must be to the RIGHT of the fish
  if (mouseX > fish.x) {
    // Set the fish's x velocity to a POSITIVE number to move it to the RIGHT
    fish.vx += fish.speed;
    fish.vx = Math.min(fish.vx, fish.vxmax);
  }
  // Or if the mouse x position is LESS than the fish x position, it must be to the LEFT of the fish
  else if (mouseX < fish.x) {
    // Set the fish's x velocity to a NEGATIVE number to move it to the LEFT
    fish.vx -= fish.speed;
    fish.vx = Math.max(fish.vx, -fish.vxmax);
  }

  // If the mouse position is GREATER than the fish y position, it must be BELOW the fish
  if (mouseY > fish.y) {
    // So set the fish's x velocity to a POSITIVE number to move it DOWN
    fish.vy += fish.speed;
    fish.vy = Math.min(fish.vy, fish.vymax);
  }
  // Or if the mouse y position is LESS than the fish y position, it must be ABOVE the fish
  else if (mouseY < fish.y) {
    // Set the fish's x velocity to a NEGATIVE number to move it UP
    fish.vy -= fish.speed;
    fish.vy = Math.max(fish.vy, -fish.vxmax);
  }

  // Apply changes to vx and vy to the fish's position
  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;


  //-----------------------------//
  // CHECK FOR A COLLISION

  // Check if the shark catches the fish
  let d = dist(fish.x, fish.y, shark.x, shark.y);
  if (d < shark.size/2 + fish.size/2) {
    noLoop();
  }


  //-----------------------------//
  // DISPLAY

  // Display shark
  imageMode(CENTER);
  image(imgShark, shark.x, shark.y);

  // Display fish
  imageMode(CENTER);
  image(imgFish, fish.x, fish.y);
}
