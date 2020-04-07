import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import {animated, useSpring} from 'react-spring'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'

import OutShadowContainer from './outshadowcontainer'
import SectionHeader from './sectionheader'
import Tasks from './tasks'
import Habits from './habits'
import Button from './button'
import BigButton from './bigbutton'
import testImg from '../images/logo.svg'
import './home.css'

const AnimatedBigButton = animated(BigButton)


function Home({history}){

  const [dissappear, setDissapear] = useState(true)
  const [bigButtonClicked, setBigButtonClicked] = useState(false)

  const spring = useSpring({to:[
    {display:dissappear ? 'inline-block' : 'inline-block'},
    {opacity:dissappear ? 0 : 1},
    {display:dissappear ? 'none' : 'inline-block'},
    {opacity:dissappear ? 0 : 1},
    {
      transform:bigButtonClicked ? 'translate(-50%) rotate(45deg)' : 'translate(-50%) rotate(0deg)',
    }
  ]})

  console.log(bigButtonClicked)
  
  const params = {
    pagination:{
      el:'.swiper-pagination',
      type:'bullets',
      clickable:true
    },
    initialSlide:1,
    on:{
      slideChange:function(){
        setBigButtonClicked(false)
        if(this.activeIndex === 0 || this.activeIndex === 2){
          setDissapear(false)
        }else{
          setDissapear(true)
        }
      }
    }
  }

  function resetStorage(e){
    e.preventDefault()
    localStorage.clear()
    history.push('/')
  }

  function handleClicked(){
    setBigButtonClicked((prevState) => !prevState)
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
            <Button type='submit' className='button' onClick={e => resetStorage(e)}>
              Reset Storage
            </Button>
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
      <AnimatedBigButton style={spring} onClick={() => handleClicked()}/>
    </div>
  )
}

export default withRouter(Home)