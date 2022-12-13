import React, { useState} from 'react';
  import { convertToRaw, EditorState } from 'draft-js';
  import Editor from '@draft-js-plugins/editor';
  import createMentionPlugin, { defaultSuggestionsFilter, MentionSuggestions, } from '@draft-js-plugins/mention';
import editorStyles from "./editorStyles.module.css";
import "@draft-js-plugins/mention/lib/plugin.css"
//   import mentions from './Mentions';

import { Japan } from '../Tags/names';
  
  export default function MentionEditor() {
    
    const [mentionPlugin, setMentionPlugin] = useState(createMentionPlugin())
    const { MentionSuggestions } = mentionPlugin 
    const [editorState, setEditorState] = useState(()=>EditorState.createEmpty())
    const [suggestions, setSuggestion] = useState(Japan)
    // console.log(suggestions)
    const [open, setOpen] = useState(false)


    const onChange = editorState =>{
        setEditorState(editorState)
    }
    const onOpenChange = () =>{
        // setOpen(!open)
        if(open){
            setOpen(false)
            setSuggestion(Japan)
        }else{
            setOpen(true)
        }
    }

    const onSearchChange = ({value}) =>{
        // console.log(value)
        // console.log(Japan)
        if(!value) return
        setSuggestion(defaultSuggestionsFilter(value, suggestions))
    }
   
    return (

        <div className={editorStyles.editor}>
            <Editor
                editorState={editorState}
                onChange={onChange}
                plugins={[mentionPlugin]}
            />
            <MentionSuggestions
                open={open}
                onOpenChange={onOpenChange}
                suggestions={suggestions}
                onSearchChange={onSearchChange}
            />
        </div>
    );
  }