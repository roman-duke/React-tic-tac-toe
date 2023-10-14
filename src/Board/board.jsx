import PropTypes from 'prop-types'
import Nought from '../Svg/nought'
import Cross from '../Svg/cross'
import calculateWinner from '../win_checker'
import computer from '../minimax'
import './board.scss'

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  xIsNext: PropTypes.bool.isRequired,
  compTurn: PropTypes.bool.isRequired,
  computerStart: PropTypes.bool.isRequired,
  computerMode: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  gameMode: PropTypes.number.isRequired,
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
        <Nought />
      </div>
    )
  } 

  else if (piece == "x") {
    return (
      <div className="piece-x">
        <Cross />
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
  const nextSquares = props.squares.slice();

  
  function handleCompMove() {

    if (props.computerMode) {
      if (props.computerStart == true && props.compTurn == true) {
        nextSquares[computer(nextSquares, 'x', 'o', props.gameMode)[1]] = 'x';
      } 
      
      else if(props.computerStart == false && props.compTurn == true){
        const comp_pos = computer(nextSquares, 'o', 'x', props.gameMode);
        nextSquares[comp_pos[1]] = 'o';
      }
    }

    props.onPlay(nextSquares);
  }

  setTimeout(() => props.compTurn && !calculateWinner(nextSquares) ? handleCompMove() : null, 600);

  function handleClick(i) {
    if (calculateWinner(props.squares) || props.squares[i] || props.compTurn) {
      return;
    }

    if (props.xIsNext) {
      nextSquares[i] = 'x';
    } else {
      nextSquares[i] = 'o';
    }
    
    props.onPlay(nextSquares);
  }
  
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