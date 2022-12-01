import React from 'react'
import './global-view.css'

import { useSelector } from 'react-redux'

export default function GlobalView() {
  const itemList = useSelector((state) => state.items.value)
  console.log(itemList)
  return (
    <div className='global-view-wrapper'>

        <h1>Global View</h1>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
          <li>Item 5</li>
          <li>Item 6</li>
        </ul>
    </div>
  )
}
