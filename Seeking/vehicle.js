class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(3, 4);
    this.position = createVector(x, y);
    this.r = 6;
    this.maxspeed = 3;
    this.maxforce = 0.15;
    this.desired = p5.Vector.ZERO;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  seekAndStayBetweenBoundaries(target) {
    this.desired = p5.Vector.sub(this.position, target);
    if (this.position.x < d) {
      this.desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - d) {
      this.desired = createVector(-this.maxspeed, this.velocity.y);
    }

    if (this.position.y < d) {
      this.desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > height - d) {
      this.desired = createVector(this.velocity.x, -this.maxspeed);
    }
    let steer = p5.Vector.sub(this.desired, this.velocity);

    if (this.desired !== null) {
      this.desired.normalize();
      this.desired.mult(this.maxspeed);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
    this.applyForce(steer);
  }

  display() {
    let theta = this.velocity.heading() + PI / 2;
    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}
