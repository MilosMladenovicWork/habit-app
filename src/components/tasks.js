import React, {useState, useEffect} from 'react'

import OutShadowContainer from './outshadowcontainer'
import CheckBox from './checkbox'
import Button from './button'
import InputField from './inputfield'
import testImg from '../images/logo.svg'
import testIcon from '../images/icon.svg'


function Tasks(){

  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState()

  function handleClick(e){
    let taskTitle = e.target.parentNode.parentNode.childNodes[1].innerHTML
    setTasks((prevState) => {
      let newArray = [...prevState]
      newArray.forEach(task => {
        if(task.title === taskTitle){
          task.completed = !task.completed 
        }
      })
      localStorage.setItem('tasks', JSON.stringify(newArray))
      return newArray
    })
  }

  function handleChange(e){
    let inputValue = e.target.value
    setTaskTitle(() => {
      return inputValue
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    setTasks((prevState) => {
      let newArray = [
        {
          title:taskTitle,
          icon:testIcon,
          completed:false
        },
        ...prevState
      ]

      localStorage.setItem('tasks', 
        JSON.stringify(
          newArray
        )
      )
      return newArray
    })
  }

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('tasks'))){
      setTasks(
        JSON.parse(localStorage.getItem('tasks'))
      )
    }
  }, [])


  return(
    <div>
      {tasks.map((task, index) => 
        <OutShadowContainer 
          key={index} 
          style={{
            marginBottom:'20px', 
            transform:task.completed ? 'scale(0.85)' : 'scale(1)', 
            opacity:task.completed ? '0.6': '1'
            }}
          >
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <img className='icon' src={task.icon} alt='icon' style={{height:'27px'}}/>
            <div className='title'>
              {task.title}
            </div>
            <div className='checkbox' onClick={(e) => handleClick(e)} alt='checkbox'>
              <CheckBox completed={task.completed}/>
            </div>
          </div>
        </OutShadowContainer>)}
        <form action='#' metod='post'>
            <InputField type='text' name='title' placeholder='Title' onChange={(e) => handleChange(e)}/>
            <Button type='submit' className='button' onClick={(e) => handleSubmit(e)}>
              Create Task
            </Button>
            <Button type='submit' className='button' onClick={(e) => {e.preventDefault();localStorage.removeItem('tasks');setTasks([])}}>
              Reset Tasks
            </Button>
        </form>
    </div>
  )
}

export default Tasks