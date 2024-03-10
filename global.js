import addEventOnElements from "../event.js";
import urlDecode from "./urlDecode.js"

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navigation]");
const scrim=document.querySelector("[data-scrim]");

addEventOnElements(navTogglers,"click",() =>{
  navbar.classList.toggle("show")
  scrim.classList.toggle("active")
})

if(!window.localStorage.getItem("favorite")){
  const favoriteObj={
    photos:{},
    videos:{}
  }

  window.localStorage.setItem("favorite",JSON.stringify(favoriteObj))
}

window.filterObj={};

if(window.location.search.slice(1)){
  const search=urlDecode(window.location.search.slice(1));
  Object.entries(search).forEach(item =>{
    const filterKey=item[0];
    const filteValue=item[1];
    window.filterObj[filterKey]= filteValue;

    if(filterKey !== "query"){
      const filterItem=document.querySelector(`[data-filter="${filterKey}"]`)
      filterItem?.querySelector("[data-filter-chip]").classList.add("selected")

      if(filterItem) filterItem.querySelector("[data-filter-value]").innerText = filteValue
    }
  })
}

window.addEventListener("loadstart",function(){
  document.body.style.opacity="0";
})

window.addEventListener("DOMContentLoaded",function(){
  document.body.style.opacity="1";
})