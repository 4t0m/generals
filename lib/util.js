


const colors = ["red", "blue", "unoccupied"];

export const updateHTML = function (gameBoard) {
  gameBoard.grid.forEach( (row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      let htmlCell = document.getElementById(`${rowIdx}-${colIdx}`);
      htmlCell.innerHTML = cell.count;

      colors.forEach((color) => htmlCell.classList.remove(color));
      htmlCell.classList.add(cell.color);
      htmlCell.isHidden ? htmlCell.classList.add('hidden') : htmlCell.classList.remove('hidden');
    });
  });
};

export const shuffle = function (array) {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
};
