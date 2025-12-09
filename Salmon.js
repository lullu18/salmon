// Salmon class
class Salmon extends Mover {
    constructor(x, y) {
        super(x, y);

        this.vel = createVector(random(-1, 1), random(-0.5, 0.5));
        this.exploded = false;
        this.finished = false;
        this.migrating = false;
    }

    startMigration() {
        if(!this.exploded) {
            this.migrating = true;
        }
    }

update() {
    if (this.exploded) return;

    if (this.migrating) {
        let upGravity = createVector(0, -0.15); 
        this.applyForce(upGravity);

        super.update();

        if (this.pos.y < dividerY / 2 - 20) {
            this.explode();
        }

        if (this.pos.y < -50) {
            this.finished = true;
        }
    } else {
        // idle 상태
        let wander = p5.Vector.random2D();
        wander.mult(0.05);
        this.applyForce(wander);

        super.update();

        let margin = 30;

        if (this.pos.x < margin) {
            this.pos.x = margin;
            this.vel.x = abs(this.vel.x);
        } else if (this.pos.x > width - margin) {
            this.pos.x = width - margin;
            this.vel.x = -abs(this.vel.x);
        }

        if (this.pos.y < dividerY + margin) {
            this.pos.y = dividerY + margin;
            this.vel.y = abs(this.vel.y);
        }

        if (this.pos.y > height - margin) {
            this.pos.y = height - margin;
            this.vel.y = -abs(this.vel.y);
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