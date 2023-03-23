const handleDelete = (getCurrentColumn, getColumnId, getPostId, liveTexts, updateWebsite) =>{

    const removePost = Object.entries(getCurrentColumn).map(([id, items]) =>{ 
        return items[getColumnId].items.filter(x => !x[getPostId]) 
    })

    const updateLiveTexts = liveTexts.map(x =>{ 
        if(x[getColumnId]){ 
            return{...x, [getColumnId]:  {type:"Column", items:removePost[0]}} 
        }else{ 
            return x 
        }
    })
    updateWebsite(updateLiveTexts, "delete")
 }

 export default handleDelete