import React from 'react'

import OutShadowContainer from './outshadowcontainer'
import card from '../images/card.svg'
import mail from '../images/mail.svg'
import diamond from '../images/diamond.svg'
import megalophone from '../images/megalophone.svg'
import earth from '../images/earth.svg'
import news from '../images/news.svg'
import blackcat from '../images/blackcat.svg'
import bat from '../images/bat.svg'
import pumpkin from '../images/pumpkin.svg'
import witch from '../images/witch.svg'
import cauldron from '../images/cauldron.svg'
import grave from '../images/grave.svg'
import ghost from '../images/ghost.svg'
import cateyes from '../images/cateyes.svg'
import blackhouse from '../images/blackhouse.svg'
import yellowphone from '../images/yellowphone.svg'
import yellowgamepad from '../images/yellowgamepad.svg'
import yellowtv from '../images/yellowtv.svg'
import yellowskip from '../images/yellowskip.svg'
import yellowmic from '../images/yellowmic.svg'
import yellowstop from '../images/yellowstop.svg'
import yellowmusic from '../images/yellowmusic.svg'
import yellowplay from '../images/yellowplay.svg'
import yellowpause from '../images/yellowpause.svg'
import yellowheadphones from '../images/yellowheadphones.svg'
import shutdown from '../images/shutdown.svg'
import yellowcable from '../images/yellowcable.svg'

import './icons.css'

const icons = [
  card,
  mail,
  diamond,
  megalophone,
  earth,
  news,
  blackcat,
  bat,
  pumpkin,
  witch,
  cauldron,
  grave,
  ghost,
  cateyes,
  blackhouse,
  yellowphone,
  yellowgamepad,
  yellowtv,
  yellowskip,
  yellowmic,
  yellowstop,
  yellowmusic,
  yellowplay,
  yellowpause,
  yellowheadphones,
  shutdown,
  yellowcable
]

function Icons({
  handleIcon,
  selectedIcon
}){
  return(
    <div className='icons-container'>
      {
        icons.map((icon, index) =>
          <div style={{width:'fit-content', width:'21%', marginLeft:'2%', marginRight:'2%'}} onClick={(e) => handleIcon(e)}>
            <OutShadowContainer style={{marginBottom:'12px'}} className={selectedIcon === icon ? 'in-shadow-container' : null} key={index}>
              <img src={icon} style={{width:'100%'}}/>
            </OutShadowContainer>
          </div>
        ) 
      }
    </div>    
  )
}

export default Icons