import React, {useState, useEffect} from 'react'

import OutShadowContainer from './outshadowcontainer'
import Button from './button'
import InputField from './inputfield'
import Icons from './icons'

function TaskCreate({
  handleIcon,
  selectedIcon,
  taskTitle,
  handleChange,
  handleSubmit,
  setTasks,
  selectedTask,
  deselectTask,
  deleteTask,
  setClickedButton,
  clickedButton
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
    </>
  )
}

export default TaskCreate