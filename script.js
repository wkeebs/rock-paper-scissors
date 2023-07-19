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

// function game(limit=5) {
//     let playerCount = 0;
//     let computerCount = 0;
//     while (playerCount < limit && computerCount < 5) {
//         let playerChoice = getPlayerChoice();
//         let outcome = playRound(playerChoice, getComputerChoice());
//         if (outcome === outcomes.CPU) {
//             computerCount++;
//         }
//         else if (outcome === outcomes.PLAYER) {
//             playerCount++;
//         }
//         // console.log(`PLAYER: ${playerCount} | CPU: ${computerCount}`);
//     }
//     if (playerCount >= limit) {
//         alert("You win!");
//     }
//     else {
//         alert("CPU wins :(");
//     }
// }

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

let playerChoiceShowing = false;
let cpuChoiceShowing = false;

function flashPlayerImage(url) {
    if (playerChoiceShowing) {return;}
    playerChoiceShowing = true;
    const div = document.querySelector('#player-choice-display');
    const imgElement = document.createElement('img');
    imgElement.classList.add('show-image')
    imgElement.src = url;
    imgElement.width = 50;
    div.appendChild(imgElement);

    setTimeout(() => {
        setTimeout(() => {
            setTimeout(() => {
                imgElement.remove();
                playerChoiceShowing = false;
            }, 500);
            imgElement.style.opacity = 0;
        }, 2000); // Adjust the duration (in milliseconds) to control how long the image is visible
        imgElement.style.opacity = 1;
    }, 1);
}

function flashCpuImage(url) {
    if (cpuChoiceShowing) {return;}
    cpuChoiceShowing = true;
    const div = document.querySelector('#cpu-choice-display');
    const imgElement = document.createElement('img');
    imgElement.classList.add('show-image')
    imgElement.src = url;
    imgElement.width = 50;
    div.appendChild(imgElement);

    setTimeout(() => {
        setTimeout(() => {
            setTimeout(() => {
                imgElement.remove();
                cpuChoiceShowing = false;
            }, 500);
            imgElement.style.opacity = 0;
        }, 2000); // Adjust the duration (in milliseconds) to control how long the image is visible
        imgElement.style.opacity = 1;
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

let roundActive = false;
function gameLoop() {
    rockBtn.addEventListener('click', () =>{
        playUiRoud(getPlayerChoice(1), getComputerChoice());
    })

    paperBtn.addEventListener('click', ()=>{
        playUiRoud(getPlayerChoice(2), getComputerChoice());
    })

    scissorsBtn.addEventListener('click', ()=>{
        playUiRoud(getPlayerChoice(3), getComputerChoice());
    })

    if (cpuHealth == 0) {
        infoDisplay.textContent = "GAME OVER... PLAYER WINS!";
        return;
    }
    else if (playerHealth == 0) {
        infoDisplay.textContent = "GAME OVER... CPU WINS!";
        return;
    }
}

function draw() {
    infoDisplay.textContent = 'ITS A DRAW!';
}

function playerWin() {
    decrementCPUHealth();
    infoDisplay.textContent = "PLAYER WINS THE ROUND!";
}

function cpuWin() {
    decrementPlayerHealth();
    infoDisplay.textContent = "CPU WINS THE ROUND!";
}

function playRound(playerChoice, computerChoice) {
    pChoice = playerChoice.toLowerCase();
    cChoice = computerChoice.toLowerCase();
    
    if (pChoice == "rock") {flashPlayerImage(rockUrl)}
    else if (pChoice == "paper") {flashPlayerImage(paperUrl);}
    else if (pChoice == "scissors") {flashPlayerImage(scissorsUrl);}

    if (cChoice == "rock") {flashCpuImage(rockUrl);}
    else if (cChoice == "paper") {flashCpuImage(paperUrl);}
    else if (cChoice == "scissors") {flashCpuImage(scissorsUrl);}

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

function playUiRoud(playerChoice, cpuChoice) {
    disableButtons();
    const result = playRound(playerChoice, cpuChoice);

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
        infoDisplay.textContent = 'MAKE YOUR CHOICE';
        enableButtons();
    }, 3000);
}

gameLoop();