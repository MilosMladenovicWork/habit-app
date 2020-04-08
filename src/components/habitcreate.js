import React, {useState, useEffect} from 'react'

import OutShadowContainer from './outshadowcontainer'
import Icons from './icons'
import Button from './button'
import InputField from './inputfield'

function HabitCreate({
  handleIcon,
  setSelectedIcon,
  selectedIcon,
  habitTitle,
  handleChange,
  handleSubmit,
  setHabitTitle,
  setHabits,
  selectedHabit,
  deselectHabit,
  deleteHabit,
  setClickedButton,
  clickedButton
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
          {message &&
            <OutShadowContainer>
              {message}
            </OutShadowContainer>
          }
          <Button type='submit' className='button' onClick={(e) => validateFields(e)}>
            Create Habit
          </Button>
          <Button type='submit' className='button' onClick={(e) => {e.preventDefault();localStorage.removeItem('habits');setHabits([]); setClickedButton(false)}}>
            Reset Habits
          </Button>
          {selectedHabit &&
          <>
          <Button className='button' onClick={(e) => deselectHabit(e)}>
            Deselect Habit
          </Button>
          <Button className='button' onClick={(e) => deleteHabit(e)}>
            Delete Habit
          </Button>
          </>
        }
      </form>
    </>
  )
}

export default HabitCreate