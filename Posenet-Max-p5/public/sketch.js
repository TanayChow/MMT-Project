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
var strings_synth;

// UI elements
var sliderRate;
var sliderPan;
var jumpButton;

// Sound properties
var amp;
var ampHistory = [];
var fft;
var particles = [];

function preload() {
  strings_synth = loadSound("media/strings-synth.mp3");
}

function setup() {
  createCanvas(1280, 720);
  for(var i=0; i < 500; i++) {
    particles.push(new Particle(createVector(random(width), random(height)),100,0, color(random(255), random(255),random(255)))); 
  }
  
  fft = new p5.FFT(0, 256);
  amp = new p5.Amplitude();
  fft.setInput(strings_synth);

  drum = loadSound("media/drum-loop.wav", songLoaded);
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
  poseNet = ml5.poseNet(video,modelLoaded);
  poseNet.on('pose', getPoses);
}

function intializeUI() {
  circleRightColor = color (128,0,0);
  circleLeftColor = color (0,128,0);
  circleCenterColor = color (128,128,128);
  playButton = createButton('Play');
  playButton.mousePressed(initializeSound);
}

function initializeSound() {
  soundEngine.initSound();
  soundEngine.initTone();
  playButton.html("stop");
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
  stroke(255);
  line(420,0,420,900);
  line(840,0,840,900)
  stroke(255);
  line(0,240,1280,240);
  line(0,480,1280,480);
  fill(255);
  stroke(0);
  text("FPS: " + frameRate().toFixed(2), 10, height - 10);
}

function fftAnim() {

var w = width / 256;
var spec = fft.analyze();
for(var i = 0; i < spec.length; i++) {
  stroke(random(255),random(255),random(255));
  var y = map(spec[i], 0, 255, 0, height);
  line(i*w , 0, i*w, y);
}
stroke(255);
}

function amplitudeAnim() {
  noFill();
  var amplitude = amp.getLevel();
  if(amplitude > 0.3) {
    particleGlow();
  }
  var rad = map(amplitude,0, 1, 10,200);
  //fill(0,255,0);
  //ellipse(width/2, height/2,rad,rad);
  var val = ampHistory.push(amplitude);
  stroke(255);
  beginShape();
  for(var i = 0; i < ampHistory.length; i++) {
    var y = map(ampHistory[i],0,1,height/2,height/4);
    vertex(i,y)
  }
  endShape();
  if(ampHistory.length > width) {
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
}

function particleGlow() {
  for(var i = 0; i < particles.length; i++) {
    particles[i].updateRadius();
  }
}

function draw() {
  background(0);
 

  if(sliderPan) {
    drum.pan(sliderPan.value());
  }
  
  if(pose) {
    drawParticles();
    stroke(255);
    drawGrid();
    //console.log(pose);
    socket.emit('pose', JSON.stringify(pose));
    var mapped_x = map(pose.nose.x, 0 , 1280, 1280, 0);

    if(Math.floor(mapped_x) > 840) {
      fill(0,0,255);
      if(!strings_synth.isPlaying()) {
        strings_synth.play();
        drum.stop();
      }
    } else if (Math.floor(mapped_x) < 420) {
      fill(255,0,0);
      if(strings_synth.isPlaying()) {
        strings_synth.stop();
      }
      //ampHistory = [];
      if(!drum.isPlaying()) {
        drum.play()
      };
    }
    drawSkeleton();
  }
  amplitudeAnim();
  fftAnim();
}

