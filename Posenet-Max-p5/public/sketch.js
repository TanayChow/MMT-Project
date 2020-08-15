// Primary data structures
var markers = [];
var socket;
var video;
var poseNet;
var pose;
var balancepointsJSON = {};

// Balance variables
var tiltAngle = 0; 
var cgTilt = 0;

// Sound variables
var synthState = {
  ON: 1,
  OFF: 0
};
var synth1State;
var synth2State;
var synth3State;
var synth1ButtonPressedState;
var synth2ButtonPressedState;

// UI element variables
var sliderMix1;
var sliderMix2;
var sliderMix3;
var sliderMix4;
var checkBoxParticleAnim;
var checkboxFFTAnim;
var checkboxAmplitudeAnim;
var checkBoxPose;
var checkBoxSynthToggle;
var checkBoxSynthToggleButton;
var orbitParticles = [];

// flags
var enablePose = false;
var isModelLoaded = false;

// Sound properties
var amp;
var ampHistory = [];
var fft_drum;
var peakDetect;
var vel;
var mic;
// variables for cardioid animation
let r;
let factor = 0;
// variables for flow animation
let snow = [];
let gravity;
let zOff = 0;

function preload() {
  // Preload fonts
  myFont = loadFont('assets/fonts/LandasansMedium-ALJ6m.otf');
  myNumFont = loadFont('assets/fonts/JerseyM54-aLX9.ttf')
}

/* --------------------------------------- SETUP AND INTIALIZATIONS START -----------------------------------------------------------*/
function setup() {
  /* Initialize canvas */

  let cnv = createCanvas(1280, 720);
  r = height / 2 ;
  cnv.position(150,0);
  angleMode(DEGREES);

  /* Orbit particles array created */
  for(var i=0; i < 4; i++) {
    orbitParticles.push(new OrbitParticle(random(width), random(height))); 
  }

  /* Initialize all sound property objects*/
  //amp = new p5.Amplitude();
  peakDetect = new p5.PeakDetect(300,700); 
  fft_drum = new p5.FFT(0, 16);
  mic = new p5.AudioIn();
  mic.getSources().then((data)=> {
    console.log(data);
    mic.setSource(1);
    mic.start();
    userStartAudio();
    fft_drum.setInput(mic);
  })

  /* Initialise marker array */
  initMarkers();
  /* Initialise UI elements */
  initializeUI();
  /* Initialise video feed and posenet */
  initializePosenet();
  /* Initialize flow animation objects*/
  setupSnow();

  /* Intiailize socket to listen on port 3000 */
  socket = io.connect('http://localhost:3000');
  // socket.on('counter', counterLog);
}

/*
// Callback to handle incoming data from MAX-MSP
function counterLog(value) {
  //var obj = JSON.parse(value);
  console.log("recieved from max" + value);
}
*/

/* Initialize markers */
function initMarkers() {
    //intialize empty markers for 17 points
    for(let i = 0; i < 17; i++) {
      markers.push(new marker());
    }
}

