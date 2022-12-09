import React, { useState} from 'react';
  import { convertToRaw, EditorState } from 'draft-js';
  import Editor from '@draft-js-plugins/editor';
  import createMentionPlugin, { defaultSuggestionsFilter, MentionSuggestions, } from '@draft-js-plugins/mention';
//   import { defaultSuggestionsFilter } from '@draft-js-plugins/mention';
//   import editorStyles from './SimpleMentionEditor.module.css';
//   import mentions from './Mentions';

import { Japan } from '../Tags/names';
  
  export default function MentionEditor() {
    
    const [mentionPlugin, setMentionPlugin] = useState(createMentionPlugin())
    const { MentionSuggestions } = mentionPlugin 

    const [editorState, setEditorState] = useState(()=>EditorState.createEmpty())
    const [suggestions, setSuggestion] = useState(Japan)
    const [open, setOpen] = useState(false)


    const onChange = editorState =>{
        setEditorState(editorState)
    }
    const onOpenChange = () =>{
        setOpen(!open)
    }

    const onSearchChange = ({value}) =>{
        // console.log(value)
        // console.log(Japan)
        if(!value) return

        // THe problem is in here somewhere
        setSuggestion(defaultSuggestionsFilter(value, suggestions.firstName))
    }

    const onExtractData = () =>{
        const contentState = editorState.getCurrentContent()
        const raw = convertToRaw(contentState)
        console.log(raw)
    }

    const onExtractMentions = () =>{
        const contentState =  editorState.getCurrentContent()
        const raw = convertToRaw(contentState)
        let mentionUsers = []
        for (let key in raw.entityMap){
            const ent = raw.entityMap[key]
            if(ent.type === "mention"){
                mentionUsers.push(ent.data.mention)
            }
        }
        console.log(mentionUsers)
    }

    
    return (

        <div>
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