import React from 'react'
import EditType from '../EditPost/editType'

export default function Type({ setPostType}) {
    const typeRange = ["Goal","Offside", "Yellow Card", "Red Card", "Breaking","Update"]
  return (
    <div className="author-input-form-type-select">
        <div className='author-input-form-type-select-items'>
            <EditType typeRange={typeRange} setPostType={setPostType} />
        </div>
    </div>
  )
}
