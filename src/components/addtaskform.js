import React from 'react'
import {animated, useSpring} from 'react-spring'

import OutShadowContainer from './outshadowcontainer'
import Button from './button'
import InputField from './inputfield'
import Icons from './icons'

const AnimatedOutShadowContainer = animated(OutShadowContainer)

function AddTaskForm({
  handleIcon,
  selectedIcon,
  taskTitle,
  handleChange,
  handleSubmit,
  setTasks,
  selectedTask,
  deselectTask,
  deleteTask,
  clickedButton,
  currentSlide
}){

  const spring = useSpring({to:[
    {
      opacity:clickedButton && currentSlide === 0 ? 1 : 1
    },
    {
    transform:clickedButton && currentSlide === 0 ? 'translate(-50%, 0)' : 'translate(-200%, 0)'
    },
    {
      opacity:clickedButton && currentSlide === 0 ? 1 : 0
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
          <InputField type='text' name='title' value={taskTitle} placeholder='Title' onChange={(e) => handleChange(e)}/>
          <Button className='button' onClick={(e) => handleSubmit(e)}>
            Create Task
          </Button>
          <Button className='button' onClick={(e) => {e.preventDefault();localStorage.removeItem('tasks');setTasks([])}}>
            Reset Tasks
          </Button>
          {selectedTask &&
          <>
          <Button className='button' onClick={(e) => deselectTask(e)}>
            Deselect Task
          </Button>
          <Button className='button' onClick={(e) => deleteTask(e)}>
            Delete Task
          </Button>
          </>
        }
      </form>
    </AnimatedOutShadowContainer>
  ) 
}

export default AddTaskForm