let debug = true;

let path;

let car1;
let car2;

function setup() {
  let text = createP(
    "Hit space bar to toggle debugging lines"
  );
  text.position(150, 500);
  text.style('font-size', '42px');

  createCanvas(1000, 500);
  frameRate(30);
  newPath();

  car1 = new Vehicle(0, height / 2, 6, 0.3);
  car2 = new Vehicle(0, height / 2, 4, 0.5);
  car3 = new Vehicle(0, height / 2, 3, 0.2);
}

function draw() {
  background("#1E152A");
  path.display();
  
  car1.follow(path);
  car1.run();
  car1.borders(path);

  car2.follow(path);
  car2.run();
  car2.borders(path);
  
  car3.follow(path);
  car3.run();
  car3.borders(path);

  changePathOverTime();
}

function newPath() {
  path = new Path();
  path.addPoint(-50, height / 2);
  path.addPoint(random(0, width / 2), random(0, height));
  path.addPoint(random(100, width / 2), random(0, height));
  path.addPoint(random(width / 2, width), random(0, height));
  path.addPoint(width + 50, height / 2);
}

function changePathOverTime() {
  if (frameCount > 60) {
    frameCount = 0;
    newPath();
  }
}

function keyPressed() {
  if (key == " ") {
    debug = !debug;
  }
}
