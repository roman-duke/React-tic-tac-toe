import PropTypes from 'prop-types'
// import computer from '../minimax'
import './board.scss'

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  xIsNext: PropTypes.bool.isRequired,
  // comp_turn: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
}

Square.propTypes = {
  pos: PropTypes.number.isRequired,
  value: PropTypes.string,
  onSquareClick: PropTypes.func.isRequired,
}

Piece.propTypes = {
  piece: PropTypes.string,
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

function Square({pos, value, onSquareClick}) {

  if (pos == 2 || pos == 5) {
    return (
      <div onClick={onSquareClick} className="cell bot-border">
        <Piece piece={value} />
      </div>
    )
  }

  else if (pos == 6 || pos == 7) {
    return (
      <div onClick={onSquareClick} className="cell right-border">
       <Piece piece={value} />
      </div>
    )
  }

  else if (pos == 8) {
    return (
      <div onClick={onSquareClick} className="cell">
        <Piece piece={value} />
      </div>
    )
  }

  return (
    <div onClick={onSquareClick} className="cell db-border">
      <Piece piece={value} />
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

    props.onPlay(nextSquares);
  }
  
  // const winner = calculateWinner(props.squares);

  // create an array consisting of numbers 0 to 8
  const cells = [...Array(9).keys()];

  return (
    <div className="board">
      {cells.map(item => (
        <Square 
          key={item}
          pos={item}
          value={props.squares[item]} 
          onSquareClick={() => handleClick(item)}
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
    if ((squares[a] !== null) && (squares[a] == squares[b]) && (squares[b] == squares[c])) {
      return {
        win_state: true,
        index: i,
      }
    }
  }

  return false
}