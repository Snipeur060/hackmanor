
let score = 0;
let timeLeft = 30;
let gameInterval;
let ghostInterval;
let gameStarted = false;

const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const gameArea = document.querySelector('.game-area');
const startButton = document.getElementById('start-button');
//const backgroundSound = document.getElementById('background-sound');
//const endGameSound = document.getElementById('end-game-sound');

function startGame() {
    if (gameStarted) return; 
    gameStarted = true;
    startButton.disabled = true;
    //backgroundSound.play();
    gameInterval = setInterval(countDown, 1000);
    ghostInterval = setInterval(spawnGhost, 1500);
}


function countDown() {
    timeLeft--;
    timeElement.textContent = timeLeft;
    if (timeLeft <= 0) {
        endGame();
    }
}


function endGame() {
    clearInterval(gameInterval);
    clearInterval(ghostInterval);
    //backgroundSound.pause();
    alert(`Temps écoulé ! Votre score est : ${score}`);
    

    showEndGameImage();
}


function spawnGhost() {
    const ghost = document.createElement('div');
    ghost.classList.add('ghost');
    
    // Position aléatoire
    const x = Math.random() * (window.innerWidth - 60);
    const y = Math.random() * (window.innerHeight - 300); // Ajustez selon la hauteur de l'arrière-plan
    
    ghost.style.left = `${x}px`;
    ghost.style.top = `${y}px`;
    
    // Ajouter l'événement de clic
    ghost.addEventListener('click', () => {
        score++;
        scoreElement.textContent = score;
        ghost.remove();
    });
    
    gameArea.appendChild(ghost);
    
    setTimeout(() => {
        ghost.remove();
    }, 2000);
}

function showEndGameImage() {
    const endContainer = document.createElement('div');
    endContainer.classList.add('end-game-container');
    
    const endImage = document.createElement('img');
    endImage.src = 'https://t4.ftcdn.net/jpg/03/74/16/75/360_F_374167530_ZsM37zja3byI9dJaeNfBCF1tcQz5ZA8y.jpg';
    endImage.alt = 'Fin du Jeu';
    endImage.classList.add('end-game-image');
    
    const endText = document.createElement('p');
    endText.textContent = '🎃';
    endText.classList.add('end-game-text');
    
    endContainer.appendChild(endImage);
    endContainer.appendChild(endText);
    
    gameArea.appendChild(endContainer);
    

    //endGameSound.play();
    

    setTimeout(() => {
        endContainer.remove();
    }, 3000);
}


startButton.addEventListener('click', startGame);