/* Initialize posenet */
function initializePosenet() {
  let constraints = {
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      }
    },
    audio: false
  };
  
  video = createCapture(constraints, function(stream) {
    console.log(stream);
  });
  
  //video = createCapture(VIDEO);
  video.hide();
  /* PoseNet initialization
  Adapted from https://github.com/tensorflow/tfjs-models/tree/master/posenet

  architecture - Can be either MobileNetV1 or ResNet50.
  
  outputStride - Can be one of 8, 16, 32 (Stride 16, 32 are supported for the ResNet architecture and stride 8, 16, 32 
  are supported for the MobileNetV1 architecture). It specifies the output stride of the PoseNet model. 
  The smaller the value, the larger the output resolution, and more accurate the model at the cost of speed. 
  Set this to a larger value to increase speed at the cost of accuracy.

  inputResolution - A number or an Object of type {width: number, height: number}. Defaults to 257. 
  It specifies the size the image is resized and padded to before it is fed into the PoseNet model. 
  The larger the value, the more accurate the model at the cost of speed. Set this to a smaller value 
  to increase speed at the cost of accuracy. If a number is provided, the image will be resized and padded 
  to be a square with the same width and height. If width and height are provided, the image will be resized 
  and padded to the specified width and height.

  multiplier - Can be one of 1.0, 0.75, or 0.50 (The value is used only by the MobileNetV1 architecture and not by the ResNet 
  architecture). It is the float multiplier for the depth (number of channels) for all convolution ops. 
  The larger the value, the larger the size of the layers, and more accurate the model at the cost of speed. 
  Set this to a smaller value to increase speed at the cost of accuracy.

  quantBytes - This argument controls the bytes used for weight quantization. The available options are:

  4. 4 bytes per float (no quantization). Leads to highest accuracy and original model size (~90MB).
  2. 2 bytes per float. Leads to slightly lower accuracy and 2x model size reduction (~45MB).
  1. 1 byte per float. Leads to lower accuracy and 4x model size reduction (~22MB).

  modelUrl - An optional string that specifies custom url of the model. This is useful for local development or countries that don't have access to the model hosted on GCP.
  */
  poseNet = ml5.poseNet(video,{
    architecture: 'MobileNetV1',
    outputStride: 16,
    //inputResolution: { width: 200, height: 480 }, defaults to 257
    multiplier: .75,
    quantBytes: 4,
    detectionType: 'single',
    /*flipHorizontal: false*/
  }, modelLoaded);
  poseNet.on('pose', getPoses);
}

  /* 
    Initializing all the UI elements here 
    Creates the buttons, checkboxes, sliders and indicator icons 
  */
function initializeUI() {
  /* create pose detection option checkbox */
  checkBoxPose = createCheckbox("Enable Pose Detection", true );
  checkBoxPose.changed(checkBoxPoseChanged);
  checkBoxPose.position(150,730);

  /* Creating the synth1 toggle button and applying styling */
  synth1ToggleButton = createButton("");
  synth1ToggleButton.class('fas fa-wind fa-3x');
  synth1ToggleButton.style('background-color: #595F72; ');
  /* Creating the synth1 toggle button event handler */
  synth1ToggleButton.mousePressed(synth1ButtonPressed);
  synth1ButtonPressedState = synthState.OFF;  
  /* Creating synth1 slider */
  sliderMix1 = createSlider(0,1,0.5,0.01);
  sliderMix1.style('background : #595F72');

  /* Creating the synth2 toggle button and applying styling */
  synth2ToggleButton = createButton("");
  synth2ToggleButton.class('fas fa-water fa-3x');
  synth2ToggleButton.style('background-color: #575D90;');
 /* Creating the synth2 toggle button event handler */
  synth2ToggleButton.mousePressed(synth2ButtonPressed);
  synth2ButtonPressedState = synthState.OFF;
 /* Creating synth2 slider */
  sliderMix2 = createSlider(0,1,0.5,0.01);
  sliderMix2.style('background : #575D90');


  /* Creating the synth3 toggle button and applying styling */
  synth3ToggleButton = createButton("");
  synth3ToggleButton.class('fas fa-wave-square fa-3x');
  synth3ToggleButton.style('background-color: #507DBC;');
 /* Creating the synth3 toggle button event handler */
  synth3ToggleButton.mousePressed(synth3ButtonPressed);
  synth3ButtonPressedState = synthState.OFF;
 /* Creating synth3 slider */
  sliderMix3 = createSlider(0,1,0.5,0.01);
  sliderMix3.style('background : #507DBC');
  
  /* UI Animation Checkboxes */
  //checkBoxParticleAnim = createCheckbox("Show Particles", false);
  
  /* FFT and Amplitude Animation visualisation */
  /**/
  checkboxFFTAnim = createCheckbox("Graphic EQ", false); 
  // checkboxAmplitudeAnim = createCheckbox("Volume Graph", false);
 
  // Initialize the tilt balance indicator icons
  divLeftUp = createDiv('<i class="fas fa-arrow-circle-up fa-5x"></i>').position(300,300);
  divLeftUp.style('background : #4D5057; border-radius: 50%');
  divLeftUp.hide();
  divLeftDown = createDiv('<i class="fas fa-arrow-circle-down fa-5x"></i>').position(300,300);
  divLeftDown.style('background : #4D5057; border-radius: 50%');
  divLeftDown.hide();
  divRightUp = createDiv('<i class="fas fa-arrow-circle-up fa-5x"></i>').position(1200,300);
  divRightUp.style('background : #4D5057; border-radius: 50%');
  divRightUp.hide();
  divRightDown = createDiv('<i class="fas fa-arrow-circle-down fa-5x"></i>').position(1200,300);
  divRightDown.style('background : #4D5057; border-radius: 50%');
  divRightDown.hide();

  // Initialize the CG balance indicator icons
  divCGLeft = createDiv('<i class="fas fa-chevron-circle-left fa-5x"></i>').position(400,300);
  divCGLeft.style('background : #4D5057; border-radius: 50%');
  divCGLeft.hide();
  divCGRight = createDiv('<i class="fas fa-chevron-circle-right fa-5x"></i>').position(1100,300);
  divCGRight.style('background : #4D5057; border-radius: 50%');
  divCGRight.hide();
  
}

