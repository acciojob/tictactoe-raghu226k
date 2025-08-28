//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const gameDiv = document.querySelector(".game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "";
let boardState = Array(9).fill("");

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;
  if (player1 && player2) {
    gameDiv.style.display = "block";
    document.querySelector(".setup").style.display = "none";
    currentPlayer = player1;
    currentSymbol = "X";
    messageDiv.textContent = `${currentPlayer}, you're up`;
  }
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = parseInt(cell.id) - 1;
    if (!boardState[index]) {
      boardState[index] = currentSymbol;
      cell.textContent = currentSymbol;
      if (checkWin()) {
        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
        cells.forEach(c => c.style.pointerEvents = "none");
      } else {
        switchPlayer();
      }
    }
  });
});

function switchPlayer() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = "O";
  } else {
    currentPlayer = player1;
    currentSymbol = "X";
  }
  messageDiv.textContent = `${currentPlayer}, you're up`;
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(i => boardState[i] === currentSymbol)
  );
}
