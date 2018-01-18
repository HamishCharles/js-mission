// Array of colours
var colours = ['red', 'green', 'yellow', 'skyblue'];
var fadeToBlack;
var buttons = [];
var gameSequence = [];
var timedOut;

// Get a reference to the colour box
let colourBox = document.querySelector('#colour-box');
let messageBox = colourBox.querySelector('#message');

function btnClicked () {
  // `this` is the button i've just clicked
  changeColourBoxColour(this.id);
}

function message (msg) {
  messageBox.innerHTML = msg;
}

function changeColourBoxColour (colour) {
  // `this` is the button i've just clicked
  console.log(colour);
  clearTimeout(fadeToBlack);
  colourBox.style.backgroundColor = colour;
  if (colour !== 'black') {
    fadeToBlack = setTimeout(changeColourBoxColour.bind(null, 'black'), 950);
  }
}

function createButton (colour) {
  let button = document.createElement('button');
  button.innerText = button.style.backgroundColor = button.id = colour;
  button.onclick = btnClicked;
  button.disabled = true;
  colourBox.appendChild(button);
  buttons.push(button);
}

function displaySequence (sequence) {
  processQueue(sequence.slice());
}

function processQueue (sequence, fun, delay) {
  if (sequence.length) {
    fun(sequence.shift());
    var processNext = processQueue.bind(null, sequence, fun, delay);
    setTimeout(processNext, delay);
  }
}

function openingSequence () {
  processQueue(["red", "skyblue", "green", "red", "yellow", "yellow"], changeColourBoxColour, 1200);
}

function genRandomColour () {
  return colours[Math.floor(Math.random() * colours.length)];
}

function init () {
  colourBox.addEventListener('click', startGame, {once: true});

  message

  for (var i = 0; i < colours.length; i++) {
    var delay = (i * 500) + 500;
    createFunc = createButton.bind(this, colours[i]);
    setTimeout(createFunc, delay);
  }


  openingSequence ();
  setTimeout( () => { colourBox.classList.toggle('active'); }, 7000);
}

function toggleEnableButton (button) {
  button.disabled = !button.disabled;
}

function startGame () {
  console.info('Game started');
  gameSequence = [];
  gameLoop();
}

function endOfGame () {
  message('GAME OVER');
}

function gameLoop () {
  // 1. push new colour to sequence
  gameSequence.push(genRandomColour());
  // 2. display sequence
  processQueue(gameSequence.slice(), changeColourBoxColour, 1200);
  // 3. wait for user input
  buttons.forEach(toggleEnableButton);
  timedOut = setTimeout(endOfGame, gameSequence.length === 1 ? 4000 : 1500);

  // 4. check input - stop or next gameloop
}

init();