/* Setup for flow animation */
function setupSnow() {
  gravity = createVector(0, 0.3);

  for (let i = 0; i < 150; i++) {
    let x = random(width);
    let y = random(height);
    snow.push(new Snowflake(x, y));
  }
}

/* --------------------------------------- SETUP AND INTIALIZATIONS END -----------------------------------------------------------*/

/* --------------------------------------- EVENT HANDLERS AND CALLBACKS START -----------------------------------------------------------*/
/* Callback to reset poseNet */
function checkBoxPoseChanged() {
  if (this.checked()) {
    intializePosenet();
  } else {
    video.remove();
    clearMarkers();
    poseNet = null;
  }
}

/* Callback for synth 1 button pressed event */ 
function synth1ButtonPressed() {
  if(synth1ButtonPressedState == synthState.OFF)
  {
    synth1ToggleButton.style('background-color', '#EE6055');
    synth1ButtonPressedState = synthState.ON;
  } else {
    synth1ToggleButton.style('background-color', '#595F72');
    synth1ButtonPressedState = synthState.OFF;
  }
  socket.emit('synth',synth1ButtonPressedState, synth2ButtonPressedState, synth3ButtonPressedState);
}

/* Callback for synth 2 button pressed event */ 
function synth2ButtonPressed() {
  if(synth2ButtonPressedState == synthState.OFF)
  {
    synth2ToggleButton.style('background-color', '#EE6055');
    synth2ButtonPressedState = synthState.ON;
  } else {
    synth2ToggleButton.style('background-color', '#575D90');
    synth2ButtonPressedState = synthState.OFF;
  }
  socket.emit('synth',synth1ButtonPressedState, synth2ButtonPressedState, synth3ButtonPressedState);
}

/* Callback for synth 3 button pressed event */ 
function synth3ButtonPressed() {
  if(synth3ButtonPressedState == synthState.OFF)
  {
    synth3ToggleButton.style('background-color', '#EE6055');
    synth3ButtonPressedState = synthState.ON;
  } else {
    synth3ToggleButton.style('background-color', '#507DBC');
    synth3ButtonPressedState = synthState.OFF;
  }
  socket.emit('synth',synth1ButtonPressedState, synth2ButtonPressedState, synth3ButtonPressedState);
}

/* Clear all marker data */
function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].clear();
  }
}

/* Callback for posenet model load complete */
function modelLoaded() {
  // console.log("MODEL LOADED");
  isModelLoaded = true;
}

/* Callback from posenet once single pose data is received 
   @parameter poses JSON object containing pose data of 17 key-points
*/
function getPoses(poses) {
  // console.log("getPoses - ");
  if(poses.length > 0) {
    pose = poses[0].pose;
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      let weight = 1;
      markers[i].update(x, y, weight);
    }
  }
}
/* --------------------------------------- EVENT HANDLERS AND CALLBACKS END -----------------------------------------------------------*/

