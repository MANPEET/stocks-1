export const gridInit = function(gridContainer){
  const columns=[];
  const columnsHeight=[];

  const columnCount=Number(getComputedStyle(gridContainer).getPropertyValue("--column-count"));

  for (let i = 0; i < columnCount; i++) {
    const column=document.createElement("div");
    column.classList.add("column")
    gridContainer.appendChild(column)
    columns.push(column)
    columnsHeight.push(0)
  }

  return {columns,columnsHeight}
}

export const updateGrid= function(card, columnsHeight, columns) {
    const minHeight=Math.min(...columnsHeight);
    const minIndex=columnsHeight.indexOf(minHeight);
  
    columns[minIndex].appendChild(card);
    columnsHeight[minIndex]=columns[minIndex].offsetHeight;
}

export default { gridInit, updateGrid };
