import React,{useState, useRef, useMemo} from 'react'
import './text-area.css'
// Draft.js
import {ContentState, EditorState, Modifier} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {convertToHTML} from 'draft-convert'
import TagsView from './Tags/tags-view'

// Mentions
import createMentionPlugin, {defaultSuggestionsFilter} from '@draft-js-plugins/mention'
// import editorStyles from './'


const typeRange = ["Goal","Offside", "Yellow Card", "Red Card", "Breaking","Update"]

export default function TextArea({setPostBody}) {
  const [postType, setPostType] = useState("")
  const [editorState, setEditorState] = useState(
    ()=>EditorState.createEmpty()
    // ()=>EditorState.createWithContent(ContentState.createFromText(postType))
  )

  const convertContentToHTML = () =>{
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent())
    setPostBody(currentContentAsHTML)

  }
  const handleEditorChange = (state) =>{
    setEditorState(state)
    convertContentToHTML()
  }

  const addTag = (tag) => setEditorState(insertTag(tag, editorState)); 

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

  return (
    <div>
      <Editor 
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        // 

       />      
        <div className="author-input-form-type-select">
          <div className='author-input-form-type-select-items'>
            {typeRange.map((item, index) => {
              const removeSpacesFromName = item.replace(/\s+/g, '').toLowerCase()
              return(
                <div key={index} onClick={()=>addTag( "@" + removeSpacesFromName)} id={removeSpacesFromName}>{item}</div>
              )
            })}
          </div>
        </div>
      <TagsView addTag={addTag}/>
    </div>
  )
}


// There's an error in the package
// react_devtools_backend.js:4012 Warning: Can't call setState on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the i component.
// the github page shows that the issue is common and is wating to be patched. I haven't noticed any issues so far so i am going to keep using the plugin as it does the job i want. I will keep an eye out for it however.