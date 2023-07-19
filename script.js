const choices = ["Rock", "Paper", "Scissors"];
const outcomes = {
    CPU_WIN : "CPU++",
    DRAW : "DRAW",
    PLAYER_WIN: "PLAYER++"
}

function getComputerChoice () {
    const rand = Math.floor(Math.random() * choices.length);
    return choices[rand];
}

function getPlayerChoice(choice) {
    // const choice = parseInt(prompt("What is your play?\n1 - Rock | 2 - Paper | 3 - Scissors"));
    return choices[choice-1];
}


// -----> VISUAL ELEMENTS
function hideWelcomeScreen() {
    var welcomeScreen = document.querySelector("#welcome");
    const transitionEndHandler = function() {
        welcomeScreen.classList.add("hidden");
        welcomeScreen.remove();
        welcomeScreen.removeEventListener('transitionend', transitionEndHandler);
    }
    welcomeScreen.style.opacity = '0';
    welcomeScreen.addEventListener('transitionend', transitionEndHandler);
}

const enterBtn = document.querySelector("#welcome-btn");
enterBtn.addEventListener('click', hideWelcomeScreen)

let playerHealth = 5;
let cpuHealth = 5;
const MAX_HEALTH = 5;

function updatePlayerHealth(value, max=5) {
    const healthBarFill = document.querySelector('#player-health');
    const percentage = (value / max) * 100;
    healthBarFill.style.width = percentage + '%';
}

function updateCPUHealth(value, max=5) {
    const healthBarFill = document.querySelector('#cpu-health');
    const percentage = (value / max) * 100;
    healthBarFill.style.width = percentage + '%';
}

function flashImage(url, isplayer) {
    let div;
    if (isplayer) {
        div = document.querySelector('#player-choice-display');
    }
    else {
        div = document.querySelector('#cpu-choice-display');
    }

    const imgElement = document.createElement('img');
    imgElement.classList.add('show-image')
    imgElement.src = url;
    imgElement.width = 50;
    div.appendChild(imgElement);

    setTimeout(() => {
        setTimeout(() => {
            setTimeout(() => {
                imgElement.remove();
            }, 500);
            imgElement.style.opacity = 0;
        }, 1500); // Adjust the duration (in milliseconds) to control how long the image is visible
        imgElement.style.opacity = 0.5;
    }, 1);
}

// Buttons and UI interaction for game loop

function decrementPlayerHealth() {
    playerHealth--;
    updatePlayerHealth(playerHealth, MAX_HEALTH);
}

function decrementCPUHealth() {
    cpuHealth--;
    updateCPUHealth(cpuHealth, MAX_HEALTH);
}

const rockBtn = document.querySelector('#rock-btn');
const paperBtn = document.querySelector('#paper-btn');
const scissorsBtn = document.querySelector('#scissors-btn');

const rockUrl = './assets/images/rock.png';
const paperUrl = './assets/images/paper.png';
const scissorsUrl = './assets/images/scissors.png';

const infoDisplay = document.querySelector('#info-display');
const playerChoiceDisplay = document.querySelector('#player-choice-display');
const cpuChoiceDisplay = document.querySelector('#cpu-choice-display');

const gameOverScreen = document.querySelector('#game-over');
const gameOverScreenText = document.querySelector('#game-over-text')
const resetBtn = document.querySelector('#reset-btn');
resetBtn.addEventListener('click', resetGame);

rockBtn.addEventListener('click', () =>{
    playRound(getPlayerChoice(1), getComputerChoice());
})

paperBtn.addEventListener('click', ()=>{
    playRound(getPlayerChoice(2), getComputerChoice());
})

scissorsBtn.addEventListener('click', ()=>{
    playRound(getPlayerChoice(3), getComputerChoice());
})

function disableButtons() {
    const buttons = document.querySelectorAll('.choice-btn');
    
    buttons.forEach(button => {
        button.disabled = true;
    });

}

function enableButtons() {
    const buttons = document.querySelectorAll('.choice-btn');
    
    buttons.forEach(button => {
        button.disabled = false;
    });
}

function draw() {
    infoDisplay.textContent = 'ITS A DRAW!';
}

