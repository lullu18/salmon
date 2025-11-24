// Salmon class
class Salmon extends Mover {
    constructor(x, y) {
        super(x, y);
        this.vel = createVector(random(-1, 1), random(-1, -3));
        this.exploded = false;
        this.finished = false;
    }

    update() {
        if(!this.exploded){
            let upGravity = createVector(0, -0.15); 
            this this.applyForce(upGravity);

            super.update();

            if (this.pos.y < dividerY / 2 - 20) {
                this.explode();
            }

            if (this.pos.y < -50) {
                this.finished = true;
            }
        }
    }

    show() {
        if (!this.exploded){
            noStroke();
            textSize(32);
            text("🐟", this.pos.x, this.pos.y);
        }
    }

    explode() {
        this.exploded = true;
        this.finished = true;

        let ps = new ParticleSystem(this.pos.copy());

        for (let i = 0; i < 60; i++){
            ps.addParticle();
        }

        systems.push(ps);
    }
}