let fruits = [
    "blueberry",
    "mango",
    "strawberry",
    "melon",
    "banana",
    "cherry",
    "kiwi",
    "peaches",
    "apple",
    "pineapple",
    "watermelon",
    "rasberry"
]

let answer = '';
let maxWrong = 3;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    answer = fruits[Math.floor(Math.random() * fruits.length)];
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
      <button
        class="alphabtn"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
    }
}

function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = 'You Won!!!';
    }
}

function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('correctGuesses').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('correctGuesses').innerHTML = wordStatus;
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
    mistakes = 0;
    guessed = [];

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();