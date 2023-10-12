export default function calculateWinner(squares) {
  const win_moves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i=0; i<8; i++) {
    const [a, b, c] = win_moves[i];
    if ((squares[a] !== null) && (squares[a] == squares[b]) && (squares[b] == squares[c])) {
      return {
        win_state: true,
        index: i,
      }
    }
  }

  return false
}