import React,{useState} from 'react'
import ColumnHeading from '../Utility/columnHeading'
import { createMarkup } from '../Utility/createMarkup'
import ChangePageButton from './columnComponents/changePageButton'
import DisplayColumn from './DisplayColumn'
import {removeTag} from '../Utility/removeTag.js'
export default function ColumnsView({useColumnHeadline, getactiveColumnsItems, useHiddenValue}) {

  const columnItemsCount = getactiveColumnsItems.length
  
  const itemsOnPage = 3
  const [pages, setPages] = useState({ start:0, end:itemsOnPage, })
  const {start, end} = pages
  
  let useActiveColumnItems = [...getactiveColumnsItems].reverse()
  let newPages = useActiveColumnItems.slice(start,end)
 
  const [toggle, setToggle] = useState(false)
  
  console.log(removeTag(useColumnHeadline))
  return (
    <div className={`${toggle ? 'global-view-wrapper expand' : 'global-view-wrapper'}`}>

        {/* Display UI if column is hidden */}
        {useHiddenValue ? <h2 className='defaultBtnStyle columnHidden'>Column Hidden</h2> : null}

        {/* Column Headline */}

        <ColumnHeading
          textToDisplay={removeTag(useColumnHeadline)}
          setToggle={()=>setToggle(!toggle)} 
          toggle={toggle} 
        />

        {columnItemsCount === 0 ? "+ Add New Post" : 
          <>
            <DisplayColumn getactiveColumnsItems={newPages} />
            <ChangePageButton 
              pagesState={pages} 
              setPages={setPages}
              itemsOnPage={itemsOnPage}
              columnItemsCount={columnItemsCount} 
            />        
          </>
          
        }
    </div>
  )
}
