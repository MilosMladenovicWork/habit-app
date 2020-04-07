import React, {useState, useEffect} from 'react'

import OutShadowContainer from './outshadowcontainer'
import CheckBox from './checkbox'
import Button from './button'
import InputField from './inputfield'
import BigButton from './bigbutton'
import testImg from '../images/logo.svg'
import house from '../images/icon.svg'
import card from '../images/card.svg'
import mail from '../images/mail.svg'

const icons = [
  card,
  mail
]


function Tasks(){

  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [selectedIcon, setSelectedIcon] = useState()
  const [selectedTask, setSelectedTask] = useState()

  function handleClick(e){
    e.stopPropagation()
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
          icon:selectedIcon,
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
    setTaskTitle('')
    setSelectedIcon()
  }

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('tasks'))){
      setTasks(
        JSON.parse(localStorage.getItem('tasks'))
      )
    }
  }, [])

  function handleIcon(e){
    e.preventDefault()
    setSelectedIcon(e.currentTarget.childNodes[0].childNodes[0].getAttribute('src'))
  }

  function handleSelectTask(e){
    e.preventDefault()
    setSelectedTask(e.currentTarget.childNodes[0].childNodes[1].innerHTML)
  }

  function deselectTask(e){
    e.preventDefault()
    setSelectedTask()
  }

  function deleteTask(e){
    e.preventDefault()
    setTasks((prevState) => {
      let newArray = [...prevState]
      newArray = newArray.filter(task => {
        return task.title !== selectedTask
      })

      localStorage.setItem('tasks', 
        JSON.stringify(
          newArray
        )
      )
      return newArray
    })
  }

  return(
    <div>
      {tasks.map((task, index) => 
        <OutShadowContainer 
          onClick={(e) => handleSelectTask(e)}
          key={index} 
          className={selectedTask === task.title ? 'in-shadow-container' : null}
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
        <div style={{display:'flex'}}>
          {
            icons.map((icon, index) =>
              <div style={{width:'fit-content'}} onClick={(e) => handleIcon(e)}>
                <OutShadowContainer className={selectedIcon === icon ? 'in-shadow-container' : null} key={index}>
                  <img src={icon} style={{width:'27px'}}/>
                </OutShadowContainer>
              </div>
            ) 
          }
        </div>
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
    </div>
  )
}

export default Tasks