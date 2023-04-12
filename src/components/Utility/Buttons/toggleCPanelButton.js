import React from 'react'

export default function ToggleCPanelButton({toggleCPanel}) {
  return (
    <>
      <button className='defaultBtnStyle toggleCPanelBtn'  onClick={toggleCPanel}>Toggle CPanel</button>
    </>
  )
}
