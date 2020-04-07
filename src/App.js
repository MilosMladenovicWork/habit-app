import React, {useState, useEffect} from 'react';
import Swiper from 'react-id-swiper'
import {Route, withRouter} from 'react-router-dom'
import 'swiper/css/swiper.css'

import Header from './components/header'
import OutShadowContainer from './components/outshadowcontainer'
import InShadowContainer from './components/inshadowcontainer'
import Home from './components/home'
import Button from './components/button'
import ProtectedRoute from './components/protectedroute'
import InputField from './components/inputfield'
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

  const [name, setName] = useState('')

  function handleClick(e){
    e.preventDefault()
    localStorage.setItem('username', name)
    setName('')
    history.push('/home')
  }

  function handleChange(e){
    setName(e.target.value)
  }

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
            <InputField type='text' name='name' value={name} placeholder='Name' className='input-field' onChange={e => handleChange(e)}/>
            <Button type='submit' className='button' onClick={e => handleClick(e)}>
              Confirm
            </Button>
          </form>
        </div>
      </Swiper>
      }/>
      <ProtectedRoute authenticated={name} path='/home' component={Home}/>
    </div>
  );
}

export default withRouter(App);
