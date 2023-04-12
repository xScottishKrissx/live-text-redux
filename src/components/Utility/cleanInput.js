export function cleanInput(input) {
    if ((input === null) || (input === '')) {
        return false;
      } else {
        input = input.toString();
      }
      let removeHtml = input.replace(/(<([^>]+)>)/ig,'');
      let removeSymbol = removeHtml.replace('@', '')
      return removeSymbol;
}

