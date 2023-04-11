import React from 'react'

export default function ToggleCPanelButton({toggleCPanel}) {
  return (
    <div style={{padding:"5px"}}>
      <button className='defaultBtnStyle toggleCPanelBtn'  onClick={toggleCPanel}>Toggle CPanel</button>
    </div>
  )
}
