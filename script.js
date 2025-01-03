let range = 0;
let secretNumber = 0;
let attemptsLeft = 5;

const inputField = document.getElementById('number-input');
const checkButton = document.getElementById('check-btn');
const messageBox = document.getElementById('message');
const hintBox = document.getElementById('hint');
const remainingBox = document.getElementById('remaining');
const guessList = document.getElementById('guess-list');
const inputSection = document.querySelector('.input-section');
const infoSection = document.querySelector('.info-area');
const newGameSection = document.getElementById('new-game-section');
const newGameButton = document.getElementById('new-game-btn');

const range50Button = document.getElementById('range-50');
const range100Button = document.getElementById('range-100');

// range selection
range50Button.addEventListener('click', () => {
    range = 50;
    startGame();
});

range100Button.addEventListener('click', () => {
    range = 100;
    startGame();
});

// game starter after range selection
function startGame() {
    secretNumber = Math.floor(Math.random() * range) + 1;
    inputSection.style.display = 'block';
    infoSection.style.display = 'block';
    document.querySelector('.range-selection').style.display = 'none';

    inputField.disabled = false;
    checkButton.disabled = false;
    messageBox.textContent = '';
    guessList.innerHTML = '';
    attemptsLeft = 5;
    remainingBox.textContent = attemptsLeft;
    newGameSection.style.display = 'none';
}

// check player guess
checkButton.addEventListener('click', () => {
    const playerGuess = parseInt(inputField.value);

    if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > range) {
        messageBox.textContent = `Please guess a number between 1 and ${range}.`;
        messageBox.style.color = 'red';
        return;
    }

    // show player guess
    const listItem = document.createElement('li');
    listItem.textContent = `You guessed ${playerGuess}`;
    guessList.appendChild(listItem);

    if (playerGuess === secretNumber) {
        messageBox.textContent = "🎉 Bingo! You guessed it right!";
        messageBox.style.color = 'green';
        endGame();
    } else {
        attemptsLeft--;
        remainingBox.textContent = attemptsLeft;

        if (attemptsLeft === 0) {
            messageBox.textContent = `💔 You ran out of tries. The number was ${secretNumber}.`;
            messageBox.style.color = 'red';
            endGame();
        } else {
            messageBox.textContent = playerGuess > secretNumber ? "Too high! Try again." : "Too low! Try again.";
            messageBox.style.color = '#ff7f50';
        }
    }
});

// end the game and disable inputs
function endGame() {
    checkButton.disabled = true;
    inputField.disabled = true;

    newGameSection.style.display = 'block';
}

// handle new game
newGameButton.addEventListener('click', () => {
    // reset game state and show the range selection again
    document.querySelector('.range-selection').style.display = 'block';
    newGameSection.style.display = 'none';
});