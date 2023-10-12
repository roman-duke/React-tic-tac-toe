import { useState } from 'react'
import PropTypes from 'prop-types'
import Cross from '../Svg/cross'
import Nought from '../Svg/nought.jsx'
import './score.scss'

ScoreBoard.propTypes = {
  xIsNext: PropTypes.bool.isRequired,
  gameWin: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}

export default function ScoreBoard({gameWin, xIsNext}) {
  const [scores, setScores] = useState([null, null]);
  const [isScoreUpdated, setIsScoreUpdated] = useState(false);

  const cross_score = scores[0] !== null ? scores[0] : <>&ndash;</>;
  const nought_score = scores[1] !== null ? scores[1] : <>&ndash;</>;

  function scoreUpdate() {
    const nextScores = scores.slice();
    if (xIsNext) {
      nextScores[1] += 1;
      setScores(nextScores);
    } else {
      nextScores[0] += 1;
      setScores(nextScores);
    }
  }

  if (gameWin && isScoreUpdated == false) {
    scoreUpdate();
    setIsScoreUpdated(true);
  }

  return (
    <div className="score-bar">
      <button className={`${xIsNext ? 'active' : ''} left-bar`}>
        <span className="cross">
          <Cross />
        </span>
        <span className="score">{cross_score}</span>
      </button>

      <button className={`${xIsNext ? '' : 'active'} right-bar`}>
        <span className="nought">
          <Nought />
        </span>
        <span className="score">{nought_score}</span>
      </button>
    </div>
  )
}