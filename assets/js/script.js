const cards = document.querySelectorAll('.memory-card');
document.querySelector('.restart-button').addEventListener('click', function(){
    window.location.reload();
    return false;
  });

  document.querySelector('.refresh-page').addEventListener('click', function(){
    window.location.reload();
    return false;
  });

  
let matches = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if ( this === firstCard) return;

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


    matches += 1
    console.log(matches)
    if (matches === 1) {
        // Show the win container
        document.getElementById('win-container').style.display = 'block';
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




