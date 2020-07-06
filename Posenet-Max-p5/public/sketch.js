
var markers = [];
var socket;
var video;
var poseNet;
var pose;
var balancepointsJSON = {};

var soundEngine;
// Sound variables
var drum;
var perc;
var synthA;
var synthB;
var synthState = {
  ON: 1,
  OFF: 0
};
var synthButtonPressedState;
// UI elements
var sliderRate;
var sliderPan;
var checkBoxAmbientSynth;
var checkBoxLeadSynth;
var checkBoxDrum;
var checkBoxPerc;
var sliderDrum;
var sliderPerc;
var sliderSynthA;
var sliderSynthB;
var checkBoxParticleAnim;
var checkboxFFTAnim;
var checkboxAmplitudeAnim;
var enablePose = false;
var checkBoxPose;
var checkBoxSynthToggle;
var checkBoxSynthToggleButton;
var particles = [];

// Sound properties
var amp;
var ampHistory = [];
var fft_drum;
var fft_synthA;
var fft_synthB;
var fft_perc;
var peakDetect;
var isModelLoaded = false;
var vel;


function preload() {
  // Preload all media
  drum = loadSound("media/Drum.wav");
  perc = loadSound("media/Perc.wav");
  synthA = loadSound("media/synthA.wav");
  synthB = loadSound("media/synthB.wav");
}

function setup() {
  let cnv = createCanvas(1280, 720);
  cnv.position(150,0);
  angleMode(DEGREES);
  for(var i=0; i < 5; i++) {
    particles.push(new Particle(createVector(random(width), random(height)),100,random(8), color(random(255), random(255),random(255)))); 
  }
  /* Initialize all sound property objects*/
  amp = new p5.Amplitude();
  peakDetect = new p5.PeakDetect(300,700); 
  fft_drum = new p5.FFT(0, 64);
  fft_drum.setInput(drum);
  fft_perc = new p5.FFT(0, 64);
  fft_perc.setInput(perc);
  fft_synthA = new p5.FFT(0, 64);
  fft_synthA.setInput(synthA);
  fft_synthB = new p5.FFT(0, 64);
  fft_synthB.setInput(synthB); 
  soundEngine = new SoundClass();

  /* Initialise marker array */
  initMarkers();
  initializeUI();
  initializePosenet();
  
  /* Intiailize socket to listen on port 3000 */
  socket = io.connect('http://localhost:3000');
  socket.on('counter', counterLog);

}

function counterLog(value) {
  //var obj = JSON.parse(value);
  console.log("recieved from max" + value);
}

function initMarkers() {
    //intialize empty markers for 17 points
    for(let i = 0; i < 17; i++) {
      markers.push(new marker());
    }
}

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

function initializeUI() {
  /* Initializing all the UI elements here */

  /*
  checkBoxDrum = createCheckbox("Drum", false);
  checkBoxDrum.changed(checkBoxDrumChanged);
  sliderDrum = createSlider(0,1,0.5,0.01);
  checkBoxPerc = createCheckbox("Percussion", false);
  checkBoxPerc.changed(checkBoxPercChanged);
  sliderPerc = createSlider(0,1,0.5,0.01);
  checkBoxAmbientSynth = createCheckbox("Ambient Synth", false);
  checkBoxAmbientSynth.changed(checkBoxAmbientSynthChanged);
  sliderSynthA = createSlider(0,1,0.5,0.01);
  checkBoxLeadSynth = createCheckbox("Lead Synth", false);
  checkBoxLeadSynth.changed(checkBoxLeadSynthChanged);
  sliderSynthB = createSlider(0,1,0.5,0.01);
  */
  checkBoxPose = createCheckbox("Enable Pose Detection", true );
  checkBoxPose.changed(checkBoxPoseChanged);
  checkBoxPose.position(150,730);

  /* Creating the synth toggle button and applying styling */
  synthToggleButton = createButton("PERCOLATE");
  synthToggleButton.style('background-color: #4CAF50; border-radius: 8px;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block; font-size: 16px');
  synthToggleButton.position(150,20);
  synthToggleButton.mousePressed(synthButtonPressed);
  synthButtonPressedState = synthState.OFF;  
  
  /* UI Animation Checkboxes */
  checkBoxParticleAnim = createCheckbox("Show Particles", false);
  
  /* FFT and Amplitude Animation visualisation */
  /*
  checkboxFFTAnim = createCheckbox("Graphic EQ", false);
  checkboxAmplitudeAnim = createCheckbox("Volume Graph", false);
  */

}

function initializeSound() {
  /* Initializing Tone JS sound Engine*/
  soundEngine.initSound();
  soundEngine.initTone();
}

