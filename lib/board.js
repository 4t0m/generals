import Cell from './cell';
import { City, Mountain, King } from './special_cells';
import { shuffle } from './util';

class Board {
  constructor() {
    this.grid = [];
    this.populateBoard();
    this.kings = this.allCells().filter(cell => cell.king);
    this.cities = this.cities();
  }

  populateBoard() {
    // create an array with all cities, mountains, and cells
    let allCells = [];

     for (var i = 0; i < 80; i++) {
       allCells.push(new Cell());
     }

     for (var j = 0; j < 10; j++) {
       allCells.push(Mountain);
     }

     for (var k = 0; k < 8; k++) {
       allCells.push(new City());
     }

     allCells.push(new King('red'));
     allCells.push(new King('blue'));

    // shuffle array
    shuffle(allCells);

    // iterate through shuffled array and push things into the grid
    for (var rowIdx = 0; rowIdx < 10; rowIdx++) {
      let row = [];
      for (var colIdx = 0; colIdx < 10; colIdx++) {
        row.push(allCells.pop());
      }

      this.grid.push(row);
    }
  }

  allCells() {
    return this.grid.reduce( (row1, row2) => row1.concat(row2));
  }

  cities() {
    return this.allCells().filter(cell => cell.city);
  }

  capturedTerritory () {
    return this.allCells().filter(cell => cell.color !== 'unoccupied');
  }

  findCell(id) {
    return this.allCells().find(cell => cell.id === id);
  }

  winner() {
    if (this.kings[0].color === this.kings[1].color) {
      return this.kings[0].color;
    }
  }

  borderingCells(coordinates) {
    
  }
}


export default Board;
