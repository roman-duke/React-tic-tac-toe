import { useState } from 'react';
import Board from './Board/board';
import ScoreBoard from './Scoreboard/scoreboard';
import Notification from './Notification/notification';
import GameMode from './GameMode/gamemode';
import GameRestart from './GameRestart/gamerestart';
import calculateWinner from './win_checker';
import './App.scss'

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [scores, setScores] = useState([null, null]);
  const [isScoreUpdated, setIsScoreUpdated] = useState(false);
  const [compStart, setCompStart] = useState(false);
  const [compMode, setCompMode] = useState(true);
  const [gameMode, setGameMode] = useState(1);
  const [computerTurn, setComputerTurn] = useState(false);

  const cross_score = scores[0] !== null ? scores[0] : <>&ndash;</>;
  const nought_score = scores[1] !== null ? scores[1] : <>&ndash;</>;
  
  const currentSquares = history[history.length - 1];

  // Decide if it's computer's turn based on if computer started first 
  function changecompTurn() {
    
    if (compMode) {
      const availableSpaces = currentSquares.filter(item => item === null).length;

      if (compStart) {
        availableSpaces % 2 == 0 ? setComputerTurn(true) : setComputerTurn(false);
      } 
      else if (compStart == false) {
        availableSpaces % 2 == 1 ? setComputerTurn(true) : setComputerTurn(false);
      }
    }
  }

  function changeGameMode(mode) {
    setGameMode(mode);
    mode == 3 ? setCompMode(false) : setCompMode(true);
  }

  function scoreUpdate() {
    const nextScores = scores.slice();
    if (calculateWinner(currentSquares).piece == 'x') {
      nextScores[0] += 1;
      setScores(nextScores);
    } 
    
    else if (calculateWinner(currentSquares).piece == 'o') {
      nextScores[1] += 1;
      setScores(nextScores);
    }
  }

  function computerToStart() {
    if (!(compStart || computerTurn)) {
      setCompStart(true);
      setComputerTurn(true);
    }
  }

  if (calculateWinner(currentSquares) && isScoreUpdated == false) {
    scoreUpdate();
    setIsScoreUpdated(true);
  }
  

  function handleGamePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    nextSquares.includes(null) && !calculateWinner(nextSquares)  ? setXIsNext(!xIsNext) : null;
    changecompTurn();
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setXIsNext(true);
    setIsScoreUpdated(false);
    setCompStart(false);
    setComputerTurn(false);
  }

  return (
    <>
      <GameMode 
        onSelect={resetGame}
        changeMode={changeGameMode}
        gameMode={gameMode}
      />

      <ScoreBoard 
        noDraw={currentSquares.includes(null)}
        xIsNext={xIsNext}
        playerOneScore={cross_score}
        playerTwoScore={nought_score}
        computerToStart={computerToStart}
      />

      <Notification
        xIsNext={xIsNext}
        gameWin={calculateWinner(currentSquares)}
        squares={currentSquares}
        computerMode={compMode}
      />
    
        
        <Board
          gameMode={gameMode}
          compTurn={computerTurn}
          computerMode={compMode}
          computerStart={compStart}
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handleGamePlay}
        />

      <GameRestart onReset={resetGame}/>
    </>
  )
}