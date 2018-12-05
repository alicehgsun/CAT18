// based on Drawing ttf with p5js commands by Allison Parrish
// https://editor.p5js.org/allison.parrish/sketches/Hy3-Iqm67

let audioContext;
let mic;
let pitch;
let font;
let fontData;

function groupByContour(cmds) {
  contours = [];
  current = [];
  for (let cmd of cmds) {
    current.push(cmd);
    if (cmd.type == 'Z') {
      contours.push(current);
      current = [];
    }
  }
  return contours;
}

function clockwise(cmds) {
  let sum = 0;
  for (let i = 0; i < cmds.length - 1; i++) {
    let a = cmds[i];
    let b = cmds[i + 1];
    if (!(a.hasOwnProperty('x') && b.hasOwnProperty('x'))) {
      continue;
    }
    sum += (b.x - a.x) * (b.y + a.y);
  }
  return sum < 0;
}

function drawContours(contours) {
  let inShape = false;
  for (let i = 0; i < contours.length; i++) {
    if (clockwise(contours[i])) {
      if (inShape) {
        endShape(CLOSE);
      }
      beginShape();
      inShape = true;
      drawContour(contours[i]);
    } else {
      beginContour();
      drawContour(contours[i]);
      endContour();
    }
  }
  if (inShape) {
    endShape(CLOSE);
  }
}

function drawContour(cmds) {
  for (let i = 0; i < cmds.length; i++) {
    cmd = cmds[i];
    switch (cmd.type) {
      case 'M':
      case 'Z':
        break;
      case 'L':
        vertex(cmd.x, cmd.y);
        break;
      case 'C':
        bezierVertex(
          cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        break;
      case 'Q':
        quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
        break;
    }
  }
}

function preload() {
  fontData = loadBytes('Roboto-Black.ttf');
}

let path;

function startPitch() {
  pitch = ml5.pitchDetection('./model/', audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      r = map(frequency, 100, 450, 0, 255);
      b = map(frequency, 100, 450, 255, 0);
      background(r);
      console.log("pitch: " + frequency);
      fill(r, 0, b);
      noStroke();
      push();
      translate(width / 10, height / 1.8);
      drawContours(
        groupByContour(
          commandTransform(path.commands, function(x, y) {
            let newX, newY;
            newY = y;
            newX = x * map(cos(map(x, 0, 550, 0, TWO_PI / 4)), -1, 1, 1,
              map(sin(frequency * 0.07), -1, 1, 0.1, 2));
            return [newX, newY];
          })
        )
      );
      pop();
    } else {
      console.log("no pitch");
    }
    getPitch();
  })
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  font = opentype.parse(fontData.bytes.buffer);
  path = font.getPath("CompType", 0, 0, windowWidth / 6);
}

function commandTransform(cmds, callback) {
  let transformed = [];
  for (let cmd of cmds) {
    let newCmd = {
      type: cmd.type
    }
    for (let pair of [
        ['x', 'y'],
        ['x1', 'y1'],
        ['x2', 'y2']
      ]) {
      if (cmd.hasOwnProperty(pair[0]) && cmd.hasOwnProperty(pair[1])) {
        let result = callback(cmd[pair[0]], cmd[pair[1]]);
        newCmd[pair[0]] = result[0];
        newCmd[pair[1]] = result[1];
      }
    }
    transformed.push(newCmd);
  }
  return transformed;
}
