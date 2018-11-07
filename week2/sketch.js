// homage to anders hoff, e.g.
// based on https://editor.p5js.org/allison.parrish/sketches/SJ5aR9L2m


let gridSize = 8

function drawLetter(weight, depth) {
  let opt = int(random(3));
  if (random() < 0.5) {
    init2 = 0;
  } else {
    init2 = 20;
  }
  if (opt == 0) {
    a = -10
    b = -10
    c = -10
  } else if (opt == 1) {
    a = 0
    b = 0
    c = 0
  } else if (opt == 2) {
    a = 20
    b = 20
    c = 20
  } else {
    a = 30
    b = 30
    c = 30
  }

  // The first two parameters for the bezier() function
  // specify the first point in the curve and
  // the last two parameters specify the last point.
  // The middle parameters set the control points that define the shape of the curve.

  bezier(0, init2, a, b, c, int(random(40)), 30, 20);
  ellipse(int(random(40)), int(random(40)), 2, 2);

  if ((depth == 1) || (random() < 0.9 && depth < 3)) {
    scale(0.75);
    weight *= 1.33;
    strokeWeight(weight);
    drawLetter(weight, depth + 1);
  }
}

function setup() {
  createCanvas(600, 600);
  stroke(255);
  noFill();
}

function draw() {
  background(0);
  push();
  translate(width / (gridSize * 2), height / (gridSize * 2));
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      push();
      translate(i * (width / gridSize - 5), j * (height / gridSize - 5));
      scale(1.25);
      drawLetter(1, 1);
      pop();
    }
  }

  pop();
  noLoop();
}

function mousePressed() {
  draw();
}
