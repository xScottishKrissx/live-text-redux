import React from 'react'
import EditPostField from '../EditPost/editPostField'

export default function Subtitle({field, passNewFieldValue}) {
  return (
    <div className='author-input-form-subtitle' >
        <div className='author-input-field'>
          <div className='defaultBtnStyle'>
            <span>Subtitle</span>
            <EditPostField field={field} passNewFieldValue={passNewFieldValue} />
          </div>
        </div>
    </div>
  )
}
