import Game from './game';
import Board from './board';
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
key('up', () => cursor.move('up'));
key('s', () => cursor.move('down'));
key('down', () => cursor.move('down'));
key('a', () => cursor.move('left'));
key('left', () => cursor.move('left'));
key('d', () => cursor.move('right'));
key('right', () => cursor.move('right'));

setInterval( (() => updateHTML(board)), 500);

let infoBox = document.getElementById('about-game');
let winBox = document.getElementById('win-modal');

function openInfo(){
  game.removeIntervals();
  infoBox.classList.remove("is-hidden");
}

function closeInfo(){
  if (!board.winner()) {
    game.startIntervals();
   }
  infoBox.classList.add("is-hidden");
}

function closeWin(){
  winBox.classList.add("is-hidden");
}

function playAgain() {
  board.reset();
  game.removeIntervals();
  game = new Game(board);
  cursor = game.cursor;

  while (htmlGrid.firstChild) {
    htmlGrid.removeChild(htmlGrid.firstChild);
  }

  populateHTML(board, htmlGrid);
  winBox.classList.add("is-hidden");
  infoBox.classList.add("is-hidden");
}


let aboutButton = document.getElementById("info");
aboutButton.addEventListener("click", openInfo);
let closeAboutButton = document.getElementById('quit-button-info');
closeAboutButton.addEventListener("click", closeInfo);
let closeWinButton = document.getElementById('quit-button');
closeWinButton.addEventListener("click", closeWin);
let newGameButton = document.getElementById("play-button-info");
newGameButton.addEventListener("click", playAgain);
let playAgainButton = document.getElementById("play-button");
playAgainButton.addEventListener("click", playAgain);
