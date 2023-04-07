export const removeTag = (input) =>{
    // return
    let removeOpeningTag = input.replace('<p>', '')
    let removeClosingTag = removeOpeningTag.replace('</p>', '')
    return removeClosingTag     
    
}

