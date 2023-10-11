import { useState } from 'react';
import Board from './Board/board';
import './App.scss'

// function PlayerDisplay() {

// }

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [compStart, setCompStart] = useState(false);

  const currentSquares = history[history.length - 1];

  function handleGamePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <Board
      compStart={compStart}
      xIsNext={xIsNext}
      squares={currentSquares}
      onPlay={handleGamePlay}
    />
  )
}