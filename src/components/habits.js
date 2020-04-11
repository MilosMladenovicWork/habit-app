import React, {useState, useEffect} from 'react'
import {useSprings, animated} from 'react-spring'

import OutShadowContainer from './outshadowcontainer'
import CheckBox from './checkbox'
import AddHabitForm from './addhabitform'

const AnimatedOutShadowContainer = animated(OutShadowContainer)

function Habits({currentSlide, clickedButton, setBigButtonClicked}){



  const [habits, setHabits] = useState([])
  const [habitTitle, setHabitTitle] = useState('')
  const [habitDescription, setHabitDescription] = useState('')
  const [selectedIcon, setSelectedIcon] = useState()
  const [selectedHabit, setSelectedHabit] = useState()
  const [date, setDate] = useState()

  function filterHabits(habit){
    return habit.completed.filter(date => {
      return date.date === `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`
    }) 
  }

  const springs = useSprings(habits.length, habits.map((habit) => ({to:{
    marginBottom:'25px',
    opacity:filterHabits(habit)[0] && filterHabits(habit)[0].date === date && filterHabits(habit)[0].completed === true ? 0.5 : 1,
    transform:filterHabits(habit)[0] && filterHabits(habit)[0].date === date && filterHabits(habit)[0].completed === true ? 'scale(0.85)' : 'scale(1)'
  },
  config:{tension:10000, mass:1, friction:150}
}
  )))

  function handleClick(e){
    e.stopPropagation()
    let habitTitle = e.target.parentNode.parentNode.childNodes[1].innerHTML
    setHabits((prevState) => {
      let newArray = [...prevState]
      newArray.forEach(habit => {
        if(habit.title === habitTitle){
          let dateCompleted = habit.completed.filter(date => {
            return date.date === `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`
          }) 

          if(!dateCompleted){
            habit.completed.unshift({
              date:date,
              completed:false
            })
          }
          habit.completed.forEach(dateEntry => {
            if(dateEntry.date === date){
              return dateEntry.completed = !dateEntry.completed
            }
          })
          
        }
      })
      localStorage.setItem('habits', JSON.stringify(newArray))
      return newArray
    })
  }

  useEffect(() => {
    setHabits((prevState) => {
      let newArray = [...prevState]
      newArray.forEach(habit => {
      habit.completed.sort((a, b) => new Date(a.date) - new Date(b.date))
      })
      return prevState
    })
  }, [habits])

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
          completed:[
            {
              date:date,
              completed:false
            }
          ],
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

  useEffect(() => {
    let d = new Date()
    setDate(`${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`)
  }, [])

  return(
    <div>
      {
      springs.map((props, index) => 
        <AnimatedOutShadowContainer 
          onClick={(e) => handleSelectHabit(e)} 
          key={index} 
          className={selectedHabit === habits[index].title ? 'in-shadow-container' : null}
          style={props}
          >
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <img className='icon' src={habits[index].icon} alt='icon' style={{height:'27px'}}/>
            <div className='title'>
              {habits[index].title}
            </div>
            <div className='checkbox' onClick={(e) => handleClick(e)} alt='checkbox' style={{height:'27px'}}>
              <CheckBox completed={filterHabits(habits[index])[0] && filterHabits(habits[index])[0].date === date && filterHabits(habits[index])[0].completed === true}/>
            </div>
          </div>
        </AnimatedOutShadowContainer>)}
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
          habits={habits}
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