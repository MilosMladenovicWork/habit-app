import React from 'react'
import {animated, useSpring} from 'react-spring'

import OutShadowContainer from './outshadowcontainer'
import HabitCreate from './habitcreate'
import HabitInfo from './habitinfo'

import './creationpopup.css'

const AnimatedOutShadowContainer = animated(OutShadowContainer)

function AddTaskForm(props){
  let {clickedButton, currentSlide} = props

  const spring = useSpring({
    from:{
      transform: clickedButton && currentSlide === 2 ? 'translate(-50%, 0) scale(0)' : 'translate(-50%, 0) scale(1)'
    },
    to:{
      transform:clickedButton && currentSlide === 2 ? 'translate(-50%, 0) scale(1)' : 'translate(-50%, 0) scale(0)'
    },
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