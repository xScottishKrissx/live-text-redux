import React from 'react'
// Redux
import { useSelector } from 'react-redux'
// Me
import ColumnsView from './ColumnView'

export default function Columns() {
    
    const liveText = useSelector((state) => state.livetext.value)
    // console.log(liveText)

    const activeLiveText = useSelector((state) => state.active.value)
    // console.log(activeLiveText)
    if(!liveText || !activeLiveText) return
    
    const getActiveLiveText = liveText.filter(x =>x[activeLiveText])  
    // console.log(getActiveLiveText)

    const liveTextArray = [...getActiveLiveText]
    // console.log(liveTextArray)
    if(!liveTextArray[0]) return

    const getactiveColumnsItems = liveTextArray[0][activeLiveText].items
    // console.log(getactiveColumnsItems)
    if(!getactiveColumnsItems) return

    let useColumnHeadline = liveTextArray[0][activeLiveText].headline
    let useHiddenValue =  liveTextArray[0][activeLiveText].hidden

  return (
    <>
    
          <ColumnsView 
              getactiveColumnsItems={getactiveColumnsItems}
              useColumnHeadline={useColumnHeadline}
              useHiddenValue={useHiddenValue}
          />
          
        </>
  )
}
