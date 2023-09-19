let _c1_pos = 480;
let _c2_pos = 480;
let _c3_pos = 480;

// const offset = width/2;
const _canvasWidth = 600;
const _canvasHeight = 800;
const _offset = _canvasHeight / 2.0;
let _accXPlot = - _canvasHeight / 4;
let _accYPlot = 0;
let _accZPlot = _canvasHeight / 4;
let _accX;
let _accY;
let _accZ;
let _rms = 0;
let _distance = 0;

let _fr = 60;

let _pullButton1;
let _pullButton2;
let _pullButton3;
let _vibroButton1;
let _vibroButton2;
let _vibroButton3;
let _servoLeftButton;
let _servoRightButton;
let _servoOscButon;

function setupButtons() {
  _pullButton1 = createButton("Pull 1");
  _pullButton1.position(50, 50);
  _pullButton1.mousePressed(() => {send_ble_data(0x01)});

  _pullButton2 = createButton("Pull 2");
  _pullButton2.position(100, 50);
  _pullButton2.mousePressed(() => {send_ble_data(0x04)});

  _pullButton3 = createButton("Pull 3");
  _pullButton3.position(150, 50);
  _pullButton3.mousePressed(() => {send_ble_data(0x05)});

  _vibroButton1 = createButton("Vibro 1");
  _vibroButton1.position(50, 100);
  _vibroButton1.mousePressed(() => {send_ble_data(0x02)});

  _vibroButton1 = createButton("Vibro 2");
  _vibroButton1.position(125, 100);
  _vibroButton1.mousePressed(() => {send_ble_data(0x08)});
  
  _vibroButton1 = createButton("Vibro 3");
  _vibroButton1.position(200, 100);
  _vibroButton1.mousePressed(() => {send_ble_data(0x0A)});

  _servoLeftButton = createButton("Servo Left");
  _servoLeftButton.position(50, 150);
  _servoLeftButton.mousePressed(() => {send_ble_data(0x10)});
  
  _servoRightButton = createButton("Servo Right");
  _servoRightButton.position(125, 150);
  _servoRightButton.mousePressed(() => {send_ble_data(0x20)});

  _servoOscButton = createButton("Servo Osc");
  _servoOscButton.position(200, 150);
  _servoOscButton.mousePressed(() => {send_ble_data(0x40)});
}

function setup() {
  bleSetup();
  createCanvas(_canvasWidth, _canvasHeight);
  frameRate(_fr);

  setupButtons();

  draw_coordinate();
}
function send_ble_data(val) {
  write_ble([val]);
}


function draw_coordinate() {
  stroke(0);
  line(0, height/2, width, height/2);
  line(width/2, 0, width/2, height);
  return;
}

let _timer = 0
let _pointSize = 2.5;
let _prevPoint = 0;
function drawPoint(val, color) {
  noStroke();
  fill(color);
  ellipse(_timer, -val + _offset, _pointSize, _pointSize);
  _prevPoint = val;
  return;
}

function drawPrevLine(val, color) {
  stroke(color);
  noFill();
  line(_timer - 1, -_prevPoint + _offset, _timer, -val + _offset);
  return;
}


function draw() {
  // background(255, 255, 255);

  // drawPoint(_accX, color(255, 0, 0));

  // drawPoint(_accY, color(0, 255, 0));
  
  // drawPoint(_accZ, color(0, 0, 255));
  drawPrevLine(_rms * height/4, color(0, 255, 255));
  drawPoint(_rms * height/4, color(0, 255, 255));
  // console.log(_rms);
  _timer = (_timer + 1);  
  if (_timer > width) {
    _timer = 0;
    background(255, 255, 255);
    draw_coordinate();
  }

  if (_distance < 100) {
    // send warning
  }
}

function calcRMS(x, y, z) {
  return sqrt(x*x + y*y + z*z) / 3;
}

function setDistance(dis) {
  _distance = dis;
  return;
}

function setAccels(acc_x, acc_y, acc_z) {
  // _c1_pos = acc_x * 100 + 480;
  // _c2_pos = acc_y * 100 + 480;
  // _c3_pos = acc_z * 100 + 480;
  let map_coord = 5;
  let map_accel = 10.0;
  _accX = acc_x;
  _accY = acc_y;
  _accZ = acc_z;
  _accXPlot = acc_x * (map_coord * height) / map_accel;
  _accYPlot = acc_y * (map_coord * height) / map_accel;
  _accZPlot = acc_z * (map_coord * height) / map_accel;
  _rms = calcRMS(acc_x, acc_y, acc_z);
  return;
}