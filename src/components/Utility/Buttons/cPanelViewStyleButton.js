import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCPanelInputStyle } from '../../../features/cPanelInputStyle'

export default function CPanelViewStyleButton() {
    const dispatch = useDispatch()
    const cPanelStyle = useSelector((state) => state.cPanelStyle.value)

    const toggleView = () =>{
        dispatch(setCPanelInputStyle(!cPanelStyle))
    }

    const view = cPanelStyle ? "Use Simple " : "Use Advanced"

    return (
    <>
        <button className='defaultBtnStyle' onClick={toggleView}>{view}</button>
    </>
    )
}
