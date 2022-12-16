import React,{useCallback} from 'react'

import {FaImage} from 'react-icons/fa'
export default function AddImageButton({editor}) {

    const addImage = useCallback(() => {
        const url = window.prompt('URL')
    
        if (url) {
          editor.chain().focus().setImage({ src: url }).run()
        }
      }, [editor])
    
      if (!editor) {
        return null
      }

  return (
    <>
        <button onClick={addImage}><FaImage /></button>
    </>
  )
}
