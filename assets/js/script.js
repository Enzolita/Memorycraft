const cards = document.querySelectorAll('.memory-card');
const startBtn = document.getElementById("start");
document.querySelector('.restart-button').addEventListener('click', function () {
    window.location.reload();
    return false;
});
document.querySelector('.refresh-page').addEventListener('click', function () {
    window.location.reload();
    return false;
});
let matches = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    // second click
    secondCard = this;
    checkForMatch();
}
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    const allDisabled = Array.from(cards).every(card => card.classList.contains('disabled'));
    matches += 1;
    console.log(matches);
    if (matches === 6) {
        // Show the win container
        document.getElementById('win-container').style.display = 'block';
        stopTimer(); // Stop the timer when the game is won
    }
    resetBoard();
}
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
cards.forEach(card => card.addEventListener('click', flipCard));
function initialEnableCards() {
    cards.forEach(card => {
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
    });
}
startBtn.addEventListener("click", () => {
    initialEnableCards();
    startGame(); // Start the game and the timer
});
function initialDisableCards() {
    console.log(cards, "<===card");
    cards.forEach(card => {
        card.style.opacity = "0.5";
        card.style.pointerEvents = "none";
    });
}
initialDisableCards();
let timerInterval;
let seconds = 0;
function updateTimer() {
    seconds--;
    if (seconds === 0) {
        document.getElementById('game-over-container').style.display = 'block';
        stopTimer();
    }
    const displaySeconds = seconds < 10 ? "0" + seconds : seconds;
    const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("timer").textContent = displayMinutes + ":" + displaySeconds;
}
function startTimer() {
    clearInterval(timerInterval);
    seconds = 40;
    minutes = 0;
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000); // Update timer every second
}
function stopTimer() {
    clearInterval(timerInterval);
}
function startGame() {
    startTimer();
    document.getElementById('start').style.display = 'none';
    document.getElementById('timer').style.display = 'block';
    document.getElementById('information').style.display = 'none';
    document.getElementById('info-button').style.display = 'none';
}

function endGame() {
    stopTimer();
    
}
const infoBtn = document.getElementById("info-button");

infoBtn.addEventListener('click', function(){
    document.getElementById('information').style.display = 'block';
    document.getElementById('info-button').style.display = 'none';
})


   



