"use strict";
//some global variables
let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

//selecting element
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");
const diceEL = document.querySelector(".dice");

//Buttons in the game
const rollBtn = document.querySelector(".btn--roll");
const newGameBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
const currentScore0EL = document.getElementById("current--0");
const currentScore1EL = document.getElementById("current--1");

score0EL.textContent = "0";
score1EL.textContent = "0";
diceEL.classList.add("hidden");

//Function to initialise
const init = function () {
  diceEL.classList.add("hidden");
  activePlayer = 0;
  playing = true;
  scores[0] = scores[1] = 0;
  //scores
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentScore0EL.textContent = 0;
  currentScore1EL.textContent = 0;

  //color of the winner
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
};
//Function to switch player
const switchPlayer = function () {
  //switch player
  document.getElementById(`current--${activePlayer}`).textContent = "0";
  activePlayer = 1 - activePlayer;
  currentScore = 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};
//Making a die roll
rollBtn.addEventListener("click", function () {
  if (playing) {
    // 1.Generate random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the dice roll
    diceEL.classList.remove("hidden");

    //3. Check for 1
    diceEL.src = `dice-${dice}.png`;
    if (dice !== 1) {
      // add to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if score is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add("hidden"); //remove the dice after Game over
      //Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //3. Switch to the next player
      switchPlayer();
    }
  }
});

//Functionality for new game button
newGameBtn.addEventListener("click", init);
