import React from 'react'

export default function EditType({typeRange, setPostType}) {
  return (
    <> 
        {typeRange.map((item, index) => {
            const removeSpacesFromName = item.replace(/\s+/g, '')
            return(
                <button 
                  key={index} 
                  onClick={()=>setPostType(removeSpacesFromName)} 
                  className={ "defaultBtnStyle " + removeSpacesFromName} 
                  id={removeSpacesFromName}
                >
                {item}
            </button>
            )
        })}
    </>
  )
}
