// sketch.js - Generative image based on the Eye of Sauron from the Lord of the Rings film series.
// Author: Connor Hamilton
// Date: 4/16/2024

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;


/* exported setup, draw */
let eyeWidth = 150; // Width of the Eye of Sauron 
let eyeHeight = 100; // Height of the Eye of Sauron 
let pupilWidth = 15; // Width of the pupil
let pupilHeight = 75; // Height of the pupil
let irisSize = 80; // Size of the iris
let pupilColor; // Color of the pupil

let eyeX; // X-coordinate of the eye
let eyeY; // Y-coordinate of the eye
let previousIrisX; // Previous X-coordinate of the iris
let previousIrisY; // Previous Y-coordinate of the iris
let previousPupilX; // Previous X-coordinate of the pupil 
let previousPupilY; // Previous Y-coordinate of the pupil
let isOutsideCanvas = false; // Flag to track if the cursor is outside the canvas

let towerWidth = 150; // Width of Sauron's tower
let towerHeight = 200; // Height of Sauron's tower
let towerColor; // Color of tower
let towerX; // X-coordinate of the tower
let towerY; // Y-coordinate of the tower

let horizonY; // Y-coordinate of the horizon
let groundColor; // Ground color'
let mountainColor; // Mountain color

let lavaColor; // Lava color

let clouds = []; // Array to store cloud values

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function setup() {
  createCanvas(1750, 600);
  pupilColor = color(0); // Black color for the pupil
  towerColor = color(0);
  eyeX = width / 2; // Center of the screen
  eyeY = height / 2; // Center of the screen
  towerX = width / 2; // X-coordinate of the tower (centered)
  towerY = height - towerHeight / 2; // Y-coordinate of the tower (bottom of the canvas)
  
  horizonY = height / 2; // Set the horizon at the halfway point of the screen
  groundColor = color(100);
  mountainColor = color(120);
 
  lavaColor = color(175, 0, 0);
  
  // Generate values for clouds
  clouds = generateClouds(50);


  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

function draw() {
  // Fill the upper half with light gray
  background(200);
  
  
  fill(mountainColor);
  stroke(mountainColor);
  
  // Draw second layer of mountains 
  drawMountains(150, 250, color(150), 0.03); 
  
  // Draw first layer of mountains 
  drawMountains(200, 300, mountainColor, 0.05);

  // Draw the generated clouds
  drawClouds(clouds);
  
  // Fill the lower half with dark gray
  fill(groundColor);
  noStroke();
  rect(width / 2, height, width, height);
  
  // Draw the horizon
  stroke(groundColor); // Ground color for the horizon line
  line(0, horizonY, width, horizonY); // Draw a line across the canvas at the horizon
  
  // Draw lava streaks
  drawLavaStreaks();
  
  // Draw Sauron's tower
  fill(towerColor); // Gray color for the tower
  noStroke(); // No outline
  rectMode(CENTER); // Set the origin to the center of the rectangle
  rect(towerX, towerY, towerWidth, towerHeight);
  
  // Draw the arc of the tower
  let cWidth = 215; // Width of the arc
  let cHeight = 450; // Height of the arc
  let cX = towerX; // X-coordinate of the center of the arc
  let cY = towerY - eyeHeight * 2.95; // Y-coordinate of the top of the arc
  noFill();
  stroke(towerColor);
  strokeWeight(35); // Thick outline
  arc(cX, cY, cWidth, cHeight, 0, PI); // Left arc of the arc
  
  // Draw the eye outline
  fill(255, 100, 0);
  stroke(255, 0, 0); // Red outline for the eye
  strokeWeight(2); 
  ellipse(eyeX, eyeY, eyeWidth, eyeHeight); // Use different radii for horizontal and vertical axes
  
  noFill();
  
  // Calculate position of the iris based on mouse position
  let irisX = mouseX;
  let irisY = mouseY;
  
  // Check if mouse is within canvas bounds
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    isOutsideCanvas = false;
    
    // Calculate distance between iris and eye center
    let distance = dist(irisX, irisY, eyeX, eyeY);
    
    // If iris is outside the eye, adjust its position to lie on the circumference
    if (distance > max(eyeWidth, eyeHeight) / 2 - irisSize / 2) {
      let angle = atan2(irisY - eyeY, irisX - eyeX);
      irisX = eyeX + cos(angle) * (max(eyeWidth, eyeHeight) / 2 - irisSize / 2);
      irisY = eyeY + sin(angle) * (max(eyeWidth, eyeHeight) / 2 - irisSize / 2);
    }
    
    // Clamp iris coordinates to stay within the bounds of the eye
    irisX = constrain(irisX, eyeX - eyeWidth / 2 + irisSize / 2, eyeX + eyeWidth / 2 - irisSize / 2);
    irisY = constrain(irisY, eyeY - eyeHeight / 2 + irisSize / 2, eyeY + eyeHeight / 2 - irisSize / 2);
    
    // Store current iris position
    previousIrisX = irisX;
    previousIrisY = irisY;
    
    // Calculate position of the pupil based on mouse position
    let pupilX = irisX + map(mouseX, 0, width, -irisSize / 4, irisSize / 4);
    let pupilY = irisY + map(mouseY, 0, height, -irisSize / 4, irisSize / 4);
    
    // Clamp pupil coordinates to stay within the bounds of the iris
    pupilX = constrain(pupilX, irisX - irisSize / 2 + pupilWidth / 2, irisX + irisSize / 2 - pupilWidth / 2);
    pupilY = constrain(pupilY, irisY - irisSize / 2 + pupilHeight / 2, irisY + irisSize / 2 - pupilHeight / 2);
    
    // Store current pupil position
    previousPupilX = pupilX;
    previousPupilY = pupilY;
  } else {
    isOutsideCanvas = true;
  }
  
  // Draw the pupil
  fill(pupilColor);
  if (isOutsideCanvas) {
    // Draw pupil at previous position if outside canvas
    ellipse(previousPupilX, previousPupilY, pupilWidth, pupilHeight);
  } else {
    // Calculate position of the pupil based on mouse position
    let pupilX = previousPupilX + map(mouseX, 0, width, -irisSize / 4, irisSize / 4);
    let pupilY = previousPupilY + map(mouseY, 0, height, -irisSize / 4, irisSize / 4);
    
    // Clamp pupil coordinates to stay within the bounds of the iris
    pupilX = constrain(pupilX, previousIrisX - irisSize / 2 + pupilWidth / 2, previousIrisX + irisSize / 2 - pupilWidth / 2);
    pupilY = constrain(pupilY, previousIrisY - irisSize / 2 + pupilHeight / 2, previousIrisY + irisSize / 2 - pupilHeight / 2);
    
    // Draw pupil at current position if inside canvas
    ellipse(pupilX, pupilY, pupilWidth, pupilHeight);
  }
}

