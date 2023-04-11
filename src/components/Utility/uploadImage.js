import React,{useRef} from 'react'
import { FaTimes } from 'react-icons/fa'
export default function UploadImageBtn( {setPostImageName}) {
    const imageName = useRef()
    const getFileName = (e) =>{
        let getValue = imageName.current.value
        const readyImageName = getValue.replace(`C:\\fakepath\\`, '')
        setPostImageName(readyImageName)
    }

    const removeImage = () =>{
        imageName.current.value = ""
        setPostImageName(null)
    }

    return (
        <div className='author-input-text-editor-upload-image'>
            <form className='author-input-form-upload-image-button'>
                <input ref={imageName} type="file" id="myfile" name="myfile" onChange={(e)=>getFileName(e)}/>
                {imageName.current?.value.length > 1 ? 
                    <button className='defaultBtnStyle' type='button' value="Browse..." onClick={()=>removeImage()}>Remove Image - <FaTimes /></button>  
                    : 
                    <button className='defaultBtnStyle'  type='button' value="Browse..." onClick={()=>imageName.current.click()}>Upload Image +</button>     
                }
            </form>
        </div>
    )
}
