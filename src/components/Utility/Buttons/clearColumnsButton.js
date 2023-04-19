import React, {useState} from 'react'

export default function ClearColumnsButton({clearColumns}) {
  const [clearAllBtn, setClearAllBtnVis] = useState(false)

  const showClearAllBtn = () => setClearAllBtnVis(!clearAllBtn) 
  return (
    <>
      
      {clearAllBtn ? 
        <>
          <button className='defaultBtnStyle warningBtn' onClick={clearColumns}>Confirm</button>  
          <button className='defaultBtnStyle' onClick={showClearAllBtn}>Cancel</button>  
        </>
      :
        <button className='defaultBtnStyle' onClick={showClearAllBtn}>Delete All</button>
      }
    </>
  )
}
