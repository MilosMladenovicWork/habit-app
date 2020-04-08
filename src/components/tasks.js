import React, {useState, useEffect} from 'react'

import OutShadowContainer from './outshadowcontainer'
import CheckBox from './checkbox'
import AddTaskForm from './addtaskform'

function Tasks({currentSlide, clickedButton, setBigButtonClicked}){

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
          title:taskTitle.trim(),
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
    setBigButtonClicked(false)
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
    setBigButtonClicked(true)
  }

  function deselectTask(e){
    e.preventDefault()
    setSelectedTask()
    setBigButtonClicked(false)
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
    setSelectedTask()
    setBigButtonClicked(false)
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
        <AddTaskForm
          handleIcon={(e) => handleIcon(e)}
          selectedIcon={selectedIcon}
          taskTitle={taskTitle}
          handleChange={e => handleChange(e)}
          handleSubmit={e => handleSubmit(e)}
          setTasks={e => setTasks(e)}
          selectedTask={selectedTask}
          deselectTask={e => deselectTask(e)}
          deleteTask={e => deleteTask(e)}
          clickedButton={clickedButton}
          setClickedButton={e => setBigButtonClicked(e)}
          currentSlide={currentSlide}
        />
    </div>
  )
}

export default Tasks