import React from 'react'

import './button.css'

function Button({children, type, style, onClick}){

  return(
    <button type={type && type} className='button' style={style} onClick={e => onClick(e)}>{children}</button>
  )
}

export default Button