import React from 'react'

import './outshadowcontainer.css'

function OutShadowContainer({
  children, 
  style, 
  className, 
  onClick
}){
  return(
    <div 
      onClick={(e) => onClick && onClick(e)}
      className={`out-shadow-container ${className}`} style={style}>
      {children}
    </div>
  )
}

export default OutShadowContainer