const updateLiveText = (changedPost, getColumnItems, getPostId, getColumnId, liveTexts, updateWebsite, getColumnHeadline, keepOpen) =>{

    console.log(getColumnHeadline)
    const updateColumn = getColumnItems.map(x =>{ 
        if(x[getPostId]){
            return {
                ...x, [getPostId]: changedPost,
        }}else{ 
            return x 
        }}
    )
    const updateLiveTexts = liveTexts.map(x =>{ 
        console.log(x[getColumnId])
        if(x[getColumnId]){ 
            return{
                ...x, [getColumnId]:{ type:"Column", items:updateColumn, headline: getColumnHeadline }}
        }else{ 
            return x 
            }
        })
        console.log(updateLiveTexts)
    updateWebsite(updateLiveTexts, keepOpen)        
}

export default updateLiveText