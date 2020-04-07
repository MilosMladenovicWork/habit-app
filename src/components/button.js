import React from 'react'

import './button.css'

function Button({children, type, onClick}){
  return(
    <button type={type && type} className='button' onClick={e => onClick(e)}>{children}</button>
  )
}

export default Button