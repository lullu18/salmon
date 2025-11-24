// ParticleSystem class
class ParticleSystem {
    constructor(position) {
        this.origin = position.copy();
        this.particles = [];
    }

    addParticle() {
        this.particles.push(new Particle(this.origin));
    }

    run() {
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            p.update();
            p.show();
        }
    }

    isEmpty() {
        return this.particles.length === 0;
    }
}