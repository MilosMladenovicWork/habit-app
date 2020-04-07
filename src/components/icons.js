import React from 'react'

import OutShadowContainer from './outshadowcontainer'
import card from '../images/card.svg'
import mail from '../images/mail.svg'

const icons = [
  card,
  mail
]

function Icons({
  handleIcon,
  selectedIcon
}){
  return(
    <div style={{display:'flex'}}>
      {
        icons.map((icon, index) =>
          <div style={{width:'fit-content'}} onClick={(e) => handleIcon(e)}>
            <OutShadowContainer className={selectedIcon === icon ? 'in-shadow-container' : null} key={index}>
              <img src={icon} style={{width:'27px'}}/>
            </OutShadowContainer>
          </div>
        ) 
      }
    </div>    
  )
}

export default Icons