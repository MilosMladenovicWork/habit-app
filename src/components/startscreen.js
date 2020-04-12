import React, {useState, useEffect} from 'react'
import 'swiper/css/swiper.css'

import OutShadowContainer from './outshadowcontainer'
import Button from './button'
import MotivationalImages from './motivationalimages'
import './startscreen.css'

function StartScreen({onClick, currentSlide}){
  const [completedTasks, setCompletedTasks] = useState(0)

  useEffect(() => {
    if(currentSlide === 1){
      JSON.parse(localStorage.getItem('tasks')) && setCompletedTasks(JSON.parse(localStorage.getItem('tasks')).filter(task => task.completed).length)
    }
  }, [currentSlide])

  return (
    <>
      <OutShadowContainer>
        <MotivationalImages/>
      </OutShadowContainer>
      <OutShadowContainer style={{
            display:completedTasks >= 0 ? 'block': 'none'
            }}>
          <OutShadowContainer style={{
            marginBottom:'25px',
            display:'flex',
            flexWrap:'wrap',
            justifyContent:'space-between'
        }}>
          <p className='information-name'>Completed tasks:</p>
          <p>{completedTasks}</p>
          </OutShadowContainer>
      </OutShadowContainer>
      <Button type='submit' className='button' onClick={e => onClick(e)}>
        Reset Storage
      </Button>
    </>
  )
}

export default StartScreen