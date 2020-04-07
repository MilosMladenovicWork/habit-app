import React, {useState, useEffect} from 'react'

import OutShadowContainer from './outshadowcontainer'
import CheckBox from './checkbox'
import InputField from './inputfield'
import Button from './button'
import testImg from '../images/logo.svg'
import testIcon from '../images/icon.svg'
import card from '../images/card.svg'
import mail from '../images/mail.svg'

const icons = [
  card,
  mail
]

function Habits(){

  const [habits, setHabits] = useState([])
  const [habitTitle, setHabitTitle] = useState('')
  const [selectedIcon, setSelectedIcon] = useState()

  function handleClick(e){
    let habitTitle = e.target.parentNode.parentNode.childNodes[1].innerHTML
    setHabits((prevState) => {
      let newArray = [...prevState]
      newArray.forEach(habit => {
        if(habit.title === habitTitle){
          habit.completed = !habit.completed 
        }
      })
      localStorage.setItem('habits', JSON.stringify(newArray))
      return newArray
    })
    setSelectedIcon()
  }

  function handleChange(e){
    let inputValue = e.target.value
    setHabitTitle(() => {
      return inputValue
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    setHabits((prevState) => {
      let newArray = [
        {
          title:habitTitle,
          icon:selectedIcon,
          completed:false
        },
        ...prevState
      ]

      localStorage.setItem('habits', 
        JSON.stringify(
          newArray
        )  
      )
      return newArray
    })
    setHabitTitle('')
  }

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('habits'))){
      setHabits(
        JSON.parse(localStorage.getItem('habits'))
      )
    }
  }, [])

  function handleIcon(e){
    e.preventDefault()
    setSelectedIcon(e.currentTarget.childNodes[0].childNodes[0].getAttribute('src'))
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
        <div style={{display:'flex'}}>
          {
            icons.map((icon, index) =>
              <div style={{width:'fit-content'}} onClick={(e) => handleIcon(e)}>
                <OutShadowContainer className={selectedIcon === icon ? 'in-shadow-container' : 'null'} key={index}>
                  <img src={icon} style={{width:'27px'}}/>
                </OutShadowContainer>
              </div>
            ) 
          }
        </div>
        <form action='#' metod='post'>
            <InputField type='text' name='title' placeholder='Title' value={habitTitle} onChange={(e) => handleChange(e)}/>
            <Button type='submit' className='button' onClick={(e) => handleSubmit(e)}>
              Create Habit
            </Button>
            <Button type='submit' className='button' onClick={(e) => {e.preventDefault();localStorage.removeItem('habits');setHabits([])}}>
              Reset Habits
            </Button>
        </form>
    </div>
  )
}

export default Habits