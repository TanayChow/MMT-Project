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
  for(var i=0; i < 100; i++) {
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
  /* Initializing all the UI elements here */

  checkBoxDrum = createCheckbox("Drum", true);
  checkBoxDrum.changed(checkBoxDrumChanged);
  sliderDrum = createSlider(0,1,0.5,0.01);
  checkBoxPerc = createCheckbox("Percussion", true);
  checkBoxPerc.changed(checkBoxPercChanged);
  sliderPerc = createSlider(0,1,0.5,0.01);
  checkBoxAmbientSynth = createCheckbox("Ambient Synth", true);
  checkBoxAmbientSynth.changed(checkBoxAmbientSynthChanged);
  sliderSynthA = createSlider(0,1,0.5,0.01);
  checkBoxLeadSynth = createCheckbox("Lead Synth", true);
  checkBoxLeadSynth.changed(checkBoxLeadSynthChanged);
  sliderSynthB = createSlider(0,1,0.5,0.01);
  checkBoxPose = createCheckbox("Enable Pose Detection", true );
  checkBoxPose.changed(checkBoxPoseChanged);
  checkBoxPose.position(150,730);
  checkBoxSynthToggle = createCheckbox("Toggle FM Synth", false);
  checkBoxSynthToggle.changed(checkBoxFMSynthToggle);

  checkBoxParticleAnim = createCheckbox("Show Particles", true);
  checkboxFFTAnim = createCheckbox("Graphic EQ", true);
  checkboxAmplitudeAnim = createCheckbox("Volume Graph", true);
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
}

// callback from posenet once pose data is received
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

  for (let i = 0; i < markers.length; i++) {
    markers[i].show();
  }

  pop();
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
  text("FPS: " + frameRate().toFixed(2), 10, height - 10);
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

// Main draw() function loop
function draw() {
  background(0);
  drawGrid();

  if(checkboxAmplitudeAnim.checked()) {
    amplitudeAnim();
  }
  if(checkboxFFTAnim.checked()) {
    fftAnim();
  }
  
  // sets the volume of the audio loops
  setVolume();
  
  if(pose) {
    // Process only if pose data is available
    //console.log(pose);
    socket.emit('pose', JSON.stringify(pose));

    if(checkBoxParticleAnim.checked()) {
      drawParticles();
    }
    
    playSounds();

    if(checkBoxPose) {
      drawSkeleton();
    }
  
  }

}

