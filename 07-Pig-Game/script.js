"use strict";

// Selecting elemnts
const score0Element = document.querySelector("#score--0");
const score1Element = document.getElementById("score--1");
const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");
const currentScore0Element = document.querySelector("#current--0"); //INFO: The current score of player 1
const currentScore1Element = document.querySelector("#current--1"); //INFO: The current score of player 2
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

// Starting conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add("hidden");

let scores = [0, 0]; //NOTE: This array will hold the scores of both players, where by the score of the first player will be hold at an index 0, while the score of the second player will be hold at an index 1, initially the score of both players are 0
let currentScore = 0;
let activePlayer = 0; // NOTE: This variable will keep track of current active player such that it will be 0 for player1 and 1 for player2
let playing = true; //NOTE: This variable is used to track the state of the game

const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //NOTE: Reset the current score of the current player back to 0.
  activePlayer = activePlayer === 0 ? 1 : 0; //NOTE: Here we check the current value of active player and reassign it, such that if the current value is 0, reassign it to 1. OR if the current value is 1 reassign it to 0. Hence we are switching the player
  currentScore = 0;
  player0Element.classList.toggle("player--active"); //NOTE: The toggle() is used to add the class to that element if that class is not exist, and it remove the given class if it is already exist on the given element
  player1Element.classList.toggle("player--active");
};

const resetCurrentScore = function () {
  document.getElementById("current--0").textContent = currentScore;
  document.getElementById("current--1").textContent = currentScore;
};

const resetTotalScore = function () {
  document.getElementById("score--0").textContent = currentScore;
  document.getElementById("score--1").textContent = currentScore;
};

// Rolling a dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // TODO: Generate a random dice roll
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    // TODO: Display dice image
    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${randomDice}.png`; // NOTE: the .scr is used to select the src attribute of the image tag on the html document.

    // TODO: Check for a rolled 1: if true switch player, else add the dice roll to the current score
    if (randomDice !== 1) {
      // TODO: Add the dice roll to the current score
      currentScore += randomDice;
      // currentScore0Element.textContent = currentScore; //FIXME: Change it later so as the effect of adding current score can occur based on each player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // NOTE: This will update the current score dynamically based on the given player
    } else {
      // TODO: Switch to the next player
      switchplayer();
    }
  }
});

// TODO: Hold scores functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    // TODO: Add the current score to the active player's score(total scores)
    scores[activePlayer] = scores[activePlayer] + currentScore; //NOTE: Add the current score to the scores array based on the current score of the active player
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; //NOTE: Display the result of the total current score

    // TODO: Check if player score is >= 100
    if (scores[activePlayer] >= 100) {
      // TODO: finish the game
      playing = false; //NOTE: This will disable the roll dice button and hold button , hence the user will not be able to keep playing the game
      diceElement.classList.add("hidden"); // NOTE: Hide the dice image
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner"); //TODO: This will add the player--winner class which has some styles to the given html element
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active"); //TODO: This will remove the player--active class which has some styles to the given html element
    } else {
      // TODO: Switch to next player
      switchplayer();
    }
  }
});

// New game functionality
btnNew.addEventListener("click", function () {
  playing = true;
  scores = [0, 0];
  // TODO: Reset the current scores of both players to 0
  currentScore = 0;
  resetCurrentScore();

  // TODO: Reset the total scores of both players to 0
  resetTotalScore();

  // TODO: Hide the dice image
  diceElement.classList.add("hidden");

  // TODO: Remove the player-winner class to the given player
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");

  // TODO: Reset the active player to be player one
  activePlayer = 0;

  // TODO: Add the player-active class back to player 1
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
});
