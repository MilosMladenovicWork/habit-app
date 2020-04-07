import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import Home from './home'

function ProtectedRoute(){

  return(
    <Route path='/home' render={
      () => localStorage.getItem('username') ? <Home /> : <Redirect to='/'/>
    } 
    />
  )
}

export default ProtectedRoute