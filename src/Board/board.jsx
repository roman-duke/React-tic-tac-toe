import PropTypes from 'prop-types'
import { useState } from 'react'
import board from './board_state'
import computer from '../minimax'
import './board.scss'

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  xIsNext: PropTypes.string.isRequired,
  comp_turn: PropTypes.bool.isRequired,
}

Square.propTypes = {
  pos: PropTypes.number.isRequired,
  curr_piece: PropTypes.string.isRequired,
  altTurn: PropTypes.func.isRequired,
  iscomp_turn: PropTypes.bool.isRequired,
  comp_move: PropTypes.number
}

Piece.propTypes = {
  piece: PropTypes.string.isRequired,
}

function Piece({piece}) {
  if (piece == "o") {
    return (
      <div className="piece-o">
        <svg id="nought" viewBox="0 0 24 24">
          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
        </svg>
      </div>
    )
  } 

  else if (piece == "x") {
    return (
      <div className="piece-x">
        <svg id="cross" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    )
  }

  return <div></div>
  
}

function Square(props) {
  const [clicked, setClicked] = useState(false);
  const [piece, setPiece] = useState(props.curr_piece);
  const [compMove, setCompMove] = useState(null);

  if ((props.comp_move == props.pos) && (props.iscomp_turn)) {
    // console.log(`It is computer's turn now --> ${props.iscomp_turn}`);
    // updateBoard();
    if (board.moves[props.comp_move] == null) {
      setTimeout(()=>{
        setCompMove(props.comp_move);
        updateBoard();
      }, 1000);
    }
  }

  function updateBoard() {
    //Update the board array with the appropriate piece
    if (!props.iscomp_turn) {
      board.move(props.pos, props.curr_piece);
      setClicked(true);
      setPiece(props.curr_piece);  
    } else {
      board.move(props.comp_move, props.curr_piece);
    }

    //Now, alternate turns
    props.altTurn();
  }

  function handleClick() {
    //Confirm you are not playing over an occupied square
    console.log(board.game_win());
    ((board.moves[props.pos] == null) && (board.game_win() == false)) ? updateBoard(): null;
  }

  const move = (clicked ? <Piece piece={piece} /> 
                        : (compMove == props.pos
                           ? <Piece piece={piece == 'x' ? 'o' : 'x'}/> : <></>));

  if (props.pos == 2 || props.pos == 5) {
    return (
      <div onClick={handleClick} className="cell bot-border">
        {move}
      </div>
    )
  }

  else if (props.pos == 6 || props.pos == 7) {
    return (
      <div onClick={handleClick} className="cell right-border">
       {move}
      </div>
    )
  }

  else if (props.pos == 8) {
    return (
      <div onClick={handleClick} className="cell">
        {move}
        {console.log(board.moves)}
      </div>
    )
  }

  return (
    <div onClick={handleClick} className="cell db-border">
      {move}
    </div>
  )
}

export default function Board(props) {
  function handleClick(i) {
    if (calculateWinner(props.squares) || props.squares[i]) {
      return;
    }

    const nextSquares = props.squares.slice();

    if (props.xIsNext) {
      nextSquares[i] = 'x';
    } else {
      nextSquares[i] = 'o';
    }

    onplay(nextSquares);
  }
  
  // const winner = calculateWinner(props.squares);

  // create an array consisting of 9 null items and assign it to a stateless variable
  const cells = 

  return (
    <div className="board">
      {.map(item => (
        <Square 
  
        /> 
      ))}
    </div>
  )
}

function calculateWinner(squares) {
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
    if ((squares.moves[a] !== null) && (squares.moves[a] == squares.moves[b]) && (squares.moves[b] == squares.moves[c])) {
      return {
        win_state: true,
        index: i,
      }
    }
  }

  return false
}