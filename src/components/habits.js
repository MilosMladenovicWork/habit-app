import React, {useState} from 'react'

import OutShadowContainer from './outshadowcontainer'
import CheckBox from './checkbox'
import testImg from '../images/logo.svg'
import testIcon from '../images/icon.svg'

const habitsArray = [
  {
    title:'Sample text here. Sample text her',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text heaaaaaaaaaaaaa aaaaaaaaaaaaa a',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. ',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample tet here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Samt here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample tt here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sple text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Samle text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. ample text here.',
    icon:testIcon,
    completed:false
  }
]

function Habits(){

  const [habits, setHabits] = useState(habitsArray)

  function handleClick(e){
    let habitTitle = e.target.parentNode.parentNode.childNodes[1].innerHTML
    setHabits((prevState) => {
      let newArray = [...prevState]
      newArray.forEach(habit => {
        if(habit.title === habitTitle){
          habit.completed = !habit.completed 
        }
      })
      return newArray
    })
  }

  return(
    <div>
      {habits.map((habit, index) => 
        <OutShadowContainer key={index} style={{marginBottom:'20px', transform:habit.completed ? 'scale(0.85)' : 'scale(1)', opacity:habit.completed ? '0.6': '1'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <img className='icon' src={habit.icon} alt='icon' style={{height:'27px'}}/>
            <div className='title'>
              {habit.title}
            </div>
            <div className='checkbox' onClick={(e) => handleClick(e)} alt='checkbox' style={{height:'27px'}}>
              <CheckBox completed={habit.completed}/>
            </div>
          </div>
        </OutShadowContainer>)}
    </div>
  )
}

export default Habits