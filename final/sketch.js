// Based on: Daniel Shiffman's Evolutionary "Steering Behavior" Simulation

let population = [];
let food = [];
// Four ghosts: "BLINKY","PINKY","INKY","CLYDE"
let blinky = [];
let pinky = [];
let inky = [];
let clyde = [];

let nutrition = [0.02, -1];
let debug;
let font;
// sample text from Wikipedia Pac-Man page
let originalText = "Pac-Man, stylized as PAC-MAN, is an arcade game developed by Namco and first released in Japan as Puck Man in May 1980. It was created by Japanese video game designer Toru Iwatani. It was licensed for distribution in the United States by Midway Games and released in October 1980. Immensely popular from its original release to the present day, Pac-Man is considered one of the classics of the medium, and an icon of 1980s popular culture. Upon its release, the game—and, subsequently, Pac-Man derivatives—became a social phenomenon that yielded high sales of merchandise and inspired a legacy in other media, such as the Pac-Man animated television series and the top-ten Buckner and Garcia hit single \"Pac-Man Fever\". The game was popular in the 1980s and 1990s and is still played in the 2010s."

function preload() {
  font = loadFont('Alpha.otf')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  debug = select('#debug');
  feed();
  kill();
  for (let i = 0; i < 10; i++) {
    population[i] = new Pacman(width / 2, height / 2);
  }
}

function draw() {
  background(0);
  textFont(font);
  // draw food
  for (let i = 0; i < food.length; i++) {
    fill(100, 100, 255);
    noStroke();
    ellipse(food[i].x, food[i].y, 2);
  }
  // draw ghosts
  for (let i = 0; i < blinky.length; i++) {
    textAlign(CENTER, CENTER);
    fill("red")
    textSize(16);
    text("BLINKY", blinky[i].x + random(3), blinky[i].y + random(3));
  }
  for (let i = 0; i < pinky.length; i++) {
    textAlign(CENTER, CENTER);
    fill("pink")
    textSize(16);
    text("PINKY", pinky[i].x + random(3), pinky[i].y + random(3));
  }
  for (let i = 0; i < inky.length; i++) {
    textAlign(CENTER, CENTER);
    fill("cyan")
    textSize(16);
    text("INKY", inky[i].x + random(3), inky[i].y + random(3));
  }
  for (let i = 0; i < clyde.length; i++) {
    textAlign(CENTER, CENTER);
    fill("orange")
    textSize(16);
    text("CLYDE", clyde[i].x + random(3), clyde[i].y + random(3));
  }
  for (let i = population.length - 1; i >= 0; i--) {
    v = population[i];
    // Yum yum (index 0)
    v.eat(food, 0);
    // Ghost! (index 1)
    v.eat(blinky, 1);
    v.eat(pinky, 1);
    v.eat(inky, 1);
    v.eat(clyde, 1);

    v.boundaries();
    v.update();
    v.display();

    if (v.dead()) {
      population.splice(i, 1);
    } else {
      let child = v.birth();
      if (child != null) {
        population.push(child);
      }
    }
  }

}

function mouseDragged() {
  population.push(new Pacman(mouseX, mouseY));
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    feed();
  } else if (keyCode == RIGHT_ARROW) {
    kill();
  }
}

function feed() {
  sourceText = shuffle(originalText.split(" "));
  console.log(sourceText)
  for (let i = 0; i < random(sourceText.length/2); i++) {
    let points = font.textToPoints(sourceText[i], random(width), random(height), random(40, 100), {
      sampleFactor: 0.2,
      simplifyThreshold: 0
    });
    for (let j = 0; j < points.length; j++) {
      let pt = points[j];
      food.push(createVector(pt.x, pt.y));
    }
  }
}

function kill() {
  for (let i = 0; i < 3; i++) {
    blinky.push(createVector(random(width), random(height)));
    pinky.push(createVector(random(width), random(height)));
    inky.push(createVector(random(width), random(height)));
    clyde.push(createVector(random(width), random(height)));
  }
}
