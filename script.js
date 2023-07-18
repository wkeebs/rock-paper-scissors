const choices = ["Rock", "Paper", "Scissors"];
const outcomes = {
    CPU : "CPU++",
    DRAW : "DRAW",
    PLAYER: "PLAYER++"
}

function getComputerChoice () {
    const rand = Math.floor(Math.random() * choices.length);
    return choices[rand];
}

function getPlayerChoice() {
    const choice = parseInt(prompt("What is your play?\n1 - Rock | 2 - Paper | 3 - Scissors"));
    return choices[choice-1];
}

function playRound(playerChoice, computerChoice) {
    pChoice = playerChoice.toLowerCase();
    cChoice = computerChoice.toLowerCase();
    if (pChoice === cChoice) {
        return outcomes.DRAW;
    }

    case_1 = pChoice === "rock" && cChoice === "paper";
    case_2 = pChoice === "paper" && cChoice === "scissors";
    case_3 = pChoice === "scissors" && cChoice === "rock";
    if (case_1 || case_2 || case_3) {
        return outcomes.CPU;
    }
    else {
        return outcomes.PLAYER;
    }
}

function game(limit=5) {
    let playerCount = 0;
    let computerCount = 0;
    while (playerCount < limit && computerCount < 5) {
        let playerChoice = getPlayerChoice();
        let outcome = playRound(playerChoice, getComputerChoice());
        if (outcome === outcomes.CPU) {
            computerCount++;
        }
        else if (outcome === outcomes.PLAYER) {
            playerCount++;
        }
        console.log(`PLAYER: ${playerCount} | CPU: ${computerCount}`);
    }
    if (playerCount >= limit) {
        alert("You win!");
    }
    else {
        alert("CPU wins :(");
    }
}

// -----> VISUAL ELEMENTS
function hideWelcomeScreen() {
    var welcomeScreen = document.querySelector("#welcome");
    const transitionEndHandler = function() {
        welcomeScreen.classList.add("hidden");
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

function decrementPlayerHealth() {
    updatePlayerHealth(playerHealth-1, MAX_HEALTH);
}

function decrementCPUHealth() {
    updateCPUHealth(cpuHealth-1, MAX_HEALTH);
}

