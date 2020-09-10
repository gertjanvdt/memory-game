const cardContainer = document.querySelector(".card-container");
const cards = document.getElementsByClassName("card");
const images = document.getElementsByTagName("img");
let player1Score = document.getElementById("player1-score");
let resultText = document.querySelector(".message");
const overlay = document.querySelector(".message-container");
const nextTurn = document.getElementById("next-try");
let imagesClicked = 0;
let playerScore = 0;
let correctGuesses = 0;
let winner = "";

let img1;

const imagesPath = [
  "img/bear.jpg",
  "img/buffelo.jpg",
  "img/cat.jpg",
  "img/elephant.jpg",
  "img/hippo.jpg",
  "img/koala.jpg",
  "img/lion.jpg",
  "img/monkey.jpg",
];

// ***** FUNCTIONS *****

// Function to set images randomly

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

  console.log("game end function");
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

// Whislist
// Choose amount of players and add name
// Choose amount of cards to play with
// Input player name up to 4 players
// Rotate turns with up to 4 players
// Ad max amount of tries before failing
