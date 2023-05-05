import React from 'react'
import EditPostField from '../EditPost/editPostField'

export default function Title({field, passNewFieldValue, handleClick, needButton, allowPost, hideLabel}) {

  return (
    <div className='author-input-form-title'>
        <div className="author-input-field ">
            <div className='defaultBtnStyle'> 
              {/* {hideLabel ? null : <span>Title </span>} */}
              <span>Title </span>
              <EditPostField  
                needButton={needButton} 
                allowPost={allowPost} 
                field={field} 
                passNewFieldValue={passNewFieldValue}  
                createNewColumn={handleClick}
                hideLabel={hideLabel}
               />
            </div>
        </div>
    </div>
  )
}
