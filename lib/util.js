const colors = ["red", "blue", "unoccupied"];

const eachHTMLCell = function (gameBoard, callback) {
  gameBoard.grid.forEach( (row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      let htmlCell = document.getElementById(`${rowIdx}-${colIdx}`);
      callback(htmlCell);
    });
  });
};

export const populateHTML = function (gameBoard, htmlGrid) {
  gameBoard.grid.forEach( (row, rowIdx) => {
    let htmlRow = htmlGrid.insertRow();
    htmlRow.id = rowIdx;
    row.forEach( (cell, colIdx) => {
      let htmlCell = htmlRow.insertCell();
      htmlCell.id = `${rowIdx}-${colIdx}`;
      htmlCell.innerHTML = cell.count;
      htmlCell.classList.add(cell.color);

      if (cell.city) {
        if (cell.king) {
          htmlCell.classList.add('king');
        } else {
          htmlCell.classList.add('city');
        }
      } else if (cell.mountain) {
        htmlCell.classList.add('mountain');
      }
    });
  });
};

// refactor this to use eachHTMLCell
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

export const unselectOtherCells = function (board) {
  eachHTMLCell(board, (htmlCell) => (htmlCell.classList.remove('selected')));
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
