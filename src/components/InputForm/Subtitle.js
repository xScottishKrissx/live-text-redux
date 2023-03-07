import React from 'react'
import EditPostField from '../EditPost/editPostField'

export default function Subtitle({field, passNewFieldValue}) {
  return (
    <div className='author-input-form-subtitle' >
        <div className='author-input-field'>
            <h3>Subtitle</h3>
            <EditPostField field={field} passNewFieldValue={passNewFieldValue} />
        </div>
    </div>
  )
}