/* --------------------------------------- DRAW UI ELEMENTS START -----------------------------------------------------------*/
/* Function to draw the reference grid elements */
function drawGrid() {
  stroke(211,211,211);
  strokeWeight(0.5);
  line(420,0,420,900);
  line(840,0,840,900)
  line(0,240,1280,240);
  line(0,480,1280,480);
  noFill();
  ellipse(width/2, height/2, height, height);
  fill(255);
  ellipse(width/2, height/2, 10,10);
  stroke(0);

  if(!isModelLoaded) {
    t1 = text('INTIALIZING', 10, 700);
  } else {
    t1 = text("FPS: " + frameRate().toFixed(2), 50, 700);
  }
  t2 = text("TILT: " + tiltAngle.toFixed(2), 1100, 30);
  t2 = text("CG: " + cgTilt.toFixed(2), 50, 30);
  t1.textSize(30);
  t1.textFont(myNumFont);
}

/* Function to draw graphics on canvas based on pose data recieved */
function drawSkeleton() {
  // Points returned by Posenet are inverted along the 'x' direction due to mirroring
  // Translating the points to represent correct mirroring
  push();
  translate(video.width, 0);
  scale(-1,1);

  /* Uncomment to draw video to screen
  image(video,0,0, video.width, video.height);
  filter(GRAY); 
  */

  /* Loop - uncomment to show all the markers */
  /*
  for (let i = 0; i < markers.length; i++) {
    markers[i].show();
  }
  */

  /* 
    Condition to check the confidence scores of the relevant parts 
    Confidence threshold of 0.3 is used. This means that draw will happen only when 
    poseNet is sure that the relevant keypoint is correct with > 30% probability 
  */
  if(pose.leftEar.confidence > 0.3 && pose.rightEar.confidence > 0.3
      && pose.leftShoulder.confidence > 0.3 && pose.rightShoulder.confidence > 0.3 
      && pose.leftWrist.confidence > 0.3 && pose.rightWrist.confidence > 0.3)
      {
        drawLines();
      }
  pop();

  /* 
    Conditional checks to display indicators
    tiltAngle, cgTilt thresholds control indicator displays
  */
  if(tiltAngle > 20) {
    divLeftDown.show();
    divRightUp.show();
  } else {
    divLeftDown.hide();
    divRightUp.hide();
  }
  if(tiltAngle < -20) {
    divLeftUp.show();
    divRightDown.show();
  } else {
    divRightDown.hide();
    divLeftUp.hide();
  }
  if(cgTilt > 10) {
    divCGRight.show();
    divCGLeft.hide();
  } else {
    divCGRight.hide();
  }
  if(cgTilt < -10) {
    divCGLeft.show();
    divCGRight.hide();
  } else {
    divCGLeft.hide();
  }
}

/* Draw function for the displaying pose graphics on canvas */
function drawLines() {
  // console.log('drawLines');

  var centroid = getCentroid();
  fill(252, 246, 177);
  //ellipse(centroid[0], centroid[1], 20, 20)
  ellipse(pose.nose.x, pose.nose.y, 50,50);
  stroke(218, 227, 229);
  strokeWeight(1.5, .5);
  /* 
    Draw the pose - connector points 
    CG line to centroid
    CG to Face connector
    Left Wrist - Right Wrist connector
  */
  line(width/2, height, centroid[0], centroid[1]);
  line(pose.nose.x, pose.nose.y, centroid[0], centroid[1]);
  line(pose.leftWrist.x, pose.leftWrist.y, pose.rightWrist.x, pose.rightWrist.y);

  /* Draw orbit particles - these particles move towards the specified coordinates with constant acceleration */
  orbitParticles[0].update(pose.leftWrist.x, pose.leftWrist.y);
  orbitParticles[1].update(pose.rightWrist.x, pose.rightWrist.y);
  orbitParticles[2].update(centroid[0], centroid[1]);
  orbitParticles[3].update(pose.nose.x, pose.nose.y);
  orbitParticles[0].render();
  orbitParticles[1].render();
  orbitParticles[2].render();

  /* Draw balance points - Center of the line joining the wrist */
  drawBalancePoints(pose.leftWrist, pose.rightWrist, 'wrist');
  cgTilt = getCentroidTilt(centroid)
  
  /* Add the wrist distance to payload JSON*/
  var payloadData = {};
  payloadData['wristDistance'] = getDistance(pose.leftWrist, pose.rightWrist);
  payloadData['leftWrist'] = pose.leftWrist;
  payloadData['rightWrist'] = pose.rightWrist;
  payloadData['cgTilt'] =  cgTilt ;
  updatePayloadJSONData(payloadData);
  
  /* Send JSON data (payload object) to server */
  socket.emit('balance', JSON.stringify(balancepointsJSON));
  // console.log(balancepointsJSON);
  
  /* Reset the JSON data*/
  balancepointsJSON = {};
}

