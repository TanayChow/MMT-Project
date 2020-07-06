/* Class for Marker */
class marker {
history = [];
x;
y;
weight;
    
constructor() {
}

show() {
    noStroke();
    fill(0,255,0);
    ellipse(this.x,this.y, 10*this.weight,10*this.weight);
}

update(x, y, weight) {
    this.x = x;
    this.y = y;
    this.weight = weight;
    this.store();
}

updateWeight(weight) {
    this.weight = weight;
}

store() {
    let vec = createVector(this.x, this.y)
    this.history.push(vec);
    if(this.history.length > 25) {
        this.history.splice(0,1);
    }
}

clear() {
    this.x = 0;
    this.y = 0;
}
}