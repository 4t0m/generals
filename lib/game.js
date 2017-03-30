import Cursor from './cursor';

class Game {
  constructor(board) {
    this.board = board;
    this.cursor = new Cursor(board);

    this.movementInterval = setInterval(this.iterateMovement.bind(this), 500);
    this.cityInterval = setInterval(this.iterateCityGeneration.bind(this), 1000);
    this.territoryInterval = setInterval(this.iterateTerritoryGeneration.bind(this), 25000);
  }


  iterateMovement() {
    let command = this.cursor.nextMove();
    if (command) {
      command.execute(this.board);
    }
    if (this.board.winner()) {
      this.endGame();
    }
  }

  iterateCityGeneration() {
    this.board.cities().forEach( (city) => {
      if (city.color !== 'unoccupied' || city.count < 40) {
        city.generateTroops();
      }
    });
  }

  iterateTerritoryGeneration() {
    this.board.capturedTerritory().forEach((cell) => cell.generateTroops());
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
