// homage to bpNichols' "First Screening"
// http://www.palindromelist.net/palindromes-w/

let palindromes = [
  "walmartstramlaw",
  "wannatannaw",
  "warsawwasraw",
  "wasitabarorabatisaw",
  "wasitabatisaw",
  "wasitacaroracatisaw",
  "wasitacatisaw",
  "wasitaratisaw",
  "wasiteliotstoiletisaw",
  "wastepapetsaw",
  "wefew",
  "wepanicinapew",
  "wesewewesew",
  "wesew",
  "wetsanitaryratinastew",
  "wetstew",
  "wonemotossalassotomenow",
  "wonkiosksoiknow",
  "wontonsnotnow",
  "wontipanicinapitnow",
  "wontitnow",
  "wontloversrevoltnow",
  "wonderifsununusfirednow",
  "wondersinitalylatinisrednow",
  "wontonNotnow"
]

let col = 0;
let palNum = 0;


function setup() {
  noCanvas();
  frameRate(10);
}


function draw() {
  let colors = ["red", "green", "yellow", "blue", "magenta", "cyan"];
  if (col >= term.cols - palindromes[palNum].length) {
    s = -1
    c = random(colors);
  } else if (col <= 1) {
    s = 1;
    palNum = int(random(0, 25));
    c = random(colors);
  }
  col = col + s
  term.write(ansi.cursor.position(term.rows - 1, col));
  term.write(ansi.format(palindromes[palNum], [c]))

  console.log("col: " + col)
  console.log("color: " + c)
  console.log(palNum + ": " + palindromes[palNum])
}
