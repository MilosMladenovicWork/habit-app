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
import appScreen1 from './images/appscreen1.svg'
import appScreen2 from './images/appscreen2.svg'
import appScreen3 from './images/appscreen3.svg'

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

  useEffect(() => {
    if(localStorage.getItem('username')){
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
            <img
              style={{height:"30vh",
                display:"block",
                margin:"auto",
                objectFit:"contain"
              }}
            src={appScreen1} alt='Welcome' className='introduction-image'/>
          </OutShadowContainer>
          <InShadowContainer>
            <p style={{textAlign:'center'}}>
              Welcome to BitHabit!
            </p>
          </InShadowContainer>
        </div>
        <div className='introduction-page'>
          <OutShadowContainer>
            <img
              style={{height:"30vh",
              display:"block",
              margin:"auto",
              objectFit:"contain"
            }}
            src={appScreen2} alt='Welcome' className='introduction-image'/>
          </OutShadowContainer>
          <InShadowContainer>
            <p style={{textAlign:'center'}}>
              Make tasks and habits, work on them and track what you have done! 
            </p>
          </InShadowContainer>
        </div>
        <div className='introduction-page'>
          <OutShadowContainer>
            <img
              style={{height:"30vh",
              display:"block",
              margin:"auto",
              width:"100%"
            }}
            src={appScreen3} alt='Welcome' className='introduction-image'/>
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
