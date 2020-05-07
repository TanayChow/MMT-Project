var markers = [];
var socket;
var video;
var poseNet;
var pose;

let circleRightColor;
let circleLeftColor;
let circleCenterColor;

var soundEngine;
// Sound variables
var drum;
var perc;
var synthA;
var synthB;

// UI elements
var sliderRate;
var sliderPan;
var jumpButton;
var checkBoxAmbientSynth;
var checkBoxLeadSynth;
var checkBoxDrum;
var checkBoxPerc;
var sliderDrum;
var sliderPerc;
var sliderSynthA;
var sliderSynthB;
var enablePose = false;
var checkBoxPose;
var checkBoxSynthToggle;
var particles = [];
var beatParticle;

// Sound properties
var amp;
var ampHistory = [];
var fft_drum;
var fft_synthA;
var fft_synthB;
var fft_perc;
var peakDetect;


function preload() {
  drum = loadSound("media/Drum.wav");
  perc = loadSound("media/Perc.wav");
  synthA = loadSound("media/synthA.wav");
  synthB = loadSound("media/synthB.wav");
}

function setup() {
  let cnv = createCanvas(1280, 720);
  cnv.position(150,0);
  angleMode(DEGREES);
  for(var i=0; i < 100; i++) {
    particles.push(new Particle(createVector(random(width), random(height)),100,random(8), color(random(255), random(255),random(255)))); 
  }
  //beatParticle = new Particle(createVector(random(width), random(height)),100,30, color(random(255), random(255),random(255)));
  
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
  initMarkers();
  socket = io.connect('http://localhost:3000');

  intializeUI();
  intializePosenet();
  //socket.on('mouse', mouseDataReceived)
  socket.on('counter', counterLog);

}
function jumpButtonPressed() {
  var len = drum.duration();
  drum.jump(random(len));
  drum.addCue(5, cueTriggered)
}

function cueTriggered() {
  console.log('cue triggered');
}

function songLoaded() {
  console.log("Song Loaded");
  // song.playMode('restart')
  //drum.play();
  sliderPan = createSlider(-1,1,0,0.01);
  jumpButton = createButton("jump");
  jumpButton.mousePressed(jumpButtonPressed);
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
  poseNet = ml5.poseNet(video,{
    architecture: 'MobileNetV1',
    outputStride: 16,
    //inputResolution: { width: 200, height: 480 }, defaults to 257
    multiplier: .75,
    quantBytes: 2,
    detectionType: 'single'

  }, modelLoaded);
  poseNet.on('pose', getPoses);
}

function intializeUI() {
  /*circleRightColor = color (128,0,0);
  circleLeftColor = color (0,128,0);
  circleCenterColor = color (128,128,128);
  playButton = createButton('Play');
  playButton.mousePressed(initializeSound);*/
  checkBoxDrum = createCheckbox("Drum", true);
  checkBoxDrum.changed(checkBoxDrumChanged);
  sliderDrum = createSlider(0,10,0,1);
  checkBoxPerc = createCheckbox("Percussion", true);
  checkBoxPerc.changed(checkBoxPercChanged);
  sliderPerc = createSlider(0,10,0,1);
  checkBoxAmbientSynth = createCheckbox("Ambient Synth", true);
  checkBoxAmbientSynth.changed(checkBoxAmbientSynthChanged);
  sliderSynthA = createSlider(0,10,0,1);
  checkBoxLeadSynth = createCheckbox("Lead Synth", true);
  checkBoxLeadSynth.changed(checkBoxLeadSynthChanged);
  sliderSynthB = createSlider(0,10,0,1);
  checkBoxPose = createCheckbox("Enable Pose Detection", true );
  checkBoxPose.changed(checkBoxPoseChanged);
  checkBoxPose.position(150,730);
  checkBoxSynthToggle = createCheckbox("Toggle FM Synth", false);
  checkBoxSynthToggle.changed(checkBoxFMSynthToggle);
}

function initializeSound() {
  soundEngine.initSound();
  soundEngine.initTone();
  playButton.html("stop");
}

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

function modelLoaded() {
  console.log("MODEL LOADED");
}


function getPoses(poses) {
  if(poses.length > 0) {
    pose = poses[0].pose;
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      markers[i].update(x,y);
    }
  }
}

function mouseDataReceived(data) {
  console.log('mouseDataReceived - ', data);
  if (data.mouseIsPressed) {
    fill(100, 100, 100);
  } else {
    fill(255, 0, 20);
  }
  ellipse(data.x, data.y, 80, 80);
}

