import React from 'react'

import './outshadowcontainer.css'

function OutShadowContainer({children, style, className}){
  return(
    <div className={`out-shadow-container ${className}`} style={style}>
      {children}
    </div>
  )
}

export default OutShadowContainer