import React, {useState, useEffect} from 'react'

import OutShadowContainer from './outshadowcontainer'
import Button from './button'
import InputField from './inputfield'
import Icons from './icons'
import TextArea from './textarea'

function HabitInfo({
  handleIcon,
  setSelectedIcon,
  selectedIcon,
  habitTitle,
  handleChange,
  setHabitTitle,
  setHabits,
  selectedHabit,
  deselectHabit,
  deleteHabit,
  setClickedButton,
  clickedButton,
  habitDescription,
  setHabitDescription,
  handleDescription
}){

  const [message, setMessage] = useState('')

  function titleExistMoreThanOneTimes(currentTitle){
    if(localStorage.getItem('habits')){
      let otherHabitsTitle = JSON.parse(localStorage.getItem('habits')).filter(habit => habit.title !== selectedHabit)
      return otherHabitsTitle.filter(habit => habit.title === currentTitle).length > 0
    }
    return false
  }
  
  function validateFields(e){
    e.preventDefault()
    if(!habitTitle.trim()){
      return setMessage('Habit title should not be blank!')
    }else if(titleExistMoreThanOneTimes(habitTitle)){
      return setMessage('Habit with same title already exists!')
    }else if(!selectedIcon){
      return setMessage('Please select habit icon!')
    }else{
      setMessage()
    }
    updateHabit(e)
  }

  function updateHabit(e){
    e.preventDefault()
    setHabits((prevState) => {
      
      let newArray = [
        ...prevState
      ]
      let index = newArray.findIndex(habit => habit.title === selectedHabit)
      newArray[index].title = habitTitle
      newArray[index].icon = selectedIcon
      newArray[index].description = habitDescription

      localStorage.setItem('habits', 
        JSON.stringify(
          newArray
        )
      )
      return newArray
    })
    setHabitTitle('')
    setHabitDescription('')
    setSelectedIcon()
    setClickedButton(false)
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
          <InputField type='text' name='title' value={habitTitle} placeholder='Title' onChange={(e) => handleChange(e)}/>
          <TextArea name='description' value={habitDescription} placeholder='Description' onChange={(e) => handleDescription(e)}/>
          {message &&
            <OutShadowContainer>
              {message}
            </OutShadowContainer>
          }
          <Button 
            className='button' 
            onClick={(e) => validateFields(e)}
          >
            Update Habit
          </Button>
          <Button className='button' onClick={(e) => deselectHabit(e)}>
            Deselect Habit
          </Button>
          <Button className='button' onClick={(e) => deleteHabit(e)}>
            Delete Habit
          </Button>
      </form>
    </>
  )
}

export default HabitInfo