function playerWin() {
    decrementCPUHealth();
    playerAttack();
    robotHurt();
    infoDisplay.textContent = "PLAYER WINS THE ROUND!";
}

function cpuWin() {
    decrementPlayerHealth();
    robotAttack();
    playerHurt();
    infoDisplay.textContent = "CPU WINS THE ROUND!";
}

function computeResult(playerChoice, computerChoice) {
    pChoice = playerChoice.toLowerCase();
    cChoice = computerChoice.toLowerCase();
    
    if (pChoice == "rock") {flashImage(rockUrl, true)}
    else if (pChoice == "paper") {flashImage(paperUrl, true);}
    else if (pChoice == "scissors") {flashImage(scissorsUrl, true);}

    if (cChoice == "rock") {flashImage(rockUrl, false);}
    else if (cChoice == "paper") {flashImage(paperUrl, false);}
    else if (cChoice == "scissors") {flashImage(scissorsUrl, false);}

    if (pChoice === cChoice) {
        return outcomes.DRAW;
    }

    case_1 = pChoice === "rock" && cChoice === "paper";
    case_2 = pChoice === "paper" && cChoice === "scissors";
    case_3 = pChoice === "scissors" && cChoice === "rock";
    if (case_1 || case_2 || case_3) {
        return outcomes.CPU_WIN;
    }
    else {
        return outcomes.PLAYER_WIN;
    }
}

function gameOverPlayer() {
    robotDead();
    setTimeout(() => {
        gameOverScreenText.textContent = 'YOU WIN!';
        showGameOver();
    }, 2000);
}

function gameOverCpu() {
    playerDead();
    setTimeout(() => {
        showGameOver();
    }, 2000);
}

function showGameOver() {
    gameOverScreen.style.display = 'flex';
    setTimeout(() => {
        gameOverScreen.style.opacity = 1;
    }, 0);
}

function endOfRound() {
    if (playerHealth <= 0) {
        gameOverCpu();
    }
    else if (cpuHealth <= 0) {
        gameOverPlayer();
    }
    infoDisplay.textContent = 'MAKE YOUR CHOICE';
    enableButtons();
}

function resetGame() {
    cpuHealth = MAX_HEALTH;
    playerHealth = MAX_HEALTH;

    updatePlayerHealth(MAX_HEALTH);
    updateCPUHealth(MAX_HEALTH);

    playerIdle();
    robotIdle();

    gameOverScreen.style.opacity = 0;
    setTimeout(() => {
        gameOverScreen.style.display = 'none';
    }, 2000);
}

function playRound(playerChoice, cpuChoice) {
    disableButtons();
    const result = computeResult(playerChoice, cpuChoice);

    if (result == outcomes.CPU_WIN) {
        cpuWin();
    }
    else if (result == outcomes.PLAYER_WIN) {
        playerWin();
    }
    else if (result == outcomes.DRAW) {
        draw();
    }
    setTimeout(() => {
        endOfRound();
    }, 2000);

}

// Functions to change gifs
const playerGif = document.querySelector('#player-box');
const robotGif = document.querySelector('#cpu-box');

function playerIdle() {
    playerGif.src = './assets/asset-gifs/raider-idle.gif';
}

function playerAttack() {
    playerGif.src = './assets/asset-gifs/raider-attack.gif';
    setTimeout(() => {
        playerIdle();
    }, 1000);
}

function playerHurt() {
    playerGif.src = './assets/asset-gifs/raider-hurt.gif';
    setTimeout(() => {
        playerIdle();
    }, 1000);
}

function playerDead() {
    playerGif.src = './assets/asset-gifs/raider-dead.gif';
}

function robotIdle() {
    robotGif.src = './assets/asset-gifs/robot-idle.gif';
}

function robotAttack() {
    robotGif.src = './assets/asset-gifs/robot-attack.gif';
    setTimeout(() => {
        robotIdle();
    }, 1100);
}

function robotHurt() {
    robotGif.src = './assets/asset-gifs/robot-hurt.gif';
    setTimeout(() => {
        robotIdle();
    }, 800);
}

function robotDead() {
    robotGif.src = './assets/asset-gifs/robot-dead.gif';
}
