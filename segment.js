import  addEventOnElements  from "../event.js";

const segment = (segment,callback) =>{
  const segmentBtn= segment.querySelectorAll("[data-segment-btn]");
  let lastActiveBtn = segment.querySelector("[data-segment-btn].selected")

  addEventOnElements(segmentBtn, "click", function(){
    lastActiveBtn.classList.remove("selected");
    this.classList.add("selected");
    lastActiveBtn= this;
    callback(this.dataset.segmentValue)
  })
}

export default segment;