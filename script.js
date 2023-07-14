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

function game(limit) {
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

game(5);