import PropTypes from 'prop-types'
import Cross from '../Svg/cross'
import Nought from '../Svg/nought.jsx'
import './score.scss'

ScoreBoard.propTypes = {
  scoresArr: PropTypes.array.isRequired,
}

export default function ScoreBoard({scoresArr}) {
  const cross_score = scoresArr[0] !== null ? scoresArr[0] : <>&mdash;</>;
  const nought_score = scoresArr[0] !== null ? scoresArr[1] : <>&mdash;</>;

  return (
    <div className="score-bar">
      <button className={"left-bar"}>
        <span className="cross">
          <Cross />
        </span>
        <span className="score">{cross_score}</span>
      </button>

      <button className={"right-bar"}>
        <span className="nought">
          <Nought />
        </span>
        <span className="score">{nought_score}</span>
      </button>
    </div>
  )
}