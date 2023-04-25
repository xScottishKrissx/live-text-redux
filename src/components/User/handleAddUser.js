import React from 'react'
import { auth } from '../../firebase'


export default function handleAddUser() {
    console.log(auth.currentUser)
  return (
    <div>handleAddUser</div>
  )
}
