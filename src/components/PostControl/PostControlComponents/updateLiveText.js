const updateLiveText = (changedPost, getColumnItems, getPostId, getColumnId, liveTexts, updateWebsite, keepOpen) =>{

    const updateColumn = getColumnItems.map(x =>{ 
        if(x[getPostId]){
            return {
                ...x, [getPostId]: changedPost,
        }}else{ 
            return x 
        }}
    )
    const updateLiveTexts = liveTexts.map(x =>{ 
        if(x[getColumnId]){ 
            return{
                ...x, [getColumnId]:{ type:"Column", items:updateColumn }}
        }else{ 
            return x 
            }
        })
    updateWebsite(updateLiveTexts, keepOpen)        
}

export default updateLiveText