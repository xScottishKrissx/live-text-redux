import React from 'react'
// Me
import Title from '../../../InputForm/Title'
import { removeTag } from '../../../Utility/removeTag'

export default function ColumnTitleView({editModeActive, columnContent, setColumnTitle, handleSetActive, columnId}) {

    
    const {headline} = columnContent
    return (
        <>
            {editModeActive ? 
                <Title field={removeTag(headline)} passNewFieldValue={setColumnTitle} hideLabel />                
            : 
                <div onClick={()=>handleSetActive(columnId, columnContent)} className='manageColumns-headline' >
                    {removeTag(headline)}
                </div>
            }
        </>
    )
}
