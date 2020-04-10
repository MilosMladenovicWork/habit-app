import React, {useState, useEffect} from 'react'

import OutShadowContainer from './outshadowcontainer'
import Button from './button'
import InputField from './inputfield'
import Icons from './icons'
import TextArea from './textarea'

function TaskCreate({
  handleIcon,
  selectedIcon,
  taskTitle,
  handleChange,
  handleSubmit,
  setTasks,
  setClickedButton,
  clickedButton,
  taskDescription,
  handleDescription
}){

  const [message, setMessage] = useState('')

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

  useEffect(() => {
    if(!clickedButton){
      setMessage('')
    }
  }, [clickedButton])

  return(
    <>
    <Icons 
        handleIcon={(e) => handleIcon(e)}
        selectedIcon={selectedIcon}
      />
      <form action='#' metod='post'>
          <InputField type='text' name='title' value={taskTitle} placeholder='Title' onChange={(e) => handleChange(e)}/>
          <TextArea name='description' value={taskDescription} placeholder='Description' onChange={(e) => handleDescription(e)}/>
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
          <Button style={{background:'linear-gradient(#FF8F7D,#E86666)'}} className='button' onClick={(e) => {e.preventDefault();localStorage.removeItem('tasks');setTasks([]);setClickedButton(false)}}>
            Reset Tasks
          </Button>
      </form>
    </>
  )
}

export default TaskCreate