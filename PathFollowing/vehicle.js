class Vehicle {
  constructor(x, y, ms, mf) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(3, 0);
    this.r = 10;
    this.maxspeed = ms || 4;
    this.maxforce = mf || 0.1;
  }

  run() {
    this.update();
    this.display();
  }

  follow(p) {

    let predict = this.velocity.copy();
    predict.normalize();
    predict.mult(50);
    let predictLoc = p5.Vector.add(this.position, predict);

    let normal = null;
    let target = null;
    let worldRecord = 1000000;

    for (let i = 0; i < p.points.length - 1; i++) {

      let a = p.points[i];
      let b = p.points[i + 1];

      let normalPoint = getNormalPoint(predictLoc, a, b);
      if (normalPoint.x < a.x || normalPoint.x > b.x) {
        normalPoint = b.copy();
      }

      let distance = p5.Vector.dist(predictLoc, normalPoint);
      if (distance < worldRecord) {
        worldRecord = distance;
        normal = normalPoint;

        let dir = p5.Vector.sub(b, a);
        dir.normalize();
        dir.mult(10);
        target = normalPoint.copy();
        target.add(dir);
      }
    }

    if (worldRecord > p.radius && target !== null) {
      this.seek(target);
    }

    if (debug) {
      stroke(255);
      fill(200);
      line(this.position.x, this.position.y, predictLoc.x, predictLoc.y);
      ellipse(predictLoc.x, predictLoc.y, 4, 4);

      stroke(255);
      fill(200);
      ellipse(normal.x, normal.y, 4, 4);
      line(predictLoc.x, predictLoc.y, normal.x, normal.y);
      if (worldRecord > p.radius) fill(255, 0, 0);
      noStroke();
      ellipse(target.x, target.y, 8, 8);
    }
  }


  applyForce(force) {
    this.acceleration.add(force);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);

    if (desired.mag() === 0) return;

    desired.normalize();
    desired.mult(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);

    this.applyForce(steer);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  borders(p) {
    if (this.position.x > p.getEnd().x + this.r) {
      this.position.x = p.getStart().x - this.r;
      this.position.y = p.getStart().y + (this.position.y - p.getEnd().y);
    }
  }

  display() {
    let theta = this.velocity.heading() + PI / 2;
    fill('#FF6B6B');
    stroke(255);
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

function getNormalPoint(p, a, b) {
  let ap = p5.Vector.sub(p, a);
  let ab = p5.Vector.sub(b, a);
  ab.normalize();
  ab.mult(ap.dot(ab));
  let normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}