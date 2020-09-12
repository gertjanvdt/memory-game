// BUTTONS
const nextButton = document.getElementById("next");
const nextTurn = document.getElementById("next-try");
const backButton = document.getElementById("back");
const startButton = document.getElementById("start");

// DOM ELEMENTS
const cardContainer = document.querySelector(".card-container");
const cards = document.getElementsByClassName("card");
const images = document.getElementsByTagName("img");
const overlay = document.querySelector(".message-container");
let playerInput = document.getElementById("player-amount").value;
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const playerNamesContainer = document.getElementById("player-names-container");
const startScreen = document.querySelector(".start-screen");

// GAME VARIABLES
let player1Score = document.getElementById("player1-score");
let resultText = document.querySelector(".message");
let imagesClicked = 0;
let playerScore = 0;
let correctGuesses = 0;
let cardsToPlay = 16;
let winner = "";
let img1;

// Phase 1 - Randomized images to gues and if match give point if all cards are choosen, game ends

// ***** FUNCTIONS *****

// function to set each set of the matching image
function setRandomImage() {
  // Object with info about the imgage and random order number
  const imagesPath = [
    { img: "img/bear.jpg", number: randomNumber(), id: 1 },
    { img: "img/buffelo.jpg", number: randomNumber(), id: 2 },
    { img: "img/cat.jpg", number: randomNumber(), id: 3 },
    { img: "img/elephant.jpg", number: randomNumber(), id: 4 },
    { img: "img/hippo.jpg", number: randomNumber(), id: 5 },
    { img: "img/koala.jpg", number: randomNumber(), id: 6 },
    { img: "img/lion.jpg", number: randomNumber(), id: 7 },
    { img: "img/monkey.jpg", number: randomNumber(), id: 8 },
  ];
  // Set the images in order from lowest to highest number to get a ramdom order of images
  const imageList = imagesPath.sort((a, b) => (a.number > b.number ? 1 : -1));

  // Loop through the randomized ordered list of images and create div and img element with relevant data
  for (let i = 0; i < cardsToPlay / 2; i++) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    const imgNode = document.createElement("img");
    imgNode.src = imageList[i].img;
    imgNode.className = "hidden";
    imgNode.id = imageList[i].id;
    cardDiv.appendChild(imgNode);
    cardContainer.appendChild(cardDiv);
  }
}

// Function to set images randomly
function randomNumber() {
  const number = Math.floor(Math.random() * 100);
  return number;
}

// Function on click
function onClick(e) {
  if (e.target.className === "card") {
    const img = e.target.firstElementChild;
    img.className = "";
    imagesClicked += 1;
    // Keep track of cards clicked and if 2 then check for match
    if (imagesClicked === 1) {
      img1 = img;
    } else if (imagesClicked === 2) {
      let img2 = img;
      checkIfMatch(img1, img2);
    }
  }
}

// Function to check if selected images match
function checkIfMatch(img1, img2) {
  let match;
  // Set time out so player can see result of 2nd card
  setTimeout(function () {
    if (img1.id === img2.id) {
      match = true;
      correctGuesses += 1;
      //  Add score for the player whos turn it is
      score();
      console.log(correctGuesses);
      if (correctGuesses === 8) {
        winner = "PLAYER1";
      }
    } else {
      match = false;
      // set clicked images back to hidden with delay to see result
      noMatch(img1, img2);
    }
    // Display result screen of try
    screenAfterTry(match, winner);
  }, 1000);
  // reset clicked counter for next turn
  imagesClicked = 0;
  // Check if all cards have been guessed
}

// Function to show screen of match or no match
function screenAfterTry(match, winner) {
  overlay.classList.remove("hidden");
  console.log(winner);
  if (winner === "") {
    if (match) {
      resultText.innerHTML = "YOUR GUESS WAS CORRECT &#128512;";
    } else {
      resultText.innerHTML = "YOUR GUESS WAS NOT CORRECT &#128542;";
    }
  } else {
    resultText.innerHTML = `${winner} WINS THE GAME!`;
    nextTurn.innerHTML = "Start new Game!";
  }
}

