import React from 'react'

import './inshadowcontainer.css'

function InShadowContainer({children}){
  return(
    <div className='in-shadow-container'>
      {children}
    </div>
  )
}

export default InShadowContainer