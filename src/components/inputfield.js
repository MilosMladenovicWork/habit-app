import React from 'react'

import './inputfield.css'

function InputField({type, name, value, placeholder, onChange}){
  return(
    <input type={type} name={name} placeholder={placeholder} className='input-field' onChange={e => onChange(e)}/>
  )
}

export default InputField