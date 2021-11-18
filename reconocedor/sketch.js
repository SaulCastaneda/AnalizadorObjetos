
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/hs2hkJ-HN/'
//let imageModelURL = './model/'

// Classifier Variable
let classifier;
// Model URL
// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let texto = ""
// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(480, 460);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  if (label === "Spiderman") {
    texto = " \n 🕷🕸⚡ \n SpiderVerse Confirmado OwO"
  
  } else if (label === "Charmander") {
    texto = "\n 🔥🐭 \n Charmander :D"
  } else if (label === "Gogru") {
    texto = "\n 👽🌑\n Baby Yoda UwU"
  }
  
  // Draw the label
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(texto, width / 2, height/2);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();

}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}