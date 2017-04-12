import Cursor from './cursor';
import Adversary from './adversary';

class Game {
  constructor(board) {
    this.board = board;
    this.cursor = new Cursor(board);
    this.adversary = new Adversary(board);

    this.startIntervals();
  }


  iterateMovement() {
    let userCommand = this.cursor.nextMove();
    if (userCommand) {
      userCommand.execute(this.board);
      this.board.revealNeighbors(userCommand.cell);
    }

    let adversaryCommand = this.adversary.nextMove();
    if (adversaryCommand) {
      adversaryCommand.execute(this.board);
    }

    //TODO this is terrible!  it ends the game before you actually take the enemy piece
    if (this.board.winner()) {
      this.endGame(this.board.winner());
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

  startIntervals() {
    this.movementInterval = setInterval(this.iterateMovement.bind(this), 500);
    this.cityInterval = setInterval(this.iterateCityGeneration.bind(this), 1000);
    this.territoryInterval = setInterval(this.iterateTerritoryGeneration.bind(this), 25000);
  }

  removeIntervals() {
    clearInterval(this.movementInterval);
    clearInterval(this.cityInterval);
    clearInterval(this.territoryInterval);
  }

  endGame(winner) {
    this.removeIntervals();

    setTimeout(() => {
      let winModal = document.getElementById('win-modal');
      let winMessage = document.getElementById('win-message');
      let playButton = document.getElementById('play-button');
      let quitButton = document.getElementById('play-button');
      let content = winner === 'red' ? "Congrats! You win!" : "Sorry, want to try again?"


      winModal.classList.remove('is-hidden');
      winMessage.innerHTML = content;
    }, 10)

  }

}

export default Game;
