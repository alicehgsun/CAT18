// based on https://github.com/nicolehe/ITP-hello-computer-f18/blob/master/week2/speech_to_gif/script.js example
// and homage to Marc Adrian's "Computer Texts" https://editor.p5js.org/allison.parrish/sketches/BJMQ7De67

const SpeechRecognition = webkitSpeechRecognition;
const giphyAPIKey = 'GIPHY API KEY';

function setup() {
  noCanvas();
  getSpeech();
}

function draw() {
  background(220);
}

function getSpeech() {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();
  recognition.interimResults = true;
  console.log('started rec');
  recognition.onresult = event => {
    const speechResult = event.results[0][0].transcript;
    console.log('result: ' + speechResult);
    console.log('confidence: ' + event.results[0][0].confidence);
    getGif(speechResult);
  };

  recognition.onend = () => {
    console.log('it is over');
    getSpeech();

  };

  recognition.onerror = event => {
    console.log('something went wrong: ' + event.error);
  };
}

function getGif(phrase) {
  let url = `http://api.giphy.com/v1/gifs/random?api_key=${giphyAPIKey}&tag=${phrase}`;
  console.log(url);
  fetch(url, {
      mode: 'cors'
    })
    .then(response => response.json())
    .then(result => {
      let imgUrl = result.data.image_url;
      let gridSize = 4;
      let spacing = windowWidth / gridSize;
      for (let i = 0; i < gridSize * gridSize; i++) {
        let d = createDiv(phrase);
        d.position((i % gridSize) * spacing,
          int(i / gridSize) * spacing);
        d.size(windowWidth / 4, windowWidth / 4);
        let fontsize = random(10, 100);
        d.style('background-color', 'black');
        d.style('background-size', 'cover');
        d.style('font-size', fontsize + 'px');
        d.style('padding', '10px');
        d.style('font-weight', 'bold');
        d.style('text-align', 'left');
        d.style('font-family', 'sans-serif');
        d.style('color', 'red');
        d.style('border', 'solid 5px');
        d.style('background-image', 'url(' + imgUrl + ')');
      }
    });
}
