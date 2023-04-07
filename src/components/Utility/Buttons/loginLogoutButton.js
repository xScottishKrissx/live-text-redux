import React from 'react'

export default function LoginLogoutButton() {
   let loggedIn = false
  return (
    <button className='defaultBtnStyle loginBtn'>{loggedIn ? "Logout" : "Login" }</button>
  )
}
