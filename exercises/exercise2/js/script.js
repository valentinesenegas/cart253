/**************************************************
Exercise 02: Dodge-em
Valentine Sénégas

In this simulation, a friendly fish will escape a shark.
**************************************************/



let imgFish;

let imgShark;

let numBubble = 10;
// let bubbleSpeed = [1, 3, 7, 5, 8, 2, 9, 4, 3, 6]
let bubble = {
  size:40,
  r1:143,
  g1:193,
  b1:235,
  speed: [1, 3, 7, 5, 8, 2, 9, 4, 3, 6],
  r2:255,
  g2:255,
  b2:255,
  ratio: 4
};

let bg = {
  r: 0,
  g:0,
  b:100
}

let shark = {
  x: 0,
  y: 250,
  size: 100,
  vx: 1,
  vy: 1,
  speed: 5,
  fill: {
    r: 237,
    g: 85,
    b: 136
  }
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
  speed: 5
}


let count = 0;


// preload()
function preload() {
  imgFish = loadImage('assets/images/fish.png');
  imgBubble = loadImage('assets/images/bubble.png');
  imgShark = loadImage('assets/images/shark.png');

  imgSeaweed1 = loadImage('assets/images/seaweed1.png');
  imgSeaweed2 = loadImage('assets/images/seaweed2.png');
  imgCoral = loadImage('assets/images/coral1.png');
}

// setup()
//
// Here we are setting the size of the canvas, and the position & speed of Shark
function setup() {
  createCanvas(windowWidth, windowHeight);

  shark.y = random(0, height);
  shark.vx = shark.speed;

  noCursor();
}

// draw()
//
// Here we draw everything: the background, the fish and Shark. We also check if there is a collision between Shark and the fish
function draw() {

  background(bg.r, bg.g, bg.b);



  // Display bubbles
  for (let i = 0; i < numBubble; i++){
    let x = (width / numBubble) * i + (width / numBubble) /2;
    let y = height - ((count * bubble.speed[i]) % height);

    noStroke();

    fill(bubble.r1, bubble.g1, bubble.b1);
    ellipse(x,y, bubble.size);

    fill(bubble.r2, bubble.g2, bubble.b2);
    ellipse(x, y - bubble.size / bubble.ratio , bubble.size / bubble.ratio);
  }
  count++;

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


  // fish movement

// fish movement with mouse

    // If the mouse x position is GREATER than the circle x position, it must be to the RIGHT of the circle
    if (mouseX > fish.x) {
      // So set the circle's x velocity to a POSITIVE number to move it to the RIGHT
      fish.vx = fish.speed;
    }
    // Or if the mouse x position is LESS than the circle x position, it must be to the LEFT of the circle
    else if (mouseX < fish.x) {
      // So set the circle's x velocity to a NEGATIVE number to move it to the LEFT
      fish.vx = -fish.speed;
    }


    // If the mouse position is GREATER than the circle y position, it must be BELOW the circle
    if (mouseY > fish.y) {
      // So set the circle's x velocity to a POSITIVE number to move it DOWN
      fish.vy = fish.speed;
    }
    // Or if the mouse y position is LESS than the circle y position, it must be ABOVE the circle
    else if (mouseY < fish.y) {
      // So set the circle's x velocity to a NEGATIVE number to move it UP
      fish.vy = -fish.speed;
    }
//

// Then we actually APPLY these changes to `vx` and `vy` to the circle's position
fish.x = fish.x + fish.vx;
fish.y = fish.y + fish.vy;

    // fish.x = mouseX;
    // fish.y = mouseY;


// fish movement with keyboard
//-------------------------------------//
    // function keyPressed() {
    //   if (keyCode === LEFT_ARROW) {
    //     fish.vx = -fish.speed;
    //   } else if (keyCode === RIGHT_ARROW) {
    //     fish.vx = fish.speed;
    //   }
    // }
//-------------------------------------//


  // Check for catching shark
  let d = dist(fish.x, fish.y, shark.x, shark.y);
  if (d < shark.size/2 + fish.size/2) {
    noLoop();
  }

  // Display shark
  // fill(shark.fill.r, shark.fill.g, shark.fill.b);
  // ellipse(shark.x, shark.y, shark.size);

  imageMode(CENTER);
  image(imgShark, shark.x, shark.y);

  // Display fish
  // fill(fish.fill.r, fish.fill.g, fish.fill.b);
  //   ellipse(fish.x, fish.y, fish.size);

  imageMode(CENTER);
  image(imgFish, fish.x, fish.y);
}
