import React from 'react'

export default function EditType({typeRange, setPostType}) {
  return (
    <> 
        {typeRange.map((item, index) => {
            const removeSpacesFromName = item.replace(/\s+/g, '')
            return(
                <div 
                key={index} 
                onClick={()=>setPostType(removeSpacesFromName)} 
                className={removeSpacesFromName} 
                id={removeSpacesFromName}
                >
                {item}
            </div>
            )
        })}
    </>
  )
}
