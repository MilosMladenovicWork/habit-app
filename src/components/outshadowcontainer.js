import React from 'react'

import './outshadowcontainer.css'

function OutShadowContainer({children, style}){
  return(
    <div className='out-shadow-container' style={style}>
      {children}
    </div>
  )
}

export default OutShadowContainer