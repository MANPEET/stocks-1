import favorite from "./favorite.js";
import hoverOnPlay from "./hoverOnPlay.js";

export const videoCard = video => {
  const root=window.location.origin;

  const {
    width,
    height,
    id,
    image,
    video_files
  } = video;

  const sdVideo= video_files.find(item =>item.quality === "sd" && item.width < 1000);
  const {file_type, link} = sdVideo;
  const card = document.createElement('div');
  card.classList.add("card","grid-item","video");

  const favoriteObj= JSON.parse(window.localStorage.getItem("favorite"));
  card.innerHTML =`
    <div class="card-banner" style="--width:${width}; --height:${height}">
      <a href="${root}/video_detail.html?id=${id}">
        <video poster="${image}" muted loop  class="img-cover" data-video>
          <source src="${link}" type="${file_type}">
        </video>
      </a>
    </div>

    <div class='card-content'>
     <button class="icon-btn small ${favoriteObj.videos[id] ? "active" : ""} aria-label ="Add to favorite" data-favorite-btn       data-ripple>
        <span class="material-symbols-outlined" aria-hidden="true">favorite</span>

        <div class="state-layer"></div>
      </button>
    </div>

    <span class="card-badge" data-card-badge>
      <span class="material-symbols-outlined" aria-hidden="true">play_arrow</span>
    </span>

    <a href="" class="state-layer"></a>
  `
  const favoriteBtn=card.querySelector("[data-favorite-btn]");
  favorite(favoriteBtn,"videos",id);

  hoverOnPlay(card);
  
  return card;
}

export default videoCard;