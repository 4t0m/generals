import Game from './game';
import Board from './board';

let board = new Board();
let game = new Game(board);

let htmlGrid = document.getElementById("grid");

// perhaps take out code that modifies elements and move it to a util file"
board.grid.forEach( (row, rowIdx) => {
  let htmlRow = htmlGrid.insertRow();
  htmlRow.id = rowIdx;
  row.forEach( (cell, colIdx) => {
    let htmlCell = htmlRow.insertCell();
    htmlCell.id = `${rowIdx}-${colIdx}`;
    htmlCell.innerHTML = colIdx;
    htmlCell.classList.add("otherclass");
  });
});



// first this file iterates over the game board a ton of html elements in a table,
// giving them each ids as follows "{row}-{column}"

// okay so game is constantly updating
// and then this file iterates over each row and each column (double-nested loop)

// for each row-column (ie each cell), it grabs the relevant html element using
// jQuery and applies styling (color, type)
