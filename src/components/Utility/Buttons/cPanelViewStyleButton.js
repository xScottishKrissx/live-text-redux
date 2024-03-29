import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCPanelInputStyle } from '../../../features/cPanelInputStyle'


export default function CPanelViewStyleButton() {
    const dispatch = useDispatch()
    const cPanelStyle = useSelector((state) => state.cPanelStyle.value)

    const toggleView = () =>{ dispatch(setCPanelInputStyle(!cPanelStyle)) }

    const [focused, setFocused] = useState(false);
    const handleFocus = () => setFocused(true); 
    const handleBlur = () => setFocused(false);

    let isChecked = cPanelStyle ? true : false

    return (
    <button 
        onChange={toggleView} 
        onClick={toggleView} 
        onFocus={handleFocus} 
        onBlur={handleBlur}
        className={`${isChecked ? 'cPanelViewStyleContainer detailedView' : 'cPanelViewStyleContainer simpleView'}`}>
        <span>{isChecked ? "Detailed" : "Simple"}</span>
        <label className={`toggle-button ${focused ? "switch focused" : "switch"}`}>
            <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={toggleView} 
                onClick={toggleView} 
                onFocus={handleFocus} 
                onBlur={handleBlur}
                />
            <span className="slider"></span>
        </label>
    </button>
    )
}
