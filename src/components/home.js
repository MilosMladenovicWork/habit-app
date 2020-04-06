import React from 'react'
import {withRouter} from 'react-router-dom'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'

import OutShadowContainer from './outshadowcontainer'
import SectionHeader from './sectionheader'
import Tasks from './tasks'
import Habits from './habits'
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
        <div>
          <SectionHeader>
            Tasks
          </SectionHeader>
          <div className='content'>
            <Tasks/>
          </div>
        </div>
        <div>
          <SectionHeader>
            Hi {localStorage.getItem('username')}
          </SectionHeader>
          <div className='content'>
            <OutShadowContainer>
              <img src={testImg} alt='Welcome' className='introduction-image'/>
            </OutShadowContainer>
            <button type='submit' className='submit-button' onClick={e => resetStorage(e)}>Reset</button>
          </div>
        </div>
        <div>
          <SectionHeader>
            Habits
          </SectionHeader>
          <div className='content'>
            <Habits/>
          </div>
        </div>
      </Swiper>
    </div>
  )
}

export default withRouter(Home)