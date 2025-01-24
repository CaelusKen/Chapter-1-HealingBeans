export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function isBoardFull(squares) {
  return squares.every((square) => square !== null);
}

export function getComputerMove(squares) {
  // Simple AI: Choose the first available move
  const availableMoves = squares.reduce((acc, square, index) => {
    if (square === null) {
      acc.push(index);
    }
    return acc;
  }, []);

  if (availableMoves.length === 0) {
    return -1;
  }

  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}
