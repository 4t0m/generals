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
      htmlCell.classList.add(cell.color);

      if (cell.mountain) {
        htmlCell.classList.add('mountain');
      } else {
        cell.id = htmlCell.id;
        if (cell.king) {
          htmlCell.innerHTML = cell.count;
          htmlCell.classList.add('king');
          if (htmlCell.classList.contains('red')) {
            htmlCell.classList.add('selected');
          }
        } else if (cell.city) {
          htmlCell.innerHTML = cell.count;
          htmlCell.classList.add('city');
        }
      }
    });
  });
};

// refactor this to use eachHTMLCell
export const updateHTML = function (gameBoard) {
  gameBoard.grid.forEach( (row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      let htmlCell = document.getElementById(`${rowIdx}-${colIdx}`);
      if (!cell.mountain) {
        if (cell.color !== 'unoccupied') {
          htmlCell.innerHTML = cell.count;
        }
        colors.forEach((color) => htmlCell.classList.remove(color));
        htmlCell.classList.add(cell.color);
      }

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

export const getNextCoordinates = function (id, direction) {
    let nextId;
    let coordinates = id.split('-').map(char => parseInt(char));

    switch (direction) {
      case 'up':
        return [coordinates[0]-1, coordinates[1]];
      case 'down':
        return [coordinates[0]+1, coordinates[1]];
      case 'left':
        return [coordinates[0], coordinates[1]-1];
      case 'right':
        return [coordinates[0], coordinates[1]+1];
      default:
        console.log('Invalid Move');
    }
  };
