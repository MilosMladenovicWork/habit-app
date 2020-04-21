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
import StartScreen from './startscreen'
import MotivationalImages from './motivationalimages'
import './home.css'

const AnimatedBigButton = animated(BigButton)


function Home({history}){

  const [dissappear, setDissapear] = useState(true)
  const [bigButtonClicked, setBigButtonClicked] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(1)

  const spring = useSpring({to:[
    {display:dissappear ? 'inline-block' : 'inline-block'},
    {opacity:dissappear ? 0 : 1},
    {display:dissappear ? 'none' : 'inline-block'},
    {opacity:dissappear ? 0 : 1},
    {
      transform:bigButtonClicked ? 'translate(-50%) rotate(45deg)' : 'translate(-50%) rotate(0deg)',
    }
  ]})
  
  const params = {
    pagination:{
      el:'.swiper-pagination',
      type:'bullets',
      clickable:true
    },
    breakpoints:{
      1200:{
        centeredSlides:true,
        slidesPerView:"auto",
        navigation:{
          nextEl:'.swiper-button-next',
          prevEl:'.swiper-button-prev'
        }
      }
    },
    initialSlide:1,
    on:{
      slideChange:function(){
        setCurrentSlide(this.activeIndex)
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
            <Tasks 
              currentSlide={currentSlide}
              clickedButton={bigButtonClicked}
              setBigButtonClicked={setBigButtonClicked} 
              />
          </div>
        </div>
        <div>
          <SectionHeader>
            Hi {localStorage.getItem('username')}
          </SectionHeader>
          <div className='content'>
            <StartScreen 
              currentSlide={currentSlide}
              onClick={(e) => resetStorage(e)}
            />
          </div>
        </div>
        <div>
          <SectionHeader>
            Habits
          </SectionHeader>
          <div className='content'>
            <Habits 
              currentSlide={currentSlide}
              clickedButton={bigButtonClicked} 
              setBigButtonClicked={setBigButtonClicked}  
            />
          </div>
        </div>
      </Swiper>
      <AnimatedBigButton style={spring} onClick={() => handleClicked()}/>
    </div>
  )
}

export default withRouter(Home)