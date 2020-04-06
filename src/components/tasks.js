import React, {useState} from 'react'

import OutShadowContainer from './outshadowcontainer'
import testImg from '../images/logo.svg'
import testIcon from '../images/icon.svg'


const tasksArray = [
  {
    title:'Sample text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here.',
    icon:testIcon,
    completed:false
  }
]

function Tasks(){

  const [tasks, setTasks] = useState(tasksArray)

  function handleClick(e){
    let taskTitle = e.target.parentNode.childNodes[1].innerHTML
    let filteredTasks = tasks.filter(task => task.title !== taskTitle)
    let clickedTask = tasks.filter(task => task.title === taskTitle)
    clickedTask.completed = !clickedTask.completed
    setTasks([
      ...filteredTasks,
      ...clickedTask
    ])
  }

  return(
    <div>
      {tasks.map((task, index) => 
        <OutShadowContainer key={index} style={{marginBottom:'20px'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <img className='icon' src={task.icon} alt='icon' style={{height:'27px'}}/>
            <div className='title'>
              {task.title}
            </div>
            <img onClick={(e) => handleClick(e)} className='checkbox' src={task.completed ? null : testImg} alt='checkbox' style={{height:'27px'}}/>
          </div>
        </OutShadowContainer>)}
    </div>
  )
}

export default Tasks