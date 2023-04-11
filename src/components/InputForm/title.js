import React from 'react'
import EditPostField from '../EditPost/editPostField'

export default function Title({field, passNewFieldValue, handleClick, needButton, allowPost}) {
  return (
    <div className='author-input-form-title'>
        <div className="author-input-field ">
            <div className='defaultBtnStyle'> 
              <span>Title </span>
              <EditPostField  
                needButton={needButton} 
                allowPost={allowPost} 
                field={field} 
                passNewFieldValue={passNewFieldValue}  
                createNewColumn={handleClick}
               />
            </div>
        </div>
    </div>
  )
}
