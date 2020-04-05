import React from 'react'

import './sectionheader.css'

function SectionHeader({children}){
  return(
    <div className='section-header'>
      <h1>
        {children}
      </h1>
    </div>
  )
}

export default SectionHeader