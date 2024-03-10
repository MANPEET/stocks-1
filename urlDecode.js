const urlDecode = urlString => {
  console.log(urlString)
  return Object.fromEntries(urlString.replace(/%23/g, '#').replace(/%20/g, " ").split("&").map(i => i.split("=")));
}



export default urlDecode;