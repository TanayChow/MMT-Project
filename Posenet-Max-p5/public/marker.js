class marker {
history = [];
x;
y;
    
constructor() {
}

show() {
    /*for(var i=0;i<this.history.length;i++){
        console.log(this.history.length);
        fill(128,128,128);
        var vec = this.history[i];
        ellipse(vec.x,vec.y, 20,20);
    }*/
    fill(255,0,0);
    ellipse(this.x,this.y, 20,20);
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
}