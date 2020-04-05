import React from 'react'
import {withRouter} from 'react-router-dom'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'

import OutShadowContainer from './outshadowcontainer'
import SectionHeader from './sectionheader'
import testImg from '../images/logo.svg'
import './home.css'

const params = {
  pagination:{
    el:'.swiper-pagination',
    type:'bullets',
    clickable:true
  },
  initialSlide:1
}

function Home({history}){

  function resetStorage(e){
    e.preventDefault()
    localStorage.clear()
    history.push('/')
  }

  return(
    <div id='home'>
      <Swiper {...params}>
        <div className='padding-page'>
          <SectionHeader>
            Tasks
          </SectionHeader>
          <OutShadowContainer>
            <img src={testImg} alt='Welcome' className='introduction-image'/>
          </OutShadowContainer>
          <button type='submit' className='submit-button' onClick={e => resetStorage(e)}>Reset</button>
        </div>
        <div className='padding-page'>
          <SectionHeader>
            Hi {localStorage.getItem('username')}
          </SectionHeader>
          <OutShadowContainer>
            <img src={testImg} alt='Welcome' className='introduction-image'/>
          </OutShadowContainer>
          <button type='submit' className='submit-button' onClick={e => resetStorage(e)}>Reset</button>
        </div>
        <div className='padding-page'>
          <SectionHeader>
            Habits
          </SectionHeader>
          <OutShadowContainer>
            <img src={testImg} alt='Welcome' className='introduction-image'/>
          </OutShadowContainer>
          <button type='submit' className='submit-button' onClick={e => resetStorage(e)}>Reset</button>
        </div>
      </Swiper>
    </div>
  )
}

export default withRouter(Home)