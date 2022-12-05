import React from 'react'
import GenerateTags from './generate-tags'
import './tags.css'

export default function TagsView({addTag}) {
  return (

        <div className='tags-wrapper'>
            <GenerateTags request="Japan" addTag={addTag} />
            <GenerateTags request="Poland" addTag={addTag} />
        </div>

  )
}
