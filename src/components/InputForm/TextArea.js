import React from 'react'
import EditTextArea from '../EditPost/editTextArea'

export default function TextArea({field, passNewFieldValue, setPostImageName}) {
  return (
    <div className="author-input-form-text-area">
        <div className='author-input-text-editor'>
           
              <EditTextArea field={field} passNewFieldValue={passNewFieldValue} setPostImageName={setPostImageName}/>
            
        </div>
    </div>
  )
}