// Callbacks for checkbox selection events
/*
function checkBoxDrumChanged() {
  if (this.checked()) {
    console.log('Checking Drums!');
    fft_drum = new p5.FFT(0, 64);
    fft_drum.setInput(drum);
    drum.loop();
 
  } else {
    console.log('Unchecking Drums!');
    drum.stop();
    fft_drum = undefined;
  }
}
function checkBoxPercChanged() {
  if (this.checked()) {
    console.log('Checking Percussion!');
    fft_perc = new p5.FFT(0, 64);
    fft_perc.setInput(perc);
    perc.loop();
  } else {
    console.log('Unchecking Percussion!');
    perc.stop();
    fft_perc = undefined;
  }
}
function checkBoxAmbientSynthChanged() {
  if (this.checked()) {
    fft_synthA = new p5.FFT(0, 64);
    fft_synthA.setInput(synthA);
    synthA.loop();
  } else {
    synthA.stop();
    fft_synthA = undefined;
  }
}

function checkBoxLeadSynthChanged() {
  if (this.checked()) {
    fft_synthB = new p5.FFT(0, 64);
    fft_synthB.setInput(synthB);
    synthB.loop();
  } else {
    synthB.stop();
    fft_synthB = undefined;
  }
}
*/

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

/* Callback for snth button pressed event */ 
function synthButtonPressed() {
  if(synthButtonPressedState == synthState.OFF)
  {
    socket.emit('synth',synthState.ON);
    synthToggleButton.style('background-color', '#f44336');
    synthButtonPressedState = synthState.ON;
  } else {
    socket.emit('synth',synthState.OFF);
    synthToggleButton.style('background-color', '#4CAF50');
    synthButtonPressedState = synthState.OFF;
  }
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

/* Primary draw function which draws graphics on canvas based on pose data recieved */
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

  /* Condition to check the confidence scores of the relevant parts 
     
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
}

/* Draw function for the displaying graphics on canvas */
function drawLines() {
  // console.log('drawLines');

  var centroid = getCentroid();
  fill(28,128,128);
  ellipse(centroid[0], centroid[1], 20, 20)
  ellipse(pose.nose.x, pose.nose.y, 50,50);
  stroke(240,255,255);
  strokeWeight(1);
  line(width/2, height, centroid[0], centroid[1]);
  line(pose.nose.x, pose.nose.y, centroid[0], centroid[1]);
  line(pose.leftWrist.x, pose.leftWrist.y, pose.rightWrist.x, pose.rightWrist.y);

  /* Draw balance points - Center of the line joining the wrist */
  drawBalancePoints(pose.leftWrist, pose.rightWrist, 'wrist');

  /* Add the wrist distance to payloadJSON*/
  var payloadData = {};
  payloadData['wristDistance'] = getDistance(pose.leftWrist, pose.rightWrist);
  payloadData['leftWrist'] = pose.leftWrist;
  payloadData['rightWrist'] = pose.rightWrist;
  payloadData['cgTilt'] =   getCentroidTilt(centroid);
  updatePayloadJSONData(payloadData);
  
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
  var midY = (left.y + right.y) /2;
  line(midX, midY , midX, height);
}

/* Determine the angle of the tile w.r.t the gravity perpendicular vector*/
function getCentroidTilt(centroid) {
  var v1 = createVector(centroid[0], centroid[1]);
  var v2 = createVector(width/2, height);
  var v3 = createVector(0, height);
  var v4 = v2.sub(v1);
  // left tilt is -ve , right tilt is +ve
  var angleDiff = v4.angleBetween(v3);
  // console.log('pointbal angle' + angleDiff);
  return angleDiff;
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
  var tiltAngle = -angleDiff;
 
  noStroke();
  fill(255*sin(abs(tiltAngle)),255*cos(abs(tiltAngle)),0);

  /* Draw triangle on top of canvas at balance point */
  var balancePointx = width/2 * (1 + sin(tiltAngle));
  triangle(balancePointx, 0, balancePointx + 10, 20, balancePointx - 10, 20);
  

  var angleObject = {};
  angleObject[position + 'Angle'] = tiltAngle;
  updatePayloadJSONData(angleObject);

  
  var ratio = ((rVec.dist(cVec))*sin(tiltAngle)) / 3;
  //console.log(sin(angle) + " " + cos(angle) + " " + ratio);
  
  /* Draw the balance points - more the tilt more the displacement from center*/
  for(var i=1; i <= 3 ;i++) {
    ellipse(cVec.x+i*ratio*cos(tiltAngle), cVec.y+i*ratio*sin(tiltAngle), 10,10);
  }
}

/* Function to get distance between 2 points*/
function getDistance(point1, point2) {
  var v1 = createVector(point1.x, point1.y);
  var v2 = createVector(point2.x, point2.y);
  return abs(v1.dist(v2))
}

/* Update the JSON payload 
   JSON Structure:
   {{ UPDATE FINAL JSON STRUCTURE HERE
    
   }}
*/
function updatePayloadJSONData(data) {
  balancepointsJSON = Object.assign(balancepointsJSON, data);
}

// Drawing the reference grid
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
  textSize(10);

  if(!isModelLoaded) {
    text('INTIALIZING', 0, 10);
  } else {
    text("READY ! FPS: " + frameRate().toFixed(2), 0, 10);
  }
}