// Function to set back to hidden if no match
function noMatch(img1, img2) {
  img1.className = "hidden";
  img2.className = "hidden";
}

// Function to update player score
function score() {
  playerScore += 1;
  player1Score.innerHTML = playerScore;
}

// Function to check if all images have been guessed and end game
function gameEnd() {
  playerScore = 0;
  winner = "";
  nextTurn.innerHTML = "NEXT TURN";
  player1Score.innerHTML = playerScore;

  for (let i = 0; i < images.length; i++) {
    images[i].className = "hidden";
  }
}

// Function to show winner or draw screen upon end game

// ***** EVENT LISTENERS *****

// Listener for click on cards
cardContainer.addEventListener("click", (e) => {
  onClick(e);
});

nextTurn.addEventListener("click", (e) => {
  let buttonText = nextTurn.innerHTML;
  if (buttonText === "Start new Game!") {
    gameEnd();
  }

  overlay.classList.add("hidden");
});

document.createElement(setRandomImage());
document.createElement(setRandomImage());

// Whislist
// ===============
// Phase 2
// ===============

// ***** FUNCTIONS ******

// 1) Choose amount of players and add name

// Input player name up to 4 players
function setPLayerInput() {
  for (let i = 0; i < parseInt(playerInput); i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.className = "playerName";
    input.placeholder = `Name of player ${i + 1}`;
    playerNamesContainer.appendChild(input);
  }
}

function setWarning() {
  const warning = document.createElement("h3");
  warning.innerHTML = "PLEASE SELECT A NUMBER OF PLAYERS";
  warning.classList = "warning";
  step1.appendChild(warning);
}

const warningIsSet = () => {
  const warning = document.querySelector(".warning");
  if (warning === null) {
    return false;
  } else {
    return true;
  }
};

function removePlayerInputs() {
  while (playerNamesContainer.hasChildNodes()) {
    playerNamesContainer.removeChild(playerNamesContainer.firstChild);
  }
}

// Rotate turns with up to 4 players
class Player {
  constructor(playerName, playerScore, isTurn, isWinner) {
    this.playerName = playerName;
    this.playerScore = playerScore;
    this.isTurn = isTurn;
    this.isWinner = isWinner;
  }
}
// Function to create the players in the game after input
const playersObject = () => {
  const playerInputs = document.getElementsByClassName("playerName");
  const gamePlayers = [];
  for (let i = 0; i < playerInputs.length; i++) {
    gamePlayers.push(new Player(playerInputs[i].value, 0, false, false));
  }
  return gamePlayers;
};

function createPlayersScreen(players) {
  playerContainer = document.querySelector(".player-board-container");
  console.log(players);
  for (let i = 0; i < players.length; i++) {
    const div = document.createElement("div");
    div.classList.add("player");
    playerContainer.appendChild(div);
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    h2.innerHTML = players[i].playerName;
    h3.innerHTML = `Score: <span id="player${i + 1}-score">0</span>`;
    div.appendChild(h2);
    div.appendChild(h3);
  }
}

// ***** EVENT LISTENERS *****

// When player chooses amount of players and goes to next step
nextButton.addEventListener("click", (e) => {
  playerInput = document.getElementById("player-amount").value;
  if (playerInput !== "select") {
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
    setPLayerInput();
    // Check if players selected, otherwise display error
    // fix the issue that warning appear multiple times when clicking next
  } else if (warningIsSet() === false) {
    setWarning();
  }
});

// Back button go back to player selection
backButton.addEventListener("click", (e) => {
  step1.classList.remove("hidden");
  step2.classList.add("hidden");
  removePlayerInputs();
});

startButton.addEventListener("click", (e) => {
  createPlayersScreen(playersObject());
  startScreen.classList.add("hidden");
});

// Phase 3
// Ad max amount of tries before failing
// Choose amount of cards to play with
