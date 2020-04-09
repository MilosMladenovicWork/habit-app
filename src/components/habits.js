import React, {useState, useEffect} from 'react'

import OutShadowContainer from './outshadowcontainer'
import CheckBox from './checkbox'
import AddHabitForm from './addhabitform'

function Habits({currentSlide, clickedButton, setBigButtonClicked}){

  const [habits, setHabits] = useState([])
  const [habitTitle, setHabitTitle] = useState('')
  const [habitDescription, setHabitDescription] = useState('')
  const [selectedIcon, setSelectedIcon] = useState()
  const [selectedHabit, setSelectedHabit] = useState()

  function handleClick(e){
    e.stopPropagation()
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
  }

  function handleChange(e){
    let inputValue = e.target.value
    setHabitTitle(() => {
      return inputValue
    })
  }

  function handleDescription(e){
    let inputValue = e.target.value
    setHabitDescription(() => {
      return inputValue
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    setHabits((prevState) => {
      let newArray = [
        {
          title:habitTitle.trim(),
          description:habitDescription && habitDescription.trim(),
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
    setHabitDescription('')
    setSelectedIcon()
    setBigButtonClicked(false)
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

  function handleSelectHabit(e){
    e.preventDefault()
    setSelectedHabit(e.currentTarget.childNodes[0].childNodes[1].innerHTML)
    setHabitTitle(e.currentTarget.childNodes[0].childNodes[1].innerHTML)
    setHabitDescription(JSON.parse(localStorage.getItem('habits')).filter(habit => habit.title === e.currentTarget.childNodes[0].childNodes[1].innerHTML)[0].description)
    setSelectedIcon(e.currentTarget.childNodes[0].childNodes[0].getAttribute('src'))
    setBigButtonClicked(true)
  }

  function deselectHabit(e){
    e.preventDefault()
    setSelectedHabit()
    setBigButtonClicked(false)
  }

  function deleteHabit(e){
    e.preventDefault()
    setHabits((prevState) => {
      let newArray = [...prevState]
      newArray = newArray.filter(habit => {
        return habit.title !== selectedHabit
      })

      localStorage.setItem('habits', 
        JSON.stringify(
          newArray
        )
      )
      return newArray
    })
    setSelectedHabit()
    setBigButtonClicked(false)
  }

  useEffect(() => {
    if(!clickedButton){
      setSelectedIcon()
      setSelectedHabit()
      setHabitTitle('')
      setHabitDescription('')
    }
  }, [clickedButton])

  return(
    <div>
      {habits.map((habit, index) => 
        <OutShadowContainer 
          onClick={(e) => handleSelectHabit(e)} 
          key={index} 
          className={selectedHabit === habit.title ? 'in-shadow-container' : null}
          style={{
            marginBottom:'20px',
            transform:habit.completed ? 'scale(0.85)' : 'scale(1)', 
            opacity:habit.completed ? '0.6': '1'
            }}
          >
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
        <AddHabitForm
          handleIcon={(e) => handleIcon(e)}
          selectedIcon={selectedIcon}
          setSelectedIcon={e => setSelectedIcon(e)}
          habitTitle={habitTitle}
          setHabitTitle={e => setHabitTitle(e)}
          handleChange={e => handleChange(e)}
          habitDescription={habitDescription}
          setHabitDescription={e => setHabitDescription(e)}
          handleDescription={e => handleDescription(e)}
          handleSubmit={e => handleSubmit(e)}
          setHabits={e => setHabits(e)}
          selectedHabit={selectedHabit}
          deselectHabit={e => deselectHabit(e)}
          deleteHabit={e => deleteHabit(e)}
          clickedButton={clickedButton}
          setClickedButton={e => setBigButtonClicked(e)}
          currentSlide={currentSlide}
        />
    </div>
  )
}

export default Habits