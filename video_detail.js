import client from './api.js';

import menu from './others/menu.js';
import favorite from './others/favorite.js';

window.addEventListener("loadstart",function(){
  document.body.style.opacity="0";
})

window.addEventListener("DOMContentLoaded",function(){
  document.body.style.opacity="1";
})

const menuWrappers = document.querySelectorAll('[data-menu-wrapper]');

menuWrappers.forEach(menuWrapper =>{
  menu(menuWrapper)
})

const favoriteVideos =JSON.parse(window.localStorage.getItem("favorite")).videos;
const favoriteBtn = document.querySelector('[data-add-favorite');

const videoId=window.location.search.split("=")[1];

favoriteBtn.classList[favoriteVideos[videoId] ? "add" : "remove"]("active");
favorite(favoriteBtn,"videos",videoId)

const detailWrapper = document.querySelector("[data-detail-wrapper]");
const downloadLink = document.querySelector("[data-download-link]")
const downloadMenu = document.querySelector("[data-download-menu]")

client.videos.detail(videoId, data =>{


  const {
    image,
    user:{name: author},
    video_files,
    width,
    height,
  }=data;

  const hdVideo= video_files.find(item =>item.quality === "hd");
  const {file_type, link} = hdVideo;

  downloadLink.href= link;

  video_files.forEach(item =>{
    const {
      width,
      height,
      quality,
      link
    } = item;

    downloadMenu.innerHTML +=`
      <a href="${link}" download class="menu-item">
        <span class="label-large text">${quality.toUpperCase()}</span>

        <span class="label-large trailing-text">${width}x${height}</span>

        <div class="state-layer"></div>
      </a>
    `
  })

  detailWrapper.innerHTML= `
    <div class="detail-banner" style="aspect-ratio:${width}/${height};">
      <video poster="${image}" controls class="img-cover">
        <source type="${file_type}" src="${link}">
      </video>
    </div>

    <p class="title-small">Video by <span class="color-primary">${author}</span></p>
  `;

 
})
