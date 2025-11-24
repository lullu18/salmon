// ParticleSystem class
class ParticleSystem {
    constructor(position) {
        this.origin = position.copy();
        this.particles = [];
    }

    addParticle() {
        this.particles.push(new Particle(this.origin));
    }

    applyForce(force) {
        for (let p of this.particles){
            p.applyForce(force);
        }
    }

    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.update();
            p.show();

            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }

    isEmpty() {
        return this.particles.length === 0;
    }
}