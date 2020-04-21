import React, {useState, useEffect} from 'react'

import live from '../images/motivational/live.jpg'
import stones from '../images/motivational/stones.jpg'
import give from '../images/motivational/give.jpg'
import dream from '../images/motivational/dream.jpg'

const images = [
  give,
  dream,
  live,
  stones
]

function MotivationalImages(){
  const [image, setImage] = useState()

  useEffect(() => {
    setImage(images[Math.floor(Math.random() * images.length)])
  }, [])

  return(
    <img
    style={{borderRadius:'10px', objectFit:'cover', width:'100%'}}
    src={image} alt='Welcome' className='introduction-image'/>
  )
}

export default MotivationalImages