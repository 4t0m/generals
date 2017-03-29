import Cursor from './cursor';

class Game {
  constructor(board) {
    this.board = board;
    this.cursor = new Cursor();
    // I need to figure out how I want to do move queue.
    // Ideally I would only store it in one location


    // how am I going to get things into these arrays?
    this.capturedTerritory = [];
    this.cities = [];


    // set intervals for each iterator.  1x for movement,
    // 2x for city, 50x for territory + other stuff
  }


  iterateMovement() {

  }

  iterateCityGeneration() {
    this.cities.forEach( (city) => {
      if (city.color !== 'unoccupied' || city.count < 40) {
        city.generateTroops();
      }
    });
  }

  iterateTerritoryGeneration() {
    this.capturedTerritory.forEach((cell) => cell.generateTroops());
  }

  removeIntervals() {
    // remove intervals when game ends
  }
}

export default Game;
