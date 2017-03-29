import Game from './game';
import Board from './board';
import { updateHTML } from './util';

let board = new Board();
let game = new Game(board);

let htmlGrid = document.getElementById("grid");

// perhaps take out code that mo1difies elements and move it to a util file"
board.grid.forEach( (row, rowIdx) => {
  let htmlRow = htmlGrid.insertRow();
  htmlRow.id = rowIdx;
  row.forEach( (cell, colIdx) => {
    let htmlCell = htmlRow.insertCell();
    htmlCell.id = `${rowIdx}-${colIdx}`;
    htmlCell.innerHTML = colIdx;
    htmlCell.classList.add(cell.color);

    if (cell.city) {
      htmlCell.classList.add('city');
    } else if (cell.mountain) {
      htmlCell.classList.add('mountain');
    }
  });
});

// install a click handler on the grid, (cursor?)
// https://www.kirupa.com/html5/handling_events_for_many_elements.htm

setInterval( (() => updateHTML(board)), 1000);
