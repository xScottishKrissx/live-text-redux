import React from 'react'
import './utility.css'
export default function KeyboardShortcuts({location}) {
  return (
    <div className='keyboard-shortcuts'>
        <h4>Tip</h4>
        <ul>

        {location === "column" ?    
            <li>Use <span className='defaultBtnStyle'>Enter</span> to add a {location} when ready</li>
        :null }

        {location === "post" ?    
            <li>Use <span className='defaultBtnStyle'>Ctrl</span> + <span className='defaultBtnStyle'>Enter</span> to add a {location} when ready</li>
        :null }
        
        </ul>
    </div>
  )
}
