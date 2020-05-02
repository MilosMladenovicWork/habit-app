import React, {useState} from 'react'
import {animated, useSpring} from 'react-spring'

import OutShadowContainer from './outshadowcontainer'
import TaskCreate from './taskcreate'
import TaskInfo from './taskinfo'

const AnimatedOutShadowContainer = animated(OutShadowContainer)

function AddTaskForm(props){
  let {clickedButton, currentSlide} = props

  const spring = useSpring({
    from:{
      transform: clickedButton && currentSlide === 0 ? 'translate(-50%, 0) scale(1)' : 'translate(-50%, 0) scale(0)'
    },
    to:{
    transform:clickedButton && currentSlide === 0 ? 'translate(-50%, 0) scale(1)' : 'translate(-50%, 0) scale(0)'
    },
  config:{tension:1000, mass:1, friction:40}
})

  return(
    <AnimatedOutShadowContainer 
      className='creation-popup'
      style={spring}
    >
      {props.selectedTask ? 
        <TaskInfo {...props}/> :
        <TaskCreate {...props}/>
      }
    </AnimatedOutShadowContainer>
  ) 
}

export default AddTaskForm