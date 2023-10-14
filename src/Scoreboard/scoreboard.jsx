import PropTypes from 'prop-types'
import Cross from '../Svg/cross'
import Nought from '../Svg/nought.jsx'
import './score.scss'

ScoreBoard.propTypes = {
  computerToStart: PropTypes.func.isRequired,
  xIsNext: PropTypes.bool.isRequired,
  noDraw: PropTypes.bool.isRequired,
  playerOneScore: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  playerTwoScore: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
}

export default function ScoreBoard({noDraw, computerToStart, xIsNext, playerOneScore, playerTwoScore}) {

  return (
    <div className="score-bar">
      <button className={`${xIsNext ? (noDraw ? 'active' : '') : ''} left-bar`}>
        <span className="cross">
          <Cross />
        </span>
        <span className="score">{playerOneScore}</span>
      </button>

      <button onClick={() => computerToStart()} className={`${xIsNext ? (noDraw ? '' : '') : 'active'} right-bar`}>
        <span className="nought">
          <Nought />
        </span>
        <span className="score">{playerTwoScore}</span>
      </button>
    </div>
  )
}