import React,{useCallback} from 'react'
import {FaLink, FaUnlink} from 'react-icons/fa'

export default function AddLinkButton({editor}) {
    
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
    
        // cancelled
        if (url === null) return 
    
        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }
    
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run() }, [editor])
    
      if (!editor) return null

  return (
    <>
    
        <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}> <FaLink /> </button>
        
        <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive('link')}
        >
        <FaUnlink /> </button>

    </>
  )
}
