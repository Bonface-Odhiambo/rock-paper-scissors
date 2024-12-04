// Initialize the score object
const score = JSON.parse(localStorage.getItem("score")) || { wins: 0, losses: 0, ties: 0 };

// Update the score display on page load
updateScoreElement();

let isAutoPlaying = false, intervalId;

// Function to toggle auto-play
function autoPlay() {
  if (isAutoPlaying) {
    clearInterval(intervalId);  // Stop autoplay
  } else {
    intervalId = setInterval(() => playGame(pickComputerMove()), 1000);  // Start autoplay
  }
  isAutoPlaying = !isAutoPlaying;
}

// Function to play the game
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = (playerMove === computerMove) 
    ? "It's a tie!" 
    : (["rock-scissors", "paper-rock", "scissors-paper"].includes(`${playerMove}-${computerMove}`))
    ? "You win!" 
    : "You lose!";

  // Update score
  score[result === "You win!" ? "wins" : result === "You lose!" ? "losses" : "ties"]++;

  // Save score to localStorage and update the display
  localStorage.setItem("score", JSON.stringify(score));
  document.querySelector(".js-result").textContent = result;
  document.querySelector(".js-moves").textContent = `You: ${playerMove} | Computer: ${computerMove}`;
  updateScoreElement();
}

// Function to update the score display
function updateScoreElement() {
  document.querySelector(".js-score").textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Function to randomly pick the computer's move
function pickComputerMove() {
  return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
}
