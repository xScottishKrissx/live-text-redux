export const removeTag = (input) =>{
    let removeOpeningTag = input.replace('<p>', '')
    let removeClosingTag = removeOpeningTag.replace('</p>', '')
    return removeClosingTag     
    
}

