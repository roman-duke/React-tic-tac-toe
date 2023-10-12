import PropTypes from 'prop-types'
import Cross from '../Svg/cross'
import Nought from '../Svg/nought.jsx'
import './notification.scss'

Notification.propTypes = {
  xIsNext: PropTypes.bool.isRequired,
  gameWin: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  squares: PropTypes.array.isRequired,
}

export default function Notification({xIsNext, gameWin, squares}) {
  
  const notification = xIsNext ? <Cross /> : <Nought />

  if (gameWin || !squares.includes(null)) {
    return (
      <div className="notification">Game Over</div>
    )
  } 

  else if (!(squares.includes('x') || squares.includes('o'))) {
    return (
      <div className="notification">Start game or Select player</div>
    )
  }


  return (
    <div className="notification">
      {notification} Turn
    </div>
  )
}