/*  Draw vertical lines from the midpoint of keypoints to the ground 
    @params left - Left Keypoint
    @params right - right Keypoint
*/
function drawGravityLines(left, right) {
  stroke(255,0,0);
  var midX = (left.x + right.x) / 2;
  var midY = (left.y + right.y) / 2;
  line(midX, midY , midX, height);
}

/* Draw ellipse at the point with the position - These points are dynamic and depend
   on the angle of the tilt 
   left - left coordinates
   right - right coordinates
   position - string indicating the position of the marker   
*/
function drawBalancePoints(left,right, position) {
  var midpointx = (left.x + right.x) / 2;
  var midpointy = (left.y + right.y) / 2; 
  
  var cVec = createVector(midpointx, midpointy);
  var rVec = createVector(right.x, right.y);
  var lVec = createVector(left.x, left.y);
  var vecd =  lVec.sub(rVec);
  var m = (right.y - left.y) / (right.x - left.x);
  var angle = degrees(atan(radians(m)));
  var angleDiff = vecd.angleBetween(createVector(width,0));
  // angle & angleDiff are approximately equal
  // angleDiff is more accurate but its value has opposite sign
  // '-ve' angleDiff is used
  // console.log(angled + ' --- ' + angle);
  
  // tiltAngle +ve if tilt towards left, -ve if tilt towards right 
  tiltAngle = -angleDiff;

  noStroke();
  fill( 255 * sin(abs(tiltAngle)), 255 * cos(abs(tiltAngle)), 0);

  /* Draw triangle on top of canvas at balance point */
  var balancePointx = width/2 * (1 + sin(tiltAngle));
  triangle(balancePointx, 0, balancePointx + 20, 40, balancePointx - 20, 40);
  
  /* Update JSON */
  var angleObject = {};
  angleObject[position + 'Angle'] = tiltAngle;
  updatePayloadJSONData(angleObject);

  var ratio = ((rVec.dist(cVec)) * sin(tiltAngle)) / 3;
  //console.log(sin(angle) + " " + cos(angle) + " " + ratio);
  
  /* Draw the balance points - more the tilt - more the displacement from center */
  for(var i=1; i <= 3 ;i++) {
    ellipse(cVec.x + i * ratio * cos(tiltAngle), cVec.y + i * ratio * sin(tiltAngle), 15,15);
  }
}
/* --------------------------------------- DRAW UI ELEMENTS END-----------------------------------------------------------*/

/* --------------------------------------- UTILITY FUNCTIONS START -----------------------------------------------------------*/
/* Helper function to get distance between 2 points */
function getDistance(point1, point2) {
  var v1 = createVector(point1.x, point1.y);
  var v2 = createVector(point2.x, point2.y);
  return abs(v1.dist(v2))
}

/* Helper function to determine the angle of the tile w.r.t the gravity perpendicular vector */
function getCentroidTilt(centroid) {
  var v1 = createVector(centroid[0], centroid[1]);
  var v2 = createVector(width / 2, height);
  var v3 = createVector(0, height);
  var v4 = v2.sub(v1);
  // left tilt is -ve , right tilt is +ve
  var angleDiff = v4.angleBetween(v3);
  // console.log('pointbal angle' + angleDiff);
  return angleDiff;
}

