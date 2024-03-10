"use strict";

const addEventOnElements = function(elements, event, callback){
  elements.forEach((element) => {
    element.addEventListener(event, callback);
  })
}

export default addEventOnElements;