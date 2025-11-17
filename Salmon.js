// Salmon class
class Salmon {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-1, -3));
        this.acceleration = createVector(0, -0.15); // 중력이 위로 작용
        this.exploded = false;
        this.finished = false;
    }

    run() {
        this.update();
        this.display();
    }

    update() {
        if(!this.exploded){
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);

            if (this.position.y < dividerY / 2 - 20) {
                this.exploded();
            }

            if (this.position.y < -50) {
                this.finish = true;
            }
        }
    }

    display() {
        if (!this.exploded){
            noStroke();
            textSize(32);
            text("🐟", this.pos.x, this.pos.y);
        }
    }

    explode() {
        this.exploded = true;
        this.finished = true;

        let sr = new SalmonRoe(this.position.copy());

        for (let i = 0; i < 60; i++){
            sr.addSalmon();
        }

        systems.push(sr);
    }
}