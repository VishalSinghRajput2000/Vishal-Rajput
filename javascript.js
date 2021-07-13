'use strict';
const active1El = document.querySelector('.container-0');
const active2El = document.querySelector('.container-1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore1 = document.getElementById('current-0');
const currentScore2 = document.getElementById('current-1');
const diceEl = document.querySelector('.dice');
const diceRoll = document.getElementById('btn0');
const diceHold = document.getElementById('btn1');
const diceReset = document.getElementById('btn2');
//STARTING CONDITION
let scores, currentScore, activePlayer, playing;
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;
    diceEl.classList.add('hidden');
    active1El.classList.remove('winner');
    active2El.classList.remove('winner');
    active1El.classList.add('active-player');
    active2El.classList.remove('active-player');
}
init();
let switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current-${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    active1El.classList.toggle('active-player');
    active2El.classList.toggle('active-player');

}
//DICE ROLLING FUNCTIONALITY

diceRoll.addEventListener('click', function () {
    //Generating a random roll
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        //display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;

            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

diceHold.addEventListener('click', function () {

    if (playing) {
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            playing = false;
            document.querySelector(`.container-${activePlayer}`).classList.add('winner');
            document.querySelector(`.container-${activePlayer}`).classList.remove('active-player');
        } else {
            switchPlayer();
        }
    }
})

diceReset.addEventListener('click', init);