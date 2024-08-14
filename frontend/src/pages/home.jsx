import React from 'react'

const home = () => {
    if(!localStorage.getItem('auth')) {
        return location.assign('/auth')
    }
  return (
    <div>home</div>
  )
}

export default home