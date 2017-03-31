import Cell from './cell';
import { City, Mountain, King } from './special_cells';
import { shuffle } from './util';

class Board {
  constructor() {
    this.grid = [];
    this.populateBoard();
    this.kings = this.allCells().filter(cell => cell.king);
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

  capturedTerritory() {
    return this.allCells().filter(cell => cell.color !== 'unoccupied');
  }

  findCell(id) {
    return this.allCells().find(cell => cell.id === id);
  }

  winner() {
    if (document.getElementsByClassName('king red').length === 2) {
      return 'red';
    } else if (document.getElementsByClassName('king blue').length === 2) {
      return 'blue';
    } else {
      return false;
    }
  }

  blueTerritory() {
    return this.allCells().filter(cell => cell.color === 'blue');
  }

  adjacentCells(cell) {
    let coordinates = cell.id.split('-').map(char => parseInt(char));
    let coordinatePairs = [[coordinates[0]-1, coordinates[1]],
                           [coordinates[0]+1, coordinates[1]],
                           [coordinates[0], coordinates[1]-1],
                           [coordinates[0], coordinates[1]+1]]
     return coordinatePairs.filter(pair => pair.every(num => num >= 0 && num <= 9)).map(pair => this.grid[pair[0]][pair[1]])
  }

  reset() {
    this.grid = [];
    this.populateBoard();
    this.kings = this.allCells().filter(cell => cell.king);
  }
}


export default Board;
