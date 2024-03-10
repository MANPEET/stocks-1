import addEventOnElements from "./event.js";

const menu = function(menuWrapper, callback){
  const menu1= menuWrapper.querySelector("[data-menu]");

  const menuTogglers=menuWrapper.querySelectorAll("[data-menu-toggler]");
  console.log(menuTogglers)

  const menuItems=menuWrapper.querySelectorAll("[data-menu-item]");

  addEventOnElements(menuTogglers, "click", function(e){
    menu1.classList.toggle("expanded");
  })

  addEventOnElements(menuItems, "click", function(e){
    menu1.classList.remove("expanded");
    if(callback) callback(this.dataset.menuItem)
  })
}

export default menu;