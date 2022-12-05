import React,{useState} from 'react'
import './text-area.css'
// Draft.js
import {ContentState, convertToRaw, EditorState, SelectionState, Modifier} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {convertToHTML} from 'draft-convert'
// import DOMPurify from 'dompurify'

// import { useDispatch, useSelector } from 'react-redux'

export default function TextArea({setPostBody, tag}) {
  // const dispatch = useDispatch()
  const [editorState, setEditorState] = useState(
    ()=>EditorState.createEmpty()
  )


  // const [convertedContent, setConvertedContent] = useState(null)
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

  const addTag = (tag) =>{
    setEditorState(insertTag(tag, editorState));
  }

  const insertTag = (tag, editorValue) => {
    // Get the current content of the editor.
    const currentContent = editorValue.getCurrentContent();
    // Get the current cursor position in the editor.
    const currentSelection = editorValue.getSelection();

    // Replace the specified range of content state with the supplied tag, with the inline style and entity key applied to the entire inserted string.
    const newContent = Modifier.replaceText(
      // Get the current content in editor...
      currentContent,
      /// get the range/positon of the cursor
      currentSelection,
      // Replace it with...
      tag
    );

    const newEditorState = EditorState.push(
      // The current content of the editor...
      editorValue,
      // The new content we just created...
      newContent,
      // used when making edit
      "insert-characters"
    );
    return EditorState.forceSelection(
      // Return a new EditorState object with the newly created content applied, forcing the selection to be rendered.
      newEditorState,
      // Return the SelectionState displayed in the editor after rendering
      newContent.getSelectionAfter()
    );
  };

  // const createMarkup = (html) =>{
  //   return{
  //     __html:DOMPurify.sanitize(html)
  //   }
  // }

  return (
    <div>
      <Editor 
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        // onContentStateChange={handleEditorChange}
        // defaultEditorState={editorconState}
        // onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        // 

       />
      {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
      <button onClick={()=>addTag(tag)}>Test</button>
      <button onClick={()=>addTag("David")}>David</button>
      <button onClick={()=>addTag("James")}>James</button>
      <button onClick={()=>addTag("Alan")}>Alan</button>

    </div>
  )
}


// There's an error in the package
// react_devtools_backend.js:4012 Warning: Can't call setState on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the i component.
// the github page shows that the issue is common and is wating to be patched. I haven't noticed any issues so far so i am going to keep using the plugin as it does the job i want. I will keep an eye out for it however.