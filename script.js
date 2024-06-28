let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const messageElement = document.getElementById('message');

function checkWin() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    if (!gameState.includes('')) {
        return 'tie';
    }
    return null;
}

function handleResult(result) {
    gameActive = false;
    if (result === 'tie') {
        messageElement.innerText = 'It\'s a tie!';
    } else {
        messageElement.innerText = `${result} wins!`;
    }
}

function makeMove(row, col) {
    const cellIndex = row * 3 + col;
    if (gameState[cellIndex] || !gameActive) {
        return;
    }
    gameState[cellIndex] = currentPlayer;
    document.getElementsByClassName('board-cell')[cellIndex].innerText = currentPlayer;
    let result = checkWin();
    if (result) {
        handleResult(result);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.innerText = `${currentPlayer}'s turn`;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    messageElement.innerText = `${currentPlayer}'s turn`;
    document.querySelectorAll('.board-cell').forEach(cell => cell.innerText = '');
}
