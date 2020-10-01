/**************************************************
Exercise 02: Dodge-em
Valentine Sénégas

Today we are dodging something that I will decide later
**************************************************/

let covid19 = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: {
    r: 237,
    g: 85,
    b: 136
  }
}

let user = {
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

let numStatic = 5000;


// setup()
//
// Here we are setting the size of the canvas, and the random position & speed of covid-19
function setup() {
  createCanvas(windowWidth, windowHeight);

  covid19.y = random(0, height);
  covid19.vx = covid19.speed;

  noCursor();

}

// draw()
//
// Here we draw everything: the background, the user and covid-19. We also check if there is a collision between covid-19 and the user
function draw() {

  background(0);

  // Display static
  for (let i = 0; i < numStatic; i++){
    let x = random(0, width);
    let y = random(0, height);
    stroke(255);
    point(x,y);
  }

  //Covid 19 movement
  covid19.x = covid19.x + covid19.vx;
  covid19.y = covid19.y + covid19.vy;

  if (covid19.x > width) {
    covid19.x = 0;
    covid19.y = random(0, height);
  }

  // User movement


    // If the mouse x position is GREATER than the circle x position, it must be to the RIGHT of the circle
    if (mouseX > user.x) {
      // So set the circle's x velocity to a POSITIVE number to move it to the RIGHT
      user.vx = user.speed;
    }
    // Or if the mouse x position is LESS than the circle x position, it must be to the LEFT of the circle
    else if (mouseX < user.x) {
      // So set the circle's x velocity to a NEGATIVE number to move it to the LEFT
      user.vx = -user.speed;
    }


    // If the mouse position is GREATER than the circle y position, it must be BELOW the circle
    if (mouseY > user.y) {
      // So set the circle's x velocity to a POSITIVE number to move it DOWN
      user.vy = user.speed;
    }
    // Or if the mouse y position is LESS than the circle y position, it must be ABOVE the circle
    else if (mouseY < user.y) {
      // So set the circle's x velocity to a NEGATIVE number to move it UP
      user.vy = -user.speed;
    }
//

// Then we actually APPLY these changes to `vx` and `vy` to the circle's position
user.x = user.x + user.vx;
user.y = user.y + user.vy;

    // user.x = mouseX;
    // user.y = mouseY;

  // Check for catching covid19
  let d = dist(user.x, user.y, covid19.x, covid19.y);
  if (d < covid19.size/2 + user.size/2) {
    noLoop();
  }

  // Display covid
  fill(covid19.fill.r, covid19.fill.g, covid19.fill.b);
  ellipse(covid19.x, covid19.y, covid19.size);


  // Display User
  fill(user.fill.r, user.fill.g, user.fill.b);
    ellipse(user.x, user.y, user.size);


}
