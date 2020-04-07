import React from 'react'
import {animated, useSpring} from 'react-spring'

import OutShadowContainer from './outshadowcontainer'
import Icons from './icons'
import Button from './button'
import InputField from './inputfield'

import './creationpopup.css'

const AnimatedOutShadowContainer = animated(OutShadowContainer)

function AddTaskForm({ 
  handleIcon,
  selectedIcon,
  habitTitle,
  handleChange,
  handleSubmit,
  setHabits,
  selectedHabit,
  deselectHabit,
  deleteHabit,
  clickedButton,
  currentSlide
}){

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
      <Icons 
        handleIcon={(e) => handleIcon(e)}
        selectedIcon={selectedIcon}
      />
      <form action='#' metod='post'>
          <InputField type='text' name='title' placeholder='Title' value={habitTitle} onChange={(e) => handleChange(e)}/>
          <Button type='submit' className='button' onClick={(e) => handleSubmit(e)}>
            Create Habit
          </Button>
          <Button type='submit' className='button' onClick={(e) => {e.preventDefault();localStorage.removeItem('habits');setHabits([])}}>
            Reset Habits
          </Button>
          {selectedHabit &&
          <>
          <Button className='button' onClick={(e) => deselectHabit(e)}>
            Deselect Habit
          </Button>
          <Button className='button' onClick={(e) => deleteHabit(e)}>
            Delete Habit
          </Button>
          </>
        }
      </form>
    </AnimatedOutShadowContainer>
  ) 
}

export default AddTaskForm