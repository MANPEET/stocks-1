import urlDecode from "./urlDecode.js";
import photoCard from "./photoCard.js"
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
    updateuRL(newObj,"photos");
  })
})

const photoGrid= document.querySelector("[data-photo-grid]");
let title= document.querySelector("[data-title]");
const photogrid=gridInit(photoGrid);
const perPage= 30;
let currPage=1;
let totalPage=0;
const searchurl = window.location.search.slice(1);
let searchObj = searchurl && urlDecode(searchurl);
console.log(searchObj.query)
const Title = searchObj ? `${searchObj.query} photos` : "Curated Photos";

title.textContent=Title;
document.title=Title;

const getPhotos = function(currPage){
  client.photos[searchObj ? "search" : "curated"]({
    ...searchObj,
    page: currPage,
    per_page: perPage
  },data => {
    console.log(data)

    totalPage = Math.ceil(data.total_results / perPage);
    console.log(totalPage)
    data.photos.forEach(photo => {
      const photocard = photoCard(photo);

      updateGrid(photocard,photogrid.columnsHeight,photogrid.columns)
    })

    isLoader=true;

    if(currPage >= totalPage) loader.style.display="none";
  })
}

getPhotos(currPage);

const loader=document.querySelector("[data-loader]");
let isLoader=true;

window.addEventListener('scroll',function(){
  if(loader.getBoundingClientRect().top < (window.innerHeight * 2) && isLoader && currPage <= totalPage){
    currPage++;
    getPhotos(currPage);
    isLoader=false;
  }
})