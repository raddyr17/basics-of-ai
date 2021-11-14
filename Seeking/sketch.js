let v;
let d = 15;

function setup() {
  createCanvas(640, 360);
  v = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(25);

  let mouse = createVector(mouseX, mouseY);

  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);

  v.seekAndStayBetweenBoundaries(mouse);
  v.update();
  v.display();
}
