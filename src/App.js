import React from 'react';
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'

import Header from './components/header'
import OutShadowContainer from './components/outshadowcontainer'
import InShadowContainer from './components/inshadowcontainer'
import './App.css'

import welcomeImg from './images/logo.svg'

const params = {
  pagination:{
    el:'.swiper-pagination',
    type:'bullets',
    clickable:true
  }
}

function App() {
  return (
    <div className="App">
      <Header/>
      <Swiper {...params}>
        <div className='introduction-page'>
          <OutShadowContainer>
            <img src={welcomeImg} alt='Welcome' className='introduction-image'/>
          </OutShadowContainer>
          <InShadowContainer>
            <p>
              This is sample text. This is sample text. This is sample text. 
              This is sample text. This is sample text. This is sample text. 
              This is sample text. This is sample text. This is sample text. 
              This is sample text. This is sample text. This is sample text. 
            </p>
          </InShadowContainer>
        </div>
        <div className='introduction-page'>
          <OutShadowContainer>
            <img src={welcomeImg} alt='Welcome' className='introduction-image'/>
          </OutShadowContainer>
          <InShadowContainer>
            <p>
              This is sample text. This is sample text. This is sample text. 
              This is sample text. This is sample text. This is sample text. 
              This is sample text. This is sample text. This is sample text. 
              This is sample text. This is sample text. This is sample text. 
            </p>
          </InShadowContainer>
        </div>
        <div className='introduction-page'>
          <OutShadowContainer>
            <img src={welcomeImg} alt='Welcome' className='introduction-image'/>
          </OutShadowContainer>
          <form action='#' method='POST'>   
            <input type='text' name='name' placeholder='Name' className='input-field'/>
            <button type='submit' className='submit-button'>Confirm</button>
          </form>
        </div>
      </Swiper>
    </div>
  );
}

export default App;
