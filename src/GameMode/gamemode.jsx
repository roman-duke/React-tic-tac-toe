import LightningIcon from '../Svg/lightning'
import TickIcon from '../Svg/tick'
import DropDrownIcon from '../Svg/dropdown'
import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import './gamemode.scss'

GameMode.propTypes = {
  onSelect: PropTypes.func.isRequired,
  gameMode: PropTypes.number.isRequired,
  changeMode: PropTypes.func.isRequired,
}

export default function GameMode({gameMode, changeMode, onSelect}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const fillColor = "#ffffff"
  const activeFillColor = "#fac546";
  const borderColor = "#cccaca";
  const activeBorderColor = "#231c1c"

  const difficultyLevelsJSX = [
    [<Fragment key={0}>Easy  
      <LightningIcon colorOne={activeFillColor} colorTwo={activeBorderColor} />
      <LightningIcon colorOne={fillColor} colorTwo={borderColor} />
      <LightningIcon colorOne={fillColor} colorTwo={borderColor} /></Fragment>],

    [<Fragment key={1}>Medium
      <LightningIcon colorOne={activeFillColor} colorTwo={activeBorderColor} />
      <LightningIcon colorOne={activeFillColor} colorTwo={activeBorderColor} />
      <LightningIcon colorOne={fillColor} colorTwo={borderColor} /></Fragment>],

    [<Fragment key={2}>Impossible
      <LightningIcon colorOne={activeFillColor} colorTwo={activeBorderColor} />
      <LightningIcon colorOne={activeFillColor} colorTwo={activeBorderColor} />
      <LightningIcon colorOne={activeFillColor} colorTwo={activeBorderColor} /></Fragment>],

    [<Fragment key={3}>Play Against a Friend</Fragment>]
  ];

  /* When the user clicks on the button, toggle between 
  hiding and showing the dropdown content */
  function handleShowDropdown(event) {
    event.stopPropagation();
    setShowDropdown(!showDropdown);
  }

  setTimeout(() => {
    /* Close the dropdown if the user clicks outside of it */
    window.onclick = function(e) {
      if (!e.target.matches('.dropBtn')) {
        const dropdown = document.getElementById("dropdown");
        getComputedStyle(dropdown).display !== 'none' ? handleShowDropdown(e) : null;
      }
    }
  }, 0);

  return (
    <div className="gamemode">
      <button onClick={handleShowDropdown} className="dropbtn">
        <DropDrownIcon /> 
        {difficultyLevelsJSX[gameMode]}
      </button>
      <div id="dropdown" className={`${showDropdown ? 'show' : ''} dropdown-content`}>
        {[...Array(4).keys()].map(item => (
          <div key={item} className={`${gameMode == item ? 'active' : ''} mode`}>
            {gameMode == item ? <TickIcon /> : null}
            <a key={item} onClick={
              () => {
                changeMode(item); 
                if (gameMode !== item) {
                  onSelect();
                }
            }}>
              {difficultyLevelsJSX[item]}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}