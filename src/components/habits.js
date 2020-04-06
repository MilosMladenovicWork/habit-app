import React, {useState} from 'react'

import OutShadowContainer from './outshadowcontainer'
import testImg from '../images/logo.svg'
import testIcon from '../images/icon.svg'

const habitsArray = [
  {
    title:'Sample text here. Sample text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here. aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa a',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here.',
    icon:testIcon,
    completed:false
  },
  {
    title:'Sample text here. Sample text here.',
    icon:testIcon,
    completed:false
  }
]

function Habits(){

  const [habits, setHabits] = useState(habitsArray)

  return(
    <div>
      {habits.map((habit, index) => 
        <OutShadowContainer key={index} style={{marginBottom:'20px'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <img className='icon' src={habit.icon} alt='icon' style={{height:'27px'}}/>
            <div className='title'>
              {habit.title}
            </div>
            <img className='checkbox' src={habit.completed ? null : testImg} alt='checkbox' style={{height:'27px'}}/>
          </div>
        </OutShadowContainer>)}
    </div>
  )
}

export default Habits