import React, {useState, useEffect} from 'react';
import Swiper from 'react-id-swiper'
import {Route, withRouter} from 'react-router-dom'
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

function App({history}) {

  const [name, setName] = useState()

  function handleClick(e){
    e.preventDefault()
    localStorage.setItem('username', name)
    history.push('/home')
  }

  function handleChange(e){
    setName(e.target.value)
  }

  function resetStorage(e){
    e.preventDefault()
    localStorage.clear()
    history.push('/')
  }

  useEffect(() => {
    if(localStorage.getItem('username') !== null){
      history.push('/home')
    }
  }, [])

  return (
    <div className="App">
      <Header/>
      <Route path='/' exact render={() => 
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
            <input type='text' name='name' placeholder='Name' className='input-field' onChange={e => handleChange(e)}/>
            <button type='submit' className='submit-button' onClick={e => handleClick(e)}>Confirm</button>
          </form>
        </div>
      </Swiper>
      }/>
      <Route path='/home' render={() => 
        <div>
          Hello logged user
          <button type='submit' className='submit-button' onClick={e => resetStorage(e)}>Reset</button>
        </div>
      }/>
      
    </div>
  );
}

export default withRouter(App);
