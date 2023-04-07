import React from 'react'

export default function ClearColumnsButton({clearColumns}) {
  return (
    <button className='defaultBtnStyle' id="clearColumnsBtn" onClick={clearColumns}>Delete All</button>
  )
}
