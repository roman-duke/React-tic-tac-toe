import PropTypes from 'prop-types'
import './gamerestart.scss'

GameRestart.propTypes ={
  onReset: PropTypes.func.isRequired,
}

export default function GameRestart({onReset}) {
  return (
    <div onClick={() => onReset()} className="restart-game">
      Restart Game
    </div>
  )
}