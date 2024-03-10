import client from "./api.js";
import photoCard from "./photoCard.js"
import { gridInit, updateGrid } from './gridInit.js';
import videoCard from './videoCard.js'
import collectionCard from "./collectionCard.js"



const photoGrid= document.querySelector("[data-photo-grid]");

photoGrid.innerHTML=`<div class="skeleton"></div>`.repeat(18);
console.log(photoGrid)

client.photos.curated({ page: 1, per_page: 20}, data => {
  photoGrid.innerHTML=``;
  console.log(photoGrid)
  const photogrid= gridInit(photoGrid);


  data.photos.forEach(photo => {
    const photocard= photoCard(photo);
    updateGrid(photocard, photogrid.columnsHeight, photogrid.columns)
    
  });
});

const videoGrid= document.querySelector("[data-video-grid]");
videoGrid.innerHTML=`<div class="skeleton"></div>`.repeat(18);

client.videos.popular({per_page: 20}, data => {
  videoGrid.innerHTML=``;
  const videogrid= gridInit(videoGrid);

  data.videos.forEach(photo => {
    const videocard= videoCard(photo);
    updateGrid(videocard, videogrid.columnsHeight, videogrid.columns)

  });
});

const collecionGrid= document.querySelector("[data-collection-grid]")

client.collections.featured({per_page: 18}, data => {
  
  data.collections.forEach(collection => {
    
    const collectioncard= collectionCard(collection);
    
    collecionGrid.appendChild(collectioncard);
  })
})