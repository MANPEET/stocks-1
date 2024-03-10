import client from "./api.js";

const favorite = (element,type,id) =>{
  element.addEventListener("click",function(){
    element.setAttribute("disabled", "");

    const favoriteObj= JSON.parse(window.localStorage.getItem("favorite"));

    if(favoriteObj[type][id]){
      element.classList.add("active");
      element.removeAttribute("disabled")

      delete favoriteObj[type][id];

      window.localStorage.setItem("favorite",JSON.stringify(favoriteObj));
    }else{
      client[type].detail(id, data =>{
        element.classList.add("active");
        element.removeAttribute("disabled");
        favoriteObj[type][id]=data;

        window.localStorage.setItem("favorite",JSON.stringify(favoriteObj));
      })
    }
  })
}

export default favorite;
