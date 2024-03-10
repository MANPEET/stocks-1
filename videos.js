import urlDecode from "./urlDecode.js";
import videoCard from "./videoCard.js"
import { gridInit, updateGrid } from './gridInit.js';
import client from './api.js';
import filter from "./filter.js"
import updateuRL from "./updateuRL.js"

const filterBar= document.querySelector("[data-filter-bar]");

filterBar.style.display= window.location.search ? "flex" : "none";

const filterWrappers=document.querySelectorAll("[data-filter]")

filterWrappers.forEach(wrapper =>{
  filter(wrapper, window.filterObj,(newObj) =>{
    window.filterObj = newObj;
    updateuRL(newObj,"videos");
  })
})

const videoGrid= document.querySelector("[data-video-grid]");
let title= document.querySelector("[data-title]");
const videogrid=gridInit(videoGrid);
const perPage= 30;
let currPage=1;
let totalPage=0;
const searchurl = window.location.search.slice(1);
let searchObj = searchurl && urlDecode(searchurl);
console.log(searchObj.query)
const Title = searchObj ? `${searchObj.query} videos` : "Popular videos";

title.textContent=Title;
document.title=Title;

const getVideos = function(currPage){
  client.videos[searchObj ? "search" : "popular"]({
    ...searchObj,
    page: currPage,
    per_page: perPage
  },data => {
    console.log(data)

    totalPage = Math.ceil(data.total_results / perPage);
    console.log(totalPage)
    data.videos.forEach(video => {
      const videocard = videoCard(video);

      updateGrid(videocard,videogrid.columnsHeight,videogrid.columns)
    })

    isLoader=true;

    if(currPage >= totalPage) loader.style.display="none";
  })
}

getVideos(currPage);

const loader=document.querySelector("[data-loader]");
let isLoader=true;

window.addEventListener('scroll',function(){
  if(loader.getBoundingClientRect().top < (window.innerHeight * 2) && isLoader && currPage <= totalPage){
    currPage++;
    getVideos(currPage);
    isLoader=false;
  }
})