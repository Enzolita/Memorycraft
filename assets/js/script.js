// Set all variables
const cards = document.querySelectorAll('.memory-card');
const startBtn = document.getElementById("start");
const closeButton = document.querySelector('.close-button');
const information = document.getElementById('information');
const infoBtn = document.getElementById("info-button");
let matches = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timerInterval;
let seconds = 0;
let minutes = 0;

// Add event listener to restart buttons to reload the page
document.querySelectorAll('.restart-button').forEach(button => {
    button.addEventListener('click', function () {
        window.location.reload();
        return false;
    });
});

// Add event listener to refresh the page when clicking the page header
document.querySelector('.refresh-page').addEventListener('click', function () {
    window.location.reload();
    return false;
});

infoBtn.addEventListener('click', function() {
    information.style.display = 'block';
    infoBtn.style.display = 'none';
});

closeButton.addEventListener('click', function() {
    information.style.display = 'none';
    infoBtn.style.display = 'inline';
});

// Hide the information modal when the Escape key is pressed
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        information.style.display = 'none';
        infoBtn.style.display = 'block';
    }
});

// Flip a card when clicked
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}

// Check if the two flipped cards match
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matches += 1;
    if (matches === 6) {
        // Show the win container when all matches are found
        document.getElementById('win-container').style.display = 'block';
        stopTimer();
    }
    resetBoard();
}

// Unflip cards if they don't match
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

// Add click event listeners for each card
cards.forEach(card => card.addEventListener('click', flipCard));

// Enable cards for interaction
function initialEnableCards() {
    cards.forEach(card => {
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
    });
}

// Start the game when the start button is clicked
startBtn.addEventListener("click", () => {
    initialEnableCards();
    startGame();
});

// Disable cards temporarily to prevent interaction
function initialDisableCards() {
    cards.forEach(card => {
        card.style.opacity = "0.5";
        card.style.pointerEvents = "none";
    });
}

initialDisableCards();

// Update the timer display
function updateTimer() {
    seconds--;
    if (seconds === 0) {
        // Show game over container when the timer runs out
        document.getElementById('game-over-container').style.display = 'block';
        stopTimer();
    }
    const displaySeconds = seconds < 10 ? "0" + seconds : seconds;
    const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("timer").textContent = displayMinutes + ":" + displaySeconds;
}

function startTimer() {
    clearInterval(timerInterval);
    seconds = 60; // Game duration
    minutes = 0;
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Start the game by showing the timer and hiding unnecessary elements
function startGame() {
    startTimer();
    startBtn.style.display = 'none';
    document.getElementById('timer').style.display = 'block';
    information.style.display = 'none';
    infoBtn.style.display = 'none';
}

