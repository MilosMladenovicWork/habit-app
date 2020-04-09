import React from 'react'

import OutShadowContainer from './outshadowcontainer'
import card from '../images/card.svg'
import mail from '../images/mail.svg'
import diamond from '../images/diamond.svg'
import megalophone from '../images/megalophone.svg'
import earth from '../images/earth.svg'
import news from '../images/news.svg'

import './icons.css'

const icons = [
  card,
  mail,
  diamond,
  megalophone,
  earth,
  news
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