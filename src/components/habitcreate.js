import React, {useState, useEffect} from 'react'

import OutShadowContainer from './outshadowcontainer'
import Icons from './icons'
import Button from './button'
import InputField from './inputfield'
import TextArea from './textarea'

function HabitCreate({
  handleIcon,
  selectedIcon,
  habitTitle,
  handleChange,
  handleSubmit,
  setHabits,
  selectedHabit,
  deselectHabit,
  deleteHabit,
  setClickedButton,
  clickedButton,
  habitDescription,
  handleDescription
}){

  const [message, setMessage] = useState('')

  function titleExist(currentTitle){
    if(localStorage.getItem('habits')){
      return !!JSON.parse(localStorage.getItem('habits')).filter(habit => habit.title === currentTitle)[0]
    }
    return false
  }
  
  function validateFields(e){
    e.preventDefault()
    if(!habitTitle.trim()){
      return setMessage('Task title should not be blank!')
    }else if(titleExist(habitTitle)){
      return setMessage('Task with same title already exists!')
    }else if(!selectedIcon){
      return setMessage('Please select task icon!')
    }else{
      setMessage()
    }
    handleSubmit(e)
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
          <InputField type='text' name='title' placeholder='Title' value={habitTitle} onChange={(e) => handleChange(e)}/>
          <TextArea name='description' value={habitDescription} placeholder='Description' onChange={(e) => handleDescription(e)}/>
          {message &&
            <OutShadowContainer>
              {message}
            </OutShadowContainer>
          }
          <Button type='submit' className='button' onClick={(e) => validateFields(e)}>
            Create Habit
          </Button>
          <Button style={{background:'linear-gradient(#FF8F7D,#E86666)'}} type='submit' className='button' onClick={(e) => {e.preventDefault();localStorage.removeItem('habits');setHabits([]); setClickedButton(false)}}>
            Reset Habits
          </Button>
      </form>
    </>
  )
}

export default HabitCreate