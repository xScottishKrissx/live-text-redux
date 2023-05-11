import React from 'react'
import {useSelector} from 'react-redux'

import AuthorInput from './author-input'
import ItemReview from './ItemReview/item-review'
import Columns from './Column/Column'

import '../App.css'
import User from './User/User'

export default function LoggedIn() {

    const editModeState = useSelector((state) => state.edit.value)
    const newItem = useSelector((state) => state.items.value)
    const previewItem = useSelector((state) => state.preview.value)
    const liveText = useSelector((state) => state.livetext.value)

  return (
    <>

        <User />

        <div className='content-container'>
          <AuthorInput />
          <div className='right-column'>
              {editModeState.editing ? <ItemReview data={previewItem} /> : <ItemReview data={newItem} /> }
              <Columns />
          </div>
        </div>
    </>
  )
}