function drawSkeleton() {

  push();
  translate(video.width, 0);
  scale(-1,1);

  /*image(video,0,0, video.width, video.height);
  filter(GRAY); 
  */
  
  /*
  push();
  //translate(0, 0);
  circleRightColor.setAlpha(map(pose.rightWrist.y, 0, 720, 0, 255));
  circleLeftColor.setAlpha(map(pose.leftWrist.y, 0, 720, 0, 255));
  //scale(1, map(pose.rightWrist.y,0,720,0,1))
  
  fill(circleRightColor);
  ellipse(210, 120, map(pose.rightWrist.y,0,720, 200, 0), map(pose.rightWrist.y, 0, 720, 200, 0));
  ellipse(210, 600, map(pose.rightWrist.x,0, 1280, 0, 200), map(pose.rightWrist.x, 0, 1280, 0, 200));
  
  fill(circleCenterColor);
  ellipse(width/2, height/2, map(pose.nose.x, 0, 1280, 0, 200), map(pose.nose.x, 0, 1280, 0, 200));

  fill(circleLeftColor);
  ellipse(1080, 120, map(pose.leftWrist.y, 0, 1280, 200, 0), map(pose.leftWrist.y, 0, 1280, 200, 0));
  ellipse(1080, 600, map(pose.leftWrist.x, 1280, 0, 0, 200), map(pose.leftWrist.x, 1280, 0, 0, 200));

  pop();
  */

  for (let i = 0; i < markers.length; i++) {
    markers[i].show();
  }

pop();
}

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
  text("FPS: " + frameRate().toFixed(2), 10, height - 10);
}

function fftAnim() {
  var w = width / 64;
  var h = height / 64;
  if(fft_drum) {
    stroke(random(255),0,0);
    fill(random(255),0,0);
    var spec_drum = fft_drum.analyze();
    fft_drum.analyze()
    peakDetect.update(fft_drum);
    if(peakDetect.isDetected) {

    }
    for(var i = 0; i < spec_drum.length; i++) {
      var y = map(spec_drum[i], 0, 256, 0, 50);
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
    stroke(random(255),random(255),random(255));
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
    var r = map(ampHistory[i],0,1,height/2-100,height/2);
    var x = r * cos(i);
    var y = r * sin(i);
    //var y = map(ampHistory[i],0,1,height-100,height-200);
    vertex(x,y)
  }
  endShape();
  pop();
  if(ampHistory.length > 360) {
    ampHistory.splice(0,1);
  }
}

function sendMouseDataViaSocket() {
    // Send the co-ordinates to server
    var data = {
      x: mouseX,
      y: mouseY,  
      mouseIsPressed: mouseIsPressed
    }
    // console.log('Sending mouse data - ', data);
    // socket.emit('mouse', data);
}
function drawParticles() {
  for(var i = 0; i < particles.length; i++) {
    var mapped_x_left = map(pose.leftWrist.x, 0 , 1280, 1280, 0);
    var mapped_x_right = map(pose.rightWrist.x, 0 , 1280, 1280, 0);
    particles[i].update(particles, i, createVector(mapped_x_left,pose.leftWrist.y), createVector(mapped_x_right,pose.rightWrist.y));
  }
  noStroke();
}


function draw() {
  background(0);
  drawGrid();

  amplitudeAnim();
  fftAnim();

  if(sliderPan) {
    drum.pan(sliderPan.value());
  }
  
  if(pose) {
    drawParticles();
  
    //console.log(pose);
    socket.emit('pose', JSON.stringify(pose));

    var mapped_x = map(pose.nose.x, 0 , 1280, 1280, 0);

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
    if(/*Math.floor(pose.nose.x) > 840 || */Math.floor(pose.leftKnee.y) < 600 && checkBoxPerc.checked()) {
      if(!perc.isPlaying()) {
        perc.play();
      }
    } else {
      if(perc.isPlaying()) {
        perc.stop();
      }
    }
    if(/*Math.floor(pose.nose.x) < 420 || */Math.floor(pose.rightKnee.y) < 600 && checkBoxDrum.checked()) {
      if(!drum.isPlaying()) {
        drum.play();
      }
    } else {
      if(drum.isPlaying()) {
        drum.stop();
      }
    }
    drawSkeleton();
  }

}

