import React from 'react'

import { Japan, Poland } from "./names";

export default function GenerateTags({request, addTag}) {
    let team;
    
    if(request.toLowerCase() === "japan") team = Japan
    if(request.toLowerCase() === "poland") team = Poland

    return (
      <div className="tags-teams">
        <h3>{request}</h3>
          {team.map((item) => {
            const {id, firstName, lastName} = item
              return(
                <div className='tags-item' key={id}>
                  
                  <div className="tags-item-name">
                    <span 
                      className='tags-first-name' 
                      onClick={()=>addTag(firstName)}>{id}-{firstName}</span>
                    {" "}
                    <span 
                      className='tags-last-name' 
                      onClick={()=>addTag(lastName)}>{lastName}</span>
                  </div>

                  <span 
                    title="Add Full Name" 
                    className='tags-add-full-name' 
                    onClick={()=>addTag(firstName + " " + lastName)}>+</span>
                </div>
              )
          })}
      </div>
    )
}
