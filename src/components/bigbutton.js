import React from 'react'

import bigButton from '../images/bigbutton.svg'
import './bigbutton.css'


function BigButton({style, onClick}){
  return(
    <img onClick={() => onClick && onClick()} style={style} className='big-button' src={bigButton} alt='action button'/>
  )
}

export default BigButton