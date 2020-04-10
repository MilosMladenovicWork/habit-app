import React, {useState, useEffect} from 'react'
import {useSprings, animated} from 'react-spring'

import OutShadowContainer from './outshadowcontainer'
import CheckBox from './checkbox'
import AddTaskForm from './addtaskform'

const AnimatedOutShadowContainer = animated(OutShadowContainer)

function Tasks({currentSlide, clickedButton, setBigButtonClicked}){

  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [selectedIcon, setSelectedIcon] = useState()
  const [selectedTask, setSelectedTask] = useState()

  const springs = useSprings(tasks.length, tasks.map((task) => ({to:
    [
      {
        marginBottom:'25px',
        opacity:task.completed ? 0.5 : 1,
        transform:task.completed ? 'scale(0.85)' : 'scale(1)'
      }
    ],
  config:{tension:10000, mass:1, friction:150}
}
  )))

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
      newArray.sort((a, b) => {
        return + a.completed - ( + b.completed)
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

  function handleDescription(e){
    let inputValue = e.target.value
    setTaskDescription(() => {
      return inputValue
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    setTasks((prevState) => {
      let newArray = [
        {
          title:taskTitle.trim(),
          description:taskDescription && taskDescription.trim(),
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
    setTaskDescription('')
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
    setTaskTitle(e.currentTarget.childNodes[0].childNodes[1].innerHTML)
    setTaskDescription(JSON.parse(localStorage.getItem('tasks')).filter(task => task.title === e.currentTarget.childNodes[0].childNodes[1].innerHTML)[0].description)
    setSelectedIcon(e.currentTarget.childNodes[0].childNodes[0].getAttribute('src'))
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

  useEffect(() => {
    if(!clickedButton){
      setSelectedIcon()
      setSelectedTask()
      setTaskTitle('')
      setTaskDescription('')
    }
  }, [clickedButton])

  return(
    <div>
      {
        springs.map((props, index) => 
          <AnimatedOutShadowContainer 
          onClick={(e) => handleSelectTask(e)}
          key={index} 
          className={selectedTask === tasks[index].title ? 'in-shadow-container' : null}
          style={props}
          >
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <img className='icon' src={tasks[index].icon} alt='icon' style={{height:'27px'}}/>
            <div className='title'>
              {tasks[index].title}
            </div>
            <div className='checkbox' onClick={(e) => handleClick(e)} alt='checkbox'>
              <CheckBox completed={tasks[index].completed}/>
            </div>
          </div>
        </AnimatedOutShadowContainer>
        )}
        <AddTaskForm
          handleIcon={(e) => handleIcon(e)}
          selectedIcon={selectedIcon}
          setSelectedIcon={e => setSelectedIcon(e)}
          taskTitle={taskTitle}
          setTaskTitle={e => setTaskTitle(e)}
          handleChange={e => handleChange(e)}
          taskDescription={taskDescription}
          setTaskDescription={e => setTaskDescription(e)}
          handleDescription={e => handleDescription(e)}
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