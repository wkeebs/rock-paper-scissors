const choices = ["Rock", "Paper", "Scissors"];

function getComputerChoice () {
    const rand = Math.floor(Math.random() * choices.length);
    return choices[rand];
}
