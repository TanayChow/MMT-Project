var markers = [];
var socket;
var video;
var poseNet;
var pose;

var soundEngine;
// Sound variables
var drum;
var perc;
var synthA;
var synthB;

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
  intializeUI();
  intializePosenet();
  
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

function intializePosenet() {
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

function intializeUI() {
  /* Initializing all the UI elements here */

  /*checkBoxDrum = createCheckbox("Drum", false);
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
  sliderSynthB = createSlider(0,1,0.5,0.01);*/
  checkBoxPose = createCheckbox("Enable Pose Detection", true );
  checkBoxPose.changed(checkBoxPoseChanged);
  checkBoxPose.position(150,730);
  checkBoxSynthToggle = createCheckbox("Toggle FM Synth", false);
  checkBoxSynthToggle.changed(checkBoxFMSynthToggle);

  /* UI Animation Checkboxes */
  checkBoxParticleAnim = createCheckbox("Show Particles", false);
  /*checkboxFFTAnim = createCheckbox("Graphic EQ", false);
  checkboxAmplitudeAnim = createCheckbox("Volume Graph", false);*/

}

function initializeSound() {
  /* Initializing Tone JS sound Engine*/

  soundEngine.initSound();
  soundEngine.initTone();
  playButton.html("stop");
}

// Callbacks for checkbox selection events
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
function checkBoxPoseChanged() {
  if (this.checked()) {
    intializePosenet();
  } else {
    video.remove();
    clearMarkers();
    poseNet = null;
  }
}

function checkBoxFMSynthToggle() {
    // emit the state of the checkbox
    socket.emit('synth', this.checked());
}

function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].clear();
  }
}

// Callback for posenet model load complete
function modelLoaded() {
  console.log("MODEL LOADED");
  isModelLoaded = true;
}

// callback from posenet once pose data is received
function getPoses(poses) {
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

function drawSkeleton() {
  // Points returned by Posenet are inverted along the 'x' direction due to mirroring
  // Translating the points to represent correct the mirroring
  push();
  translate(video.width, 0);
  scale(-1,1);

  /* Uncomment to draw video to screen
  image(video,0,0, video.width, video.height);
  filter(GRAY); 
  */

  /*for (let i = 0; i < markers.length; i++) {
    markers[i].show();
  }*/
  if(pose.leftEar.confidence > 0.5 && pose.rightEar.confidence > 0.5 && pose.leftShoulder.confidence > 0.5 
    && pose.rightShoulder.confidence > 0.5)
  {
    drawLines();
  }
  pop();
}

function drawLines() {
  stroke(255,0,0);
  line(pose.leftEar.x, pose.leftEar.y, pose.rightEar.x, pose.rightEar.y);
  line(pose.leftWrist.x, pose.leftWrist.y, pose.rightWrist.x, pose.rightWrist.y);
  line(pose.leftEar.x, pose.leftEar.y, pose.rightEar.x, pose.rightEar.y);
  line(pose.leftShoulder.x, pose.leftShoulder.y, pose.rightShoulder.x, pose.rightShoulder.y);
  //line(pose.leftHip.x, pose.leftHip.y, pose.rightHip.x, pose.rightHip.y);
  //line(pose.leftKnee.x, pose.leftKnee.y, pose.rightKnee.x, pose.rightKnee.y);
  drawGravityLines(pose.leftShoulder, pose.rightShoulder);
  drawGravityLines(pose.leftEar, pose.rightEar);
  drawCopLines(pose.leftKnee, pose.rightKnee);

  drawBalancePoints(pose.leftEar, pose.rightEar, 'head');
  //drawBalancePoints(pose.leftShoulder, pose.rightShoulder);
  //drawBalancePoints(pose.leftWrist, pose.rightWrist);
}
function drawGravityLines(left, right) {
  stroke(255,0,0);
  var midX = (left.x + right.x) / 2;
  var midY = (left.y + right.y) /2;
  line(midX, midY , midX, height);
}

function drawCopLines(left, right) {
  stroke(0,255,0);
  line(left.x, left.y, left.x, height );
  line(right.x, right.y, right.x, height );
}

function drawBalancePoints(left,right, position) {
  var midpointx = (left.x + right.x) / 2;
  var midpointy = (left.y + right.y) / 2; 
  var cVec = createVector(midpointx, midpointy);
  var aVec = createVector(right.x, right.y);
  var m = (right.y - left.y) / (right.x - left.x);
  var at = degrees(atan(radians(m)));
  console.log(at);
  var ratio = cVec.dist(aVec)*sin(at) / 5;
  noStroke();
  fill(255);
  //console.log(sin(at) + " " + cos(at) + " " + ratio);
  var balance = {
    angle: at,
    position: position
  };
  
  socket.emit('balance', JSON.stringify(balance));
  for(var i=0; i < 5 ;i++) {

    cVec.x+=ratio*cos(at);
    cVec.y+=ratio*sin(at);
    
    //this.shoulderCenterVec.add(vel);
    ellipse(cVec.x, cVec.y, 10,10);
  }
}
// Drawing the reference grid
function drawGrid() {


  fill(255);
  stroke(255);
  line(420,0,420,900);
  line(840,0,840,900)
  stroke(255);
  line(0,240,1280,240);
  line(0,480,1280,480);
  noFill();
  ellipse(width/2, height/2, height, height);
  fill(255);
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

