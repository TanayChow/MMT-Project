/* Class for Marker */
class marker {
history = [];
x;
y;
    
constructor() {
}

show() {
    fill(0,255,0);
    ellipse(this.x,this.y, 10,10);
}

update(x,y) {
    this.x = x;
    this.y = y;
    this.store();
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