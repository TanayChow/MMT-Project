var markers = [];
var socket;
var video;
var poseNet;
var pose;

let circleRightColor;
let circleLeftColor;
let circleCenterColor;

var soundEngine;

function setup() {
  soundEngine = new SoundClass();
  initMarkers();
  socket = io.connect('http://localhost:3000');
  createCanvas(1280, 720);
  intializeUI();
  intializePosenet();
  //socket.on('mouse', mouseDataReceived)
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

/* image(video,0,0, video.width, video.height);
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

function draw() {
  background(0);
  drawGrid();

  if(pose) {
    //console.log(pose);
    socket.emit('pose', JSON.stringify(pose));

    if(Math.floor(pose.nose.x) > 300) {
      fill(0,0,255);
    } else {
      fill(255,0,0);
    }
    drawSkeleton();
  }
  
}

