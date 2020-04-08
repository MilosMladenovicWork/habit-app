import React, {useState} from 'react'
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
  setClickedButton,
  currentSlide
}){

  const [message, setMessage] = useState('')

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

function titleExist(currentTitle){
  if(localStorage.getItem('tasks')){
    return !!JSON.parse(localStorage.getItem('tasks')).filter(task => task.title === currentTitle)[0]
  }
  return false
}

function validateFields(e){
  e.preventDefault()
  if(!taskTitle.trim()){
    return setMessage('Task title should not be blank!')
  }else if(titleExist(taskTitle)){
    return setMessage('Task with same title already exists!')
  }else if(!selectedIcon){
    return setMessage('Please select task icon!')
  }else{
    setMessage()
  }
  handleSubmit(e)
}

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
          {message &&
            <OutShadowContainer>
              {message}
            </OutShadowContainer>
          }
          <Button 
            className='button' 
            onClick={(e) => validateFields(e)}
          >
            Create Task
          </Button>
          <Button className='button' onClick={(e) => {e.preventDefault();localStorage.removeItem('tasks');setTasks([]);setClickedButton(false)}}>
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