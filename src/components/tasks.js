import React, {useState} from 'react'

import OutShadowContainer from './outshadowcontainer'
import CheckBox from './checkbox'
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
    title:'Sample text here. Sample text here. aaaaa',
    icon:testIcon,
    completed:false
  }
]

function Tasks(){

  const [tasks, setTasks] = useState(tasksArray)

  function handleClick(e){
    let taskTitle = e.target.parentNode.parentNode.childNodes[1].innerHTML
    setTasks((prevState) => {
      let newArray = [...prevState]
      newArray.forEach(task => {
        if(task.title === taskTitle){
          task.completed = !task.completed 
        }
      })
      return newArray
    })
  }

  return(
    <div>
      {tasks.map((task, index) => 
        <OutShadowContainer key={index} style={{marginBottom:'20px', transform:task.completed ? 'scale(0.85)' : 'scale(1)', opacity:task.completed ? '0.6': '1'}}>
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
    </div>
  )
}

export default Tasks