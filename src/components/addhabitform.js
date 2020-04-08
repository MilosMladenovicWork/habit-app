import React, {useState} from 'react'
import {animated, useSpring} from 'react-spring'

import OutShadowContainer from './outshadowcontainer'
import HabitCreate from './habitcreate'
import HabitInfo from './habitinfo'

import './creationpopup.css'

const AnimatedOutShadowContainer = animated(OutShadowContainer)

function AddTaskForm(props){
  let {clickedButton, currentSlide} = props

  const spring = useSpring({to:[
    {
      opacity:clickedButton && currentSlide === 2 ? 1 : 1
    },
    {
      transform:clickedButton && currentSlide === 2 ? 'translate(-50%, 0)' : 'translate(100%, 0)'
    },
    {
      opacity:clickedButton && currentSlide === 2 ? 1 : 0
    }
  ],
  config:{tension:1000, mass:1, friction:40}
  })

  return(
    <AnimatedOutShadowContainer
      className='creation-popup'
      style={spring}
    >
      {props.selectedHabit ? 
        <HabitInfo {...props}/> :
        <HabitCreate {...props}/>
      }
    </AnimatedOutShadowContainer>
  ) 
}

export default AddTaskForm