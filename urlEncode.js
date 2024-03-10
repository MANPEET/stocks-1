const urlEncode = (urlObj) => {
  return Object.entries(urlObj).join('&').replace(/,/g, '=').replace(/#/g, '%23');
  
}



export default urlEncode;