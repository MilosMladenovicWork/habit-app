import React from 'react'

import OutShadowContainer from './outshadowcontainer'

import logo from '../images/logo.svg'
import './header.css'

function Header(){
  return(
    <header>
      <OutShadowContainer style={{marginTop:0, borderTopLeftRadius:0, borderTopLeftRadius:0}}>
        <img src={logo} alt='logo' id='logo'/>
      </OutShadowContainer>
    </header>
  )
}

export default Header