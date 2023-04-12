import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInputStyle } from '../../../features/inputStyle'

export default function InputStyleButton() {

    const dispatch = useDispatch()
    const inputStyle = useSelector((state) => state.inputStyle.value)
    const [formStyle, setFormStyle] = useState(inputStyle)

    useEffect(() => {
        dispatch(setInputStyle(formStyle))
    },[formStyle])

  return (
    <button className='setInputStyle defaultBtnStyle ' onClick={()=>setFormStyle(!formStyle)}>
        {inputStyle ? "Use Simple Form" : "Use Advanced Form"}
    </button>
  )
}