// Source for mountain generation: https://p5js.org/examples/math-noise-wave.html
function drawMountains(minHeight, maxHeight, mountainColor, scaleFactor) {
  fill(mountainColor);
  stroke(mountainColor);
  beginShape();
  let xoff = 0.0; // 1D Noise
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff), 0, 1, minHeight, maxHeight);
    vertex(x, y);
    xoff += scaleFactor;
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

// Function to generate clouds in the sky
function generateClouds(numClouds) {
  let clouds = [];
  for (let i = 0; i < numClouds; i++) {
    let cloud = {
      x: random(width), // Random x-coordinate within canvas width
      y: random(50, horizonY - 150), // Random y-coordinate above the horizon line
      size: random(75, 200), // Random size for the cloud
      speed: random(0.1, 1), // Random speed at which the cloud moves
      color: random(65, 95)
    };
    clouds.push(cloud);
  }
  return clouds;
}

// Function to draw clouds
function drawClouds(clouds) {
  for (let i = 0; i < clouds.length; i++) {
    let cloud = clouds[i];
    fill(cloud.color); 
    noStroke();
    ellipse(cloud.x, cloud.y, cloud.size, cloud.size * 0.6); // Ellipse shape for the cloud
    cloud.x += cloud.speed; // Move the cloud horizontally
    // If the cloud goes off-screen, reset its position to the left edge of the canvas
    if (cloud.x > width + cloud.size) {
      cloud.x = -cloud.size;
    }
  }
}


