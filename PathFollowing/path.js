class Path {
    constructor() {
      this.radius = 10;
      this.points = [];
    }
  
    addPoint(x, y) {
      let point = createVector(x, y);
      this.points.push(point);
    }
  
    getStart() {
      return this.points[0];
    }
  
    getEnd() {
      return this.points[this.points.length - 1];
    }
  
  
    display() {
      stroke('#4E6766');
      strokeWeight(this.radius * 2);
      noFill();
      beginShape();
      for (let i = 0; i < this.points.length; i++) {
        vertex(this.points[i].x, this.points[i].y);
      }
      endShape();
      stroke(255);
      strokeWeight(1);
      noFill();
      beginShape();
      for (let i = 0; i < this.points.length; i++) {
        vertex(this.points[i].x, this.points[i].y);
      }
      endShape();
    }
  }