import React,{useState} from 'react'
import './text-area.css'
// Draft.js
import {ContentState, convertToRaw, EditorState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {convertToHTML} from 'draft-convert'
import DOMPurify from 'dompurify'

import { useDispatch, useSelector } from 'react-redux'

export default function TextArea({setPostBody}) {
  const dispatch = useDispatch()
  const [editorState, setEditorState] = useState(
    ()=>EditorState.createEmpty()
  )

  const [convertedContent, setConvertedContent] = useState(null)
  // console.log(convertedContent)
  const convertContentToHTML = () =>{
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent())
    // This should be changed to use redux...
    // setConvertedContent(currentContentAsHTML)
    setPostBody(currentContentAsHTML)

  }
  const handleEditorChange = (state) =>{
    setEditorState(state)
    convertContentToHTML()
  }

  const createMarkup = (html) =>{
    return{
      __html:DOMPurify.sanitize(html)
    }
  }

  return (
    <div>
      <Editor 
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        // defaultEditorState={editorconState}
        // onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
       />
      <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
    </div>
  )
}


// There's an error in the package
// react_devtools_backend.js:4012 Warning: Can't call setState on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the i component.
// the github page shows that the issue is common and is wating to be patched. I haven't noticed any issues so far so i am going to keep using the plugin as it does the job i want. I will keep an eye out for it however.