function drawLavaStreaks() {
  stroke(lavaColor);
  noFill();
  strokeWeight(15);
  
  
  beginShape();
  curveVertex(20, horizonY+20);
  curveVertex(20, horizonY+20);
  curveVertex(40, horizonY+40);
  curveVertex(70, horizonY+70);
  curveVertex(60, horizonY+90);
  curveVertex(80, horizonY+110);
  curveVertex(30, horizonY+200);
  curveVertex(20, height);
  curveVertex(20, height);
  endShape();
  
  beginShape();
  curveVertex(100, horizonY+20);
  curveVertex(150, horizonY+20);
  curveVertex(200, horizonY+30);
  curveVertex(270, horizonY+90);
  curveVertex(110, horizonY+40);
  curveVertex(130, horizonY+190);
  curveVertex(10, horizonY+150);
  curveVertex(70, height);
  curveVertex(70, height);
  endShape();
  
  beginShape();
  curveVertex(500, horizonY+20);
  curveVertex(550, horizonY+20);
  curveVertex(470, horizonY+30);
  curveVertex(460, horizonY+90);
  curveVertex(400, horizonY+40);
  curveVertex(480, horizonY+190);
  curveVertex(430, horizonY+150);
  curveVertex(380, height);
  curveVertex(380, height);
  endShape();
  
  beginShape();
  curveVertex(300, horizonY+20);
  curveVertex(350, horizonY+20);
  curveVertex(270, horizonY+60);
  curveVertex(260, horizonY+150);
  curveVertex(200, horizonY+230);
  curveVertex(280, horizonY+190);
  curveVertex(230, horizonY+150);
  curveVertex(580, height);
  curveVertex(380, height);
  endShape();
  
  beginShape();
  curveVertex(720, horizonY+20);
  curveVertex(720, horizonY+20);
  curveVertex(740, horizonY+40);
  curveVertex(770, horizonY+70);
  curveVertex(760, horizonY+90);
  curveVertex(780, horizonY+110);
  curveVertex(730, horizonY+200);
  curveVertex(720, height);
  curveVertex(720, height);
  endShape();
  
  beginShape();
  curveVertex(700, horizonY+20);
  curveVertex(750, horizonY+20);
  curveVertex(600, horizonY+30);
  curveVertex(670, horizonY+90);
  curveVertex(610, horizonY+40);
  curveVertex(630, horizonY+190);
  curveVertex(610, horizonY+150);
  curveVertex(670, height);
  curveVertex(60, height);
  endShape();
  
  beginShape();
  curveVertex(800, horizonY+20);
  curveVertex(850, horizonY+20);
  curveVertex(870, horizonY+30);
  curveVertex(860, horizonY+90);
  curveVertex(800, horizonY+40);
  curveVertex(880, horizonY+190);
  curveVertex(830, horizonY+150);
  curveVertex(880, height);
  curveVertex(880, height);
  endShape();
  
  beginShape();
  curveVertex(1000, horizonY+20);
  curveVertex(1050, horizonY+20);
  curveVertex(970, horizonY+30);
  curveVertex(960, horizonY+90);
  curveVertex(900, horizonY+40);
  curveVertex(980, horizonY+190);
  curveVertex(930, horizonY+150);
  curveVertex(980, height);
  curveVertex(980, height);
  endShape();
  
  beginShape();
  curveVertex(1000, horizonY+20);
  curveVertex(1050, horizonY+20);
  curveVertex(1170, horizonY+60);
  curveVertex(1160, horizonY+150);
  curveVertex(1100, horizonY+230);
  curveVertex(1180, horizonY+190);
  curveVertex(1130, horizonY+150);
  curveVertex(1080, height);
  curveVertex(1080, height);
  endShape();
  
  beginShape();
  curveVertex(1300, horizonY+20);
  curveVertex(1350, horizonY+20);
  curveVertex(1270, horizonY+60);
  curveVertex(1260, horizonY+150);
  curveVertex(1200, horizonY+230);
  curveVertex(1280, horizonY+190);
  curveVertex(1230, horizonY+150);
  curveVertex(1580, height);
  curveVertex(1380, height);
  endShape();
  
  beginShape();
  curveVertex(1320, horizonY+20);
  curveVertex(1320, horizonY+20);
  curveVertex(1340, horizonY+40);
  curveVertex(1370, horizonY+70);
  curveVertex(1360, horizonY+90);
  curveVertex(1380, horizonY+110);
  curveVertex(1330, horizonY+200);
  curveVertex(1320, height);
  curveVertex(1320, height);
  endShape();
  
  beginShape();
  curveVertex(1300, horizonY+20);
  curveVertex(1350, horizonY+20);
  curveVertex(1300, horizonY+30);
  curveVertex(1270, horizonY+90);
  curveVertex(1210, horizonY+40);
  curveVertex(1230, horizonY+190);
  curveVertex(1310, horizonY+150);
  curveVertex(1270, height);
  curveVertex(1300, height);
  endShape();
  
  beginShape();
  curveVertex(1500, horizonY+20);
  curveVertex(1550, horizonY+20);
  curveVertex(1500, horizonY+30);
  curveVertex(1470, horizonY+90);
  curveVertex(1410, horizonY+40);
  curveVertex(1430, horizonY+190);
  curveVertex(1510, horizonY+150);
  curveVertex(1470, height);
  curveVertex(1500, height);
  endShape();
  
  beginShape();
  curveVertex(1600, horizonY+20);
  curveVertex(1650, horizonY+20);
  curveVertex(1670, horizonY+30);
  curveVertex(1560, horizonY+90);
  curveVertex(1600, horizonY+40);
  curveVertex(1580, horizonY+190);
  curveVertex(1630, horizonY+150);
  curveVertex(1680, height);
  curveVertex(1680, height);
  endShape();
}