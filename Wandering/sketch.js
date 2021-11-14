let debugMode = false;
let vehicle;

function setup() {
  createCanvas(800, 600);
  vehicle = new Vehicle(100, 100);
}

function draw() {
  background(68, 175, 105);

  vehicle.wander();
  vehicle.update();
  vehicle.show();
  vehicle.edges();
}
function mousePressed() {
  debugMode = !debugMode;
}
