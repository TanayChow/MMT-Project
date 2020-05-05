class Particle {
pos;
vel;
r;
mr;
speed = 0.1;
max = 5;
color
constructor(pos, r, mr, color) {
    console.log("here", pos);
    this.pos = createVector(pos.x, pos.y);
    this.r = r;
    this.mr = mr;
    this.vel = createVector(random(-1,1), random(-1,1));
    this.color = color;
}

update(pArray, index, movLeft, movRight) {
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
    ellipse(this.pos.x,this.pos.y,5,5);
    this.drawLinesToNeighbors(pArray, index, movLeft, movRight);
          
    noStroke();
}

updateRadius() {
    fill(this.color);
    ellipse(this.pos.x,this.pos.y,10,10);
}

 drawLinesToNeighbors(pArray, index, movLeft, movRight) {
    /*var h = map(this.pos.x, 0, width, 0, 255);
    for(let j = index + 1; j < pArray.length; j ++) {
        var ang = atan2(this.pos.y - pArray[j].pos.y, this.pos.x - pArray[j].pos.x);
        var dist = this.pos.dist(pArray[j].pos);
        if(dist < this.r) {
          //stroke(map(dist, 0, this.r, 255, 0));
          //strokeWeight(map(dist, 0, this.r, 3, 0));
          stroke(255);
          line(this.pos.x, this.pos.y, pArray[j].pos.x, pArray[j].pos.y);
          
          var force = map(dist, 0, this.r, 4, 0);
          this.vel.x += force * cos(ang);
          this.vel.y += force * sin(ang);
        }
      }*/

     var ang = atan2(this.pos.y - movRight.y, this.pos.x - movRight.x);
     var distRight = this.pos.dist(movRight);
     var distLeft = this.pos.dist(movLeft);
      if(distRight < this.r) {
        stroke(map(distRight, 0, this.r, 255, 0));
        strokeWeight(map(distRight, 0, this.r, 3, 0));
        line(this.pos.x, this.pos.y, movRight.x, movRight.y);
        /*var force = map(dist, 0, this.r, 4, 0);
        this.vel.x += force * cos(ang);
        this.vel.y += force * sin(ang);*/
      }
      if(distLeft < this.r) {
        stroke(map(distLeft, 0, this.r, 255, 0));
        strokeWeight(map(distLeft, 0, this.r, 3, 0));
        line(this.pos.x, this.pos.y, movLeft.x, movLeft.y);
        /*var force = map(dist, 0, this.r, 4, 0);
        this.vel.x += force * cos(ang);
        this.vel.y += force * sin(ang);*/
      }

}
}