const cardContainer = document.querySelector(".card-container");
const cards = document.getElementsByClassName("card");
const images = document.getElementsByTagName("img");
let player1Score = document.getElementById("player1-score");
let resultText = document.querySelector(".message");
const overlay = document.querySelector(".message-container");
const nextTurn = document.getElementById("next-try");
let playerInput = document.getElementById("player-amount").value;
const nextButton = document.getElementById("next");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
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

// 1) Choose amount of players and add name

nextButton.addEventListener("click", (e) => {
  playerInput = document.getElementById("player-amount").value;
  if (playerInput !== "select") {
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
    setPLayerInput();
  } else {
    const warning = document.createElement("h3");
    warning.innerHTML = "PLEASE SELECT A NUMBER OF PLAYERS";
    warning.classList = "warning";
    step1.appendChild(warning);
  }
});

// ***** FUNCTIONS ******

// Input player name up to 4 players
function setPLayerInput() {
  for (let i = 0; i < parseInt(playerInput); i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Name of player ${i + 1}`;
    const playerNames = document.getElementById("player-names");
    playerNames.appendChild(input);
  }
}

// Back button go back to player selection

// Check if players selected, otherwise display error

// Rotate turns with up to 4 players

// Phase 3
// Ad max amount of tries before failing
// Choose amount of cards to play with
