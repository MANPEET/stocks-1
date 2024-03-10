"use strict";
import  addEventOnElements  from "../event.js";
import segment from "../segment.js"
import urlDecode from "./urlDecode.js"
import updateuRL from "./updateuRL.js"

const searchTogglers = document.querySelectorAll("[data-search-toggler]")
const searchView = document.querySelector("[data-search-view]")
const logo= document.querySelector(".logo")
const iconBtn = document.querySelector(".icon-btn")

addEventOnElements(searchTogglers, "click", () => {
  searchView.classList.toggle("show");
  
})

const searchField = document.querySelector("[data-search-field]")
const searchClearBtn = document.querySelector("[data-search-clear-btn]")

searchField.addEventListener("keydown", e =>{
  if (e.key === "Enter" && searchField.value.trim()){ searchBtn.click();}
})

searchClearBtn.addEventListener("click",() => searchField.value=""); 

const searchSegment = document.querySelector("[data-segment='search']")
const activeSegementBtn = searchSegment.querySelector("[data-segment-btn].selected")

window.searchType = activeSegementBtn.dataset.segmentValue;

segment(searchSegment,segmentValue => window.searchType = segmentValue )

const searchBtn = document.querySelector("[data-search-btn]")
searchBtn.addEventListener("click", () => {
  const searchValue = searchField.value.trim();

  if(searchValue){
    updateSearchHistory(searchValue);
    window.filterObj.query = searchValue;
    updateuRL(window.filterObj, window.searchType);
  }
})

let searchHistory = { items: [] };

if(window.localStorage.getItem("search_History")){
  searchHistory =JSON.parse(window.localStorage.getItem("search_History"))
}else{
  window.localStorage.setItem("search_History", JSON.stringify(searchHistory))
}

function updateSearchHistory(searchValue){
  if(searchHistory.items.includes(searchValue)){
    searchHistory.items.splice(searchHistory.items.indexOf(searchValue),1)
  }

  searchHistory.items.unshift(searchValue)

  window.localStorage.setItem("search_History", JSON.stringify(searchHistory))
}

const searchlist= document.querySelector("[data-search-list]")
let listLen = searchHistory.items.length;


for(let i=0; i<listLen && i<5; i++){
  const listItem = document.createElement("button");
  listItem.classList.add("list-item");


  listItem.innerHTML=`
  <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>
    <span class="body-large text">${searchHistory.items[i]}</span>

    <div class="state-layer"></div>
  `
  listItem.addEventListener("click",function(){
    searchField.value=this.children[1].textContent;
    searchBtn.click()
  })

  searchlist.appendChild(listItem);
}

const search=urlDecode(window.location.search.slice(1));

if(search.query) searchField.value = search.query;

