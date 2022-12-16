import React,{useCallback} from 'react'


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
        <button onClick={addImage}>setImage</button>
    </>
  )
}
