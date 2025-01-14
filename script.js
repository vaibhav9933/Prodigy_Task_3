let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = clickedCell.getAttribute('data-index');

  if (gameState[cellIndex] !== '' || checkWinner()) {
    return;
  }

  makeMove(cellIndex, currentPlayer);

  if (checkWinner()) {
    messageDisplay.textContent = `Player ${currentPlayer} wins!`;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (currentPlayer === 'O') {
    setTimeout(aiMove, 500);
  } else {
    messageDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function makeMove(index, player) {
  gameState[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add('taken');
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }
  return roundWon;
}

function aiMove() {
  const emptyCells = gameState.map((value, index) => value === '' ? index : null).filter(value => value !== null);
  if (emptyCells.length > 0) {
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, currentPlayer);

    if (checkWinner()) {
      messageDisplay.textContent = `Player ${currentPlayer} wins!`;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function restartGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  messageDisplay.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}