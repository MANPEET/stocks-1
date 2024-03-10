import urlEncode from "./urlEncode.js";
const API_KEY = "AaJSCtMfdMMxpx2pCFYr13CPPOtsqTi3pheXLjQXzVXT9XtQ49gI3cYA";

const headers = new Headers();
headers.append("Authorization", API_KEY);

const requestOptions = { headers };

const fetchData= async function(url,successCallback){
  const response = await fetch(url, requestOptions);

  if(response.ok){
    const data= await response.json();
    successCallback(data);
  }
};



let requesturl = "";

const root = {
  default: "https://api.pexels.com/v1/",
  videos: "https://api.pexels.com/videos/"
};

const client = {
  photos: {
    
    search(param, callback) {
      requesturl = `${root.default}search?${urlEncode(param)}`;
      fetchData(requesturl, callback);
    },

    curated(param, callback) {
      fetchData(`${root.default}curated?${urlEncode(param)}`, callback);
    },

    detail(id, callback) {
      fetchData(`${root.default}photos/${id}`, callback);
    },
  },
  videos: {
    search(param, callback) {
      requesturl = `${root.videos}search?${urlEncode(param)}`;
      fetchData(requesturl, callback);
    },

    popular(param, callback) {
      fetchData(`${root.videos}popular?${urlEncode(param)}`, callback);
    },

    detail(id, callback) {
      fetchData(`${root.videos}videos/${id}`, callback);
    },
  },
  collections: {
    featured(param, callback) {
      (requesturl = `${root.default}collections/featured?${urlEncode(param)}`),
        fetchData(requesturl, callback);
    },

    detail(id, param, callback) {
      requesturl = `${root.default}collections/${id}?${urlEncode(param)}`;
      fetchData(requesturl, callback);
    },
  },
};

export default client;
client.photos.search({
  query: 'cat',
  per_page: 10
}, (data) => {
  console.log(data);
});
