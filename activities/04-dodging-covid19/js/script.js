/**************************************************
Dodging covid 19
Valentine Sénégas

Today we are dodging covid-19!
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
  }
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
    user.x = mouseX;
    user.y = mouseY;

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
