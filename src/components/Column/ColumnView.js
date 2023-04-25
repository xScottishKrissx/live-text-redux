import React from 'react'
import { createMarkup } from '../Utility/createMarkup'
import DisplayColumn from './DisplayColumn'

export default function ColumnsView({useColumnHeadline, getactiveColumnsItems, useHiddenValue}) {
  return (
    <div className='global-view-wrapper'>

        {useHiddenValue ? <h2 className='defaultBtnStyle columnHidden'>Column Hidden</h2> : null}

        <h1 
          className='defaultBtnStyle colTitle'
           dangerouslySetInnerHTML={createMarkup(useColumnHeadline)}>
        </h1> 

        {getactiveColumnsItems.length <= 0 ? 
          "+ Add New Post" 
        : 
            <DisplayColumn getactiveColumnsItems={getactiveColumnsItems} />
        
        }
    </div>
  )
}
