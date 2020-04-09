import React from 'react'

import './textarea.css'

function TextArea({
  name,
  value,
  placeholder,
  onChange
}){
  return(
    <textarea name={name} value={value} placeholder={placeholder} className='textarea' onChange={e => onChange(e)}></textarea>
  )
}

export default TextArea