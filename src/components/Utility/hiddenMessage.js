import React from 'react'
import './utility.css'
export default function HiddenMessage({hidden, thingThatsHidden}) {
  return (
    hidden ? <h2 className='defaultBtnStyle hiddenMessageStyle'>{thingThatsHidden} Hidden</h2> : null
  )
}
