import React,{useState} from 'react'
import { createMarkup } from '../Utility/createMarkup'
import ChangePageButton from './columnComponents/changePageButton'
import DisplayColumn from './DisplayColumn'

export default function ColumnsView({useColumnHeadline, getactiveColumnsItems, useHiddenValue}) {

  const columnItemsCount = getactiveColumnsItems.length
  
  const itemsOnPage = 3
  const [pages, setPages] = useState({ start:0, end:itemsOnPage, })
  const {start, end} = pages
  
  let useActiveColumnItems = [...getactiveColumnsItems].reverse()
  let newPages = useActiveColumnItems.slice(start,end)
 
  return (
    <div className='global-view-wrapper'>

        {/* Display UI if column is hidden */}
        {useHiddenValue ? <h2 className='defaultBtnStyle columnHidden'>Column Hidden</h2> : null}

        {/* Column Headline */}
        <h1 className='defaultBtnStyle colTitle' dangerouslySetInnerHTML={createMarkup(useColumnHeadline)}></h1> 

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