function fftAnim() {
  // FFT animation is drawn using lines and along the length and width of the canvas
  var w = width / 64;
  var h = height / 64;
  if(fft_drum) {
    stroke(random(255),0,0);
    fill(random(255),0,0);
    var spec_drum = fft_drum.analyze();
    peakDetect.update(fft_drum);
    if(peakDetect.isDetected) {
      // Detect peaks in amplitude and draw ellipse at the center of the screen 
      // default setting at 0.5
      ellipse(width/2,height/2,50,50);
    }

    for(var i = 0; i < spec_drum.length; i++) {
      // scale the 'y' coordinate according to the FFT value 
      var y = map(spec_drum[i], 0, 256, 0, 50);
      // draw the line with the scaled height
      line(i*w , height/2, i*w, height/2 - y);
    }
  }
  if(fft_synthA) {
    stroke(0,random(255),0);
    fill(0,random(255),0);
    var spec_synthA = fft_synthA.analyze();
    for(var i = 0; i < spec_synthA.length; i++) {
      var y = map(spec_synthA[i], 0, 256, 0, 50);
      line(width / 2, i*h, width / 2 + y, i*h);
    }
  }
  if(fft_synthB) {
    stroke(0,random(255),0);
    fill(0,0,random(255));
    var spec_synthB = fft_synthB.analyze();
    for(var i = 0; i < spec_synthB.length; i++) {
      var y = map(spec_synthB[i], 0, 256, 0, 50);
      line(width / 2, i*h, width / 2 - y, i*h);
    }
  }
  if(fft_perc) {
    stroke(0,0,random(255));
    var spec_perc = fft_perc.analyze();
    for(var i = 0; i < spec_perc.length; i++) {
      var y = map(spec_perc[i], 0, 256, 0, 50);
      line(i*w , height/2, i*w, height/2 + y);
    }
  }
}

function amplitudeAnim() {
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
}

// Draw particles to screen
function drawParticles() {
  for(var i = 0; i < particles.length; i++) {
    // map the values due to inverted canvas 
    var mapped_x_left = map(pose.leftWrist.x, 0 , 1280, 1280, 0);
    var mapped_x_right = map(pose.rightWrist.x, 0 , 1280, 1280, 0);
    particles[i].update(particles, i, createVector(mapped_x_left,pose.leftWrist.y), createVector(mapped_x_right,pose.rightWrist.y));
  }
  noStroke();
}

// Set all volumes with current slider values
function setVolume() {
  if(sliderDrum) {
    drum.setVolume(sliderDrum.value());
  }
  if(sliderPerc) {
    perc.setVolume(sliderPerc.value());
  }
  if(sliderSynthA) {
    synthA.setVolume(sliderSynthA.value());
  }
  if(sliderSynthB) {
    synthB.setVolume(sliderSynthB.value());
  }
}

function playSounds() {
  /* play sounds based on positions of the markers
    left and right wrist above midpoints height plays synths
    shoulder left and right beyond the 1/3rd of width plays percussions
  */
  if(Math.floor(pose.rightWrist.y) < 360 && checkBoxAmbientSynth.checked()) {
    if(!synthA.isPlaying()) {
      synthA.play();
    }
  } else {
    if(synthA.isPlaying()) {
      synthA.stop();
    }
  }
  if(Math.floor(pose.leftWrist.y) < 360 && checkBoxLeadSynth.checked()) {
    if(!synthB.isPlaying()) {
      synthB.play();
    }
  } else {
    if(synthB.isPlaying()) {
      synthB.stop();
    }
  }
  if(Math.floor(pose.leftShoulder.x) > 840 && pose.leftShoulder.confidence > 0.5 && checkBoxPerc.checked()) {
    if(!perc.isPlaying()) {
      perc.play();
    }
  } else {
    if(perc.isPlaying()) {
      perc.stop();
    }
  }
  if(Math.floor(pose.rightShoulder.x) < 420 && pose.rightShoulder.confidence > 0.5 && checkBoxDrum.checked()) {
    if(!drum.isPlaying()) {
      drum.play();
    }
  } else {
    if(drum.isPlaying()) {
      drum.stop();
    }
  }
}
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

// Main draw() function loop
function draw() {
  background(0);
  drawGrid();

  drawAnimation();
  
  // sets the volume of the audio loops
  setVolume();
  
  if(pose) {
    // Process only if pose data is available
    // console.log(pose);
    
    //socket.emit('pose', JSON.stringify(pose));
  
    // playSounds();

    if(checkBoxPose) {
      drawSkeleton();
    }
  }
}

