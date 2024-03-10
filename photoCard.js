import favorite from "./favorite.js"


const photoCard = photo => {
  const root=window.location.origin;

  const {
    alt,
    avg_color: backdropColor,
    width,
    height,
    id,
    src: {large}
  } = photo;

  const card = document.createElement('div');
  card.classList.add("card","grid-item");
  card.style.backgroundImage = backdropColor;

  const favoriteObj= JSON.parse(window.localStorage.getItem("favorite"));

  card.innerHTML=`
    <figure class="card-banner" style="--width: ${width}; --height:${height};">
      <a href="${root}/photo_detail.html?id=${id}"> <img src="${large}" width="${width}" height="${height}" loading="lazy" alt="${alt}" class="img-cover"> </a>
    </figure>

    <div class="card-content">
      <button class="icon-btn small ${favoriteObj.photos[id] ? "active" : ""} aria-label ="Add to favorite" data-favorite-btn data-ripple>
        <span class="material-symbols-outlined" aria-hidden="true">favorite</span>

        <div class="state-layer"></div>
      </button>
    </div>

    <a href="./photo_detail.html" class="state-layer"></a>
  `;

  const cardBanner=card.querySelector("img");
  cardBanner.style.opacity=0;

  cardBanner.addEventListener("load",function(){
    this.animate({
      opacity:1
    },{duration:400, fill:"forwards"})
  })

  const favoriteBtn=card.querySelector("[data-favorite-btn]");
  favorite(favoriteBtn,"photos",id);
  return card;
}

export default photoCard;