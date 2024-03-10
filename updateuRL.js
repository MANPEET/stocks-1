import urlEncode from "./urlEncode.js"

const updateuRL = (filterObj, searchType) => {
  setTimeout(() => {
    const root = window.location.origin;
    console.log(filterObj);
    console.log(searchType);
    const searchurl= urlEncode(filterObj)
    window.location = `${root}/${searchType}.html?${searchurl}`;
  },100)
}

export default updateuRL;