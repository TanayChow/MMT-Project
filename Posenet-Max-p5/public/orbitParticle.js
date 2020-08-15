// Class for Orbit Particle
class OrbitParticle {

    constructor(x,y) {
        this.pos = createVector();
        this.velocity = createVector();
        this.acc = p5.Vector.random2D();
        this.r = 30;
    }

    applyForce(force) {
        this.acc = force;
    }

    update(wristX, wristY) {
        let wristVec = createVector(wristX, wristY);
        this.acc = p5.Vector.sub(wristVec, this.pos);
        this.velocity.add(this.acc);
        this.velocity.limit(2);
        this.pos.add(this.velocity);
    }

    render() {
    ellipse(this.pos.x, this.pos.y, this.r, this.r)
    }
}