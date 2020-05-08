/* Class for Particle */
class Particle {
pos;
vel;
r; // distance radius
mr; // inner radius
speed = 0.1;
max = 5;
color
constructor(pos, r, mr, color) {
    // Initialize the particle
    this.pos = createVector(pos.x, pos.y);
    this.r = r;
    this.mr = mr;
    this.vel = createVector(random(-1,1), random(-1,1));
    this.color = color;
}

update(pArray, index, movLeft, movRight) {
    // update the position of the particle
    this.pos.add(this.vel);
    if(this.pos.x < -10) {
        this.pos.x = width;
    }
    if(this.pos.x > width) {
        this.pos.x = 0;
    }
    if(this.pos.y < -10) {
        this.pos.y = height;
    }
    if(this.pos.y > height) {
        this.pos.y = 0;
    }
    this.vel.x = constrain(this.vel.x + random(-this.speed, this.speed), -this.max, this.max);
    this.vel.y = constrain(this.vel.y + random(-this.speed, this.speed), -this.max, this.max);
          
    noStroke();
    fill(this.color, 100);
    ellipse(this.pos.x,this.pos.y,this.mr,this.mr);
    this.drawLinesToNeighbors(pArray, index, movLeft, movRight);
          
    noStroke();
}

 drawLinesToNeighbors(pArray, index, movLeft, movRight) {
     // calculate the distance to the neighbors and draw lines to ones falling in the radius
     var ang = atan2(this.pos.y - movRight.y, this.pos.x - movRight.x);
     var distRight = this.pos.dist(movRight);
     var distLeft = this.pos.dist(movLeft);
      if(distRight < this.r) {
        stroke(map(distRight, 0, this.r, 255, 0));
        strokeWeight(map(distRight, 0, this.r, 3, 0));
        line(this.pos.x, this.pos.y, movRight.x, movRight.y);
      }
      if(distLeft < this.r) {
        stroke(map(distLeft, 0, this.r, 255, 0));
        strokeWeight(map(distLeft, 0, this.r, 3, 0));
        line(this.pos.x, this.pos.y, movLeft.x, movLeft.y);
      }

}
}