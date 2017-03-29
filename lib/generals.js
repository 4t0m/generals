import Game from './game';
import Board from './board';
import { populateHTML, updateHTML, unselectOtherCells } from './util';

let board = new Board();
let game = new Game(board);
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



setInterval( (() => updateHTML(board)), 1000);
