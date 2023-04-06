import React from 'react'
import EditPostField from '../EditPost/editPostField'

export default function Title({field, passNewFieldValue, handleClick, needButton, allowPost}) {
  return (
    <div className='author-input-form-title'>
        <div className="author-input-field">
            <h3>Title</h3>
            <EditPostField needButton={needButton} allowPost={allowPost} field={field} passNewFieldValue={passNewFieldValue}  createNewColumn={handleClick}  />
        </div>
    </div>
  )
}