/* Update the JSON payload 
   SAMPLE JSON Structure:
   {{ 
    {
    cgTilt: 45.74586843556536
    leftWrist: {x: 1094.0910544590643, y: 399.41703216374265, confidence: 0.8458935618400574}
    mixer1Vol: 0.5
    mixer2Vol: 0.5
    mixer3Vol: 0.5
    rightWrist: {x: 1106.8632736354775, y: 390.3188961988303, confidence: 0.44771063327789307}
    wristAngle: 144.5362880940947
    wristDistance: 15.68137942677142
    }
   }}
*/
function updatePayloadJSONData(data) {
  balancepointsJSON = Object.assign(balancepointsJSON, data);
}

/* Set all volumes with current slider values */
function setVolume() {
  var payloadData = {};
  if(sliderMix1) {
    payloadData['mixer1Vol'] = sliderMix1.value();
  }
  if(sliderMix2) {
    payloadData['mixer2Vol'] = sliderMix2.value();
  }
  if(sliderMix3) {
    payloadData['mixer3Vol'] = sliderMix3.value();
  }
  if(sliderMix4) {
    payloadData['mixer4Vol'] =  sliderMix4.value();  
  }
  /* update JSON with current slider values */
  updatePayloadJSONData(payloadData);
}

/* --------------------------------------- UTILITY FUNCTIONS END -----------------------------------------------------------*/

/* --------------------------------------- CENTROID CALCULATIONS START-----------------------------------------------------------*/
  /* This method determines the center point of the torso 
     Calculated from the quadilateral formed by 
     left shoulder - right shoulder - left hip - right hip
  */
function getCentroid() {
  var diag1midpointx = (pose.leftShoulder.x + pose.rightHip.x) / 2;
  var diag1midpointy = (pose.leftShoulder.y + pose.rightHip.y) / 2;
  
  var centroid1x = (2*diag1midpointx + pose.leftHip.x) / 3;
  var centroid1y = (2*diag1midpointy + pose.leftHip.y) / 3;
  var centroid2x = (2*diag1midpointx + pose.rightShoulder.x) / 3;
  var centroid2y = (2*diag1midpointy + pose.rightShoulder.y) / 3;

  var diag2midpointx = (pose.rightShoulder.x + pose.leftHip.x) / 2;
  var diag2midpointy = (pose.rightShoulder.y + pose.leftHip.y) / 2;
  
  var centroid3x = (2*diag2midpointx + pose.leftShoulder.x) / 3;
  var centroid3y = (2*diag2midpointy + pose.leftShoulder.y) / 3;
  var centroid4x = (2*diag2midpointx + pose.rightHip.x) / 3;
  var centroid4y = (2*diag2midpointy + pose.rightHip.y) / 3;

  var centroid1 = [centroid1x, centroid1y];
  var centroid2 = [centroid2x, centroid2y];
  var centroid3 = [centroid3x, centroid3y];
  var centroid4 = [centroid4x, centroid4y];
  var quadCentroid = intersect_point(centroid1, centroid2, centroid3, centroid4);
  return quadCentroid;
}

  /* 
  This method determines the intersection point of line segments 
  */
function intersect_point(point1, point2, point3, point4) {
  const ua = ((point4[0] - point3[0]) * (point1[1] - point3[1]) - 
            (point4[1] - point3[1]) * (point1[0] - point3[0])) /
           ((point4[1] - point3[1]) * (point2[0] - point1[0]) - 
            (point4[0] - point3[0]) * (point2[1] - point1[1]));
 
 const ub = ((point2[0] - point1[0]) * (point1[1] - point3[1]) - 
            (point2[1] - point1[1]) * (point1[0] - point3[0])) /
           ((point4[1] - point3[1]) * (point2[0] - point1[0]) - 
            (point4[0] - point3[0]) * (point2[1] - point1[1]));
 
 const x = point1[0] + ua * (point2[0] - point1[0]);
 const y = point1[1] + ua * (point2[1] - point1[1]);
 
 return [x, y]
}
/* --------------------------------------- CENTROID CALCULATIONS END-----------------------------------------------------------*/

/* --------------------------------------- ANIMATIONS START--------------------------------------------------------------------*/
  /* 
  This method renders the Cardioid animation
  Adapted from Daniel Shiffman https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_133_Times_Tables_Cardioid
  */
