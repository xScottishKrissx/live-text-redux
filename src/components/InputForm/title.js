import React from 'react'
import EditPostField from '../EditPost/editPostField'

export default function Title({field, passNewFieldValue}) {
  return (
    <div className='author-input-form-title'>
        <div className="author-input-field">
            <h3>Title</h3>
            <EditPostField field={field} passNewFieldValue={passNewFieldValue}  />
        </div>
    </div>
  )
}
