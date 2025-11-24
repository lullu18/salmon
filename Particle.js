// Particle class
class Particle extends Mover {
  constructor(position) {
    super(position.x, position.y);

    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 3));

    this.size = random(6, 10);
    
    // 알이 얼마나 움직였는지
    this.age = 0;
    this.settled = false;
  }

  update() {
    if (!this.settled) {
      // 연어알이 서서히 멈춤
      let gentleUp = createVector(0, 0.02);
      this.applyForce(gentleUp);

      super.update();
      this.age++;

      if (this.age > 60) {
        this.settled = true;
        this.vel.mult(0);
        this.acc.mult(0);
      }
    }
    
  }

  show() {
    noStroke();
    // 연어알
    fill(255, 150, 0);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  isDead() {
    return false;
  }
}