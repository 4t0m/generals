import Game from './game';
import Board from './board';
// import Cursor from './cursor';
import { populateHTML, updateHTML, unselectOtherCells } from './util';

let board = new Board();
let game = new Game(board);
let cursor = game.cursor;
let htmlGrid = document.getElementById("grid");

populateHTML(board, htmlGrid);

function selectCell(e) {
    if (e.target !== e.currentTarget) {
        let cell = e.target;
        if (!cell.classList.contains('selected')) {
          // TODO: instead, store the previously selected cell and just remove it from that
          unselectOtherCells(board);
          cell.classList.add('selected');
        }
    }
    e.stopPropagation();
}

htmlGrid.addEventListener("click", selectCell);

key('q', () => cursor.clearMoves());
key('w', () => cursor.move('up'));
key('s', () => cursor.move('down'));
key('a', () => cursor.move('left'));
key('d', () => cursor.move('right'));

setInterval( (() => updateHTML(board)), 500);
