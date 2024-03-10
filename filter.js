import menu from "./menu.js";

const filter = (wrapper,filterObj, callback) =>{
  const filterClearBtn= wrapper.querySelector("[data-filter-clear]")
  const filterValues=wrapper.querySelector("[data-filter-value]")
  const filterChip=wrapper.querySelector("[data-filter-chip]")
  const filterColor=wrapper.querySelector("[data-color-field]")

  const filterKey=wrapper.dataset.filter;
  console.log(filterKey)
  const newObj= filterObj;

  menu(wrapper, filterValue =>{
    filterValues.innerText=filterValue;
    filterChip.classList.add("selected")

    newObj[filterKey]=filterValue;
    callback(newObj);
  })

  filterClearBtn.addEventListener("click",()=>{
    filterChip.classList.remove("selected");
    filterValues.innerText=filterValues.dataset.filterValues;

    delete newObj[filterKey]
    callback(newObj);
  })

  filterColor?.addEventListener("change",function(){
    const filterValue=this.value.toLowerCase();

    filterValues.innerText=filterValue;
    filterChip.classList.add("selected")

    newObj[filterKey]=filterValue;
    callback(newObj);
  })
}

export default filter;