let xpos = 480;


function setup() {
  bleSetup();
  createCanvas(960, 540);
}

function draw() {
  background(0,0,0);
  fill(255,255,0);
  ellipse(xpos, 270, 80, 80);
}

function getValue(value) {
  xpos = value * 100 + 480;
}