function drawCardioid() {
  const total = 100;
  // Map increment factor of the times table to the distance between wrists
  let factorinc = map(getDistance(pose.leftWrist, pose.rightWrist), 20, 500, 0.001, 0.015);
  factor += factorinc;
  if(factor == 100) {
    factor =0;
  }
  push();
  translate(width / 2, height / 2);
  stroke(211,211,211);
  strokeWeight(.5);
  noFill();
  ellipse(0, 0, r * 2);

  strokeWeight(0.5);
  for (let i = 0; i < total; i++) {
    const a = getVector(i, total);
    const b = getVector(i * factor, total);
    line(a.x, a.y, b.x, b.y);
  }
  pop();
}

/* 
Helper function for drawCardioid()
*/
function getVector(index, total) {
  const angle = map(index % total, 0, total, 0, TWO_PI);
  const v = p5.Vector.fromAngle(angle + PI);
  v.mult(r);
  return v;
}

/* 
This method renders the flow animation
*/
function drawFlakes() {
  zOff += 0.1;
  // wind flow vector magnitude mapped to cgTilt value
  let k = map(cgTilt, 0, 50, 0.01, .5);
  for (flake of snow) {
    let xOff = flake.pos.x / width;
    let yOff = flake.pos.y / height;
    let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
    let wind = p5.Vector.fromAngle(wAngle);
    wind.mult(-k);

    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.update();
    flake.render();
  }
}

/* Draw function for animations */
function drawAnimation() {
  if(checkboxAmplitudeAnim && checkboxAmplitudeAnim.checked()) {
    amplitudeAnim();
  }
  if(checkboxFFTAnim && checkboxFFTAnim.checked()) {
    fftAnim();
  }
  if(checkBoxParticleAnim && checkBoxParticleAnim.checked()) {
    drawParticles();
  }
}

function fftAnim() {
  // FFT animation is drawn using lines and along the length and width of the canvas
  var w = width / 16;
  var h = height / 16;
  if(fft_drum) {
    //stroke(random(255),0,0);
    fill(0,255,0);
    var spec_drum = fft_drum.analyze();
    console.log(spec_drum);
    peakDetect.update(fft_drum);
    if(peakDetect.isDetected) {
      // Detect peaks in amplitude and draw ellipse at the center of the screen 
      // default setting at 0.5
      ellipse(width / 2,height / 2, 50, 50);
    }
    push();
    translate(width / 2 - 160, height / 2);
    scale(1,-1);
    for(var i = 0; i < spec_drum.length; i++) {
      // scale the 'y' coordinate according to the FFT value 
      var y = map(spec_drum[i], 0, 256, 0, 50);
      // draw the line with the scaled height
      rect( i * 20 , 0, 20, y);
    }
    pop();
    let waveform = fft_drum.waveform();
    noFill();
    beginShape();

    for (let i = 0; i < waveform.length; i++){
      let x = map(i, 0, waveform.length, 0, width);
      let y = map( waveform[i], -1, 1, 0, height);
      vertex(x,y);
    }
    endShape();
  }
}

/*function amplitudeAnim() {
  noFill();
  var amplitude = amp.getLevel();
  var val = ampHistory.push(amplitude);
  stroke(255);
  push();
  translate(width/2,height/2);
  beginShape();
  for(var i = 0; i < 360; i++) {
    // draw points at different positions according to the angle 
    // and the radius scaled according to the amplitude history.
    var r = map(ampHistory[i],0,1,height/2-100,height/2 + 100);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x,y)
  }
  endShape();
  pop();
  if(ampHistory.length > 360) {
    ampHistory.splice(0,1);
  }
}*/

// Draw particles to screen
function drawParticles() {
// Empty Function
}
/* --------------------------------------- ANIMATIONS END--------------------------------------------------------------------*/

/* --------------------------------------- DRAW LOOP --------------------------------------------------------------------*/

// Main draw() function loop
function draw() {
  background(0);
  drawGrid();
  setVolume();
  // drawAnimation();
  
  if(pose) {
    // Process only if pose data is available
    // console.log(pose);

    drawCardioid();
    //drawFlakes();
    if(checkBoxPose) {
      drawSkeleton();

    }
  }
  //console.log(getAudioContext().state);
}

