const deletePost = (getCurrentColumn, getColumnId, getPostId, liveTexts, updateWebsite, getColumnHeadline) =>{

    const removePost = Object.entries(getCurrentColumn).map(([id, items]) =>{ 
        return items[getColumnId].items.filter(x => !x[getPostId]) 
    })

    const updateLiveTexts = liveTexts.map(x =>{ 
        if(x[getColumnId]){ 
            // return{...x, [getColumnId]:  {type:"Column", headline:getColumnHeadline, items:removePost[0]}} 
            return{ ...x, [getColumnId]:{ ...x[getColumnId], items:removePost[0] }}
        }else{ 
            return x 
        }
    })
    updateWebsite(updateLiveTexts, "delete")
 }

 export default deletePost