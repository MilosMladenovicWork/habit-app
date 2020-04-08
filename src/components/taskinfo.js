import React, {useState, useEffect} from 'react'

import OutShadowContainer from './outshadowcontainer'
import Button from './button'
import InputField from './inputfield'
import Icons from './icons'

function TaskInfo({
  handleIcon,
  setSelectedIcon,
  selectedIcon,
  taskTitle,
  handleChange,
  setTaskTitle,
  setTasks,
  selectedTask,
  deselectTask,
  deleteTask,
  setClickedButton,
  clickedButton
}){

  const [message, setMessage] = useState('')

  function titleExistMoreThanOneTimes(currentTitle){
    if(localStorage.getItem('tasks')){
      let otherTasksTitle = JSON.parse(localStorage.getItem('tasks')).filter(task => task.title !== selectedTask)
      return otherTasksTitle.filter(task => task.title === currentTitle).length > 0
    }
    return false
  }
  
  function validateFields(e){
    e.preventDefault()
    if(!taskTitle.trim()){
      return setMessage('Task title should not be blank!')
    }else if(titleExistMoreThanOneTimes(taskTitle)){
      return setMessage('Task with same title already exists!')
    }else if(!selectedIcon){
      return setMessage('Please select task icon!')
    }else{
      setMessage()
    }
    updateTask(e)
  }

  function updateTask(e){
    e.preventDefault()
    setTasks((prevState) => {
      
      let newArray = [
        ...prevState
      ]
      let index = newArray.findIndex(task => task.title === selectedTask)
      newArray[index].title = taskTitle
      newArray[index].icon = selectedIcon

      localStorage.setItem('tasks', 
        JSON.stringify(
          newArray
        )
      )
      return newArray
    })
    setTaskTitle('')
    setSelectedIcon()
    setClickedButton(false)
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
            Update Task
          </Button>
          <>
          <Button className='button' onClick={(e) => deselectTask(e)}>
            Deselect Task
          </Button>
          <Button className='button' onClick={(e) => deleteTask(e)}>
            Delete Task
          </Button>
          </>
      </form>
    </>
  )
}

export default TaskInfo