const choices = ["Rock", "Paper", "Scissors"];
const outcomes = {
    LOSS : "You lose!",
    DRAW : "It's a draw.",
    WIN: "You win!"
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
        return outcomes.LOSS;
    }
    else {
        return outcomes.WIN;
    }
}

const computerSelection = getComputerChoice();
const playerSelection = getPlayerChoice();
console.log(`${playerSelection} vs ${computerSelection}`);
console.log(playRound(playerSelection, computerSelection));