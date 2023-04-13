import React from 'react'
// Redux
import { useSelector } from 'react-redux'
// Me
import ColumnsView from './ColumnView'

export default function Columns() {
    
    const liveText = useSelector((state) => state.livetext.value)
    const activeLiveText = useSelector((state) => state.active.value)
    if(!liveText || !activeLiveText) return
    
    const getActiveLiveText = liveText.filter(x =>x[activeLiveText])  
    const liveTextArray = [...getActiveLiveText]
    if(!liveTextArray[0]) return
  
    const getactiveColumnsItems = liveTextArray[0][activeLiveText].items
    if(!getactiveColumnsItems) return

    let useColumnHeadline = liveTextArray[0][activeLiveText].headline

  return (
    <ColumnsView 
        getactiveColumnsItems={getactiveColumnsItems}
        useColumnHeadline={useColumnHeadline}
    />
  )
}
