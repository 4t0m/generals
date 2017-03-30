import Cursor from './cursor';

class Game {
  constructor(board) {
    this.board = board;
    this.cursor = new Cursor(board);


    this.capturedTerritory = this.board.capturedTerritory();
    this.cities = this.board.cities();


    this.movementInterval = setInterval(this.iterateMovement.bind(this), 500);
    this.cityInterval = setInterval(this.iterateCityGeneration.bind(this), 1000);
    this.territoryInterval = setInterval(this.iterateTerritoryGeneration.bind(this), 25000);
  }


  iterateMovement() {
    if (this.cursor.hasMoves()) {
      let command = this.cursor.nextMove();
      command.execute(this.board);
    }
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
    clearInterval(this.movementInterval);
    clearInterval(this.cityInterval);
    clearInterval(this.territoryInterval);
  }

  endGame() {
    alert('x wins!');
    this.removeIntervals();
  }


}

export default Game;
