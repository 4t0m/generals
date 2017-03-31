import Command from './command';
import { shuffle, getNextCoordinates } from './util';

class Adversary {
  constructor(board) {
    this.board = board;
    this.king = board.cities.find(cell => cell.king && cell.color === 'blue');
    this.moves = [];
    this.mode = 'explore';
  }

  nextMove() {
    this.mode === 'explore' ? this.explore() : this.attack();

    while (this.moves[0].cell.color !== 'blue' || this.moves[0].cell.count < 2) {
      this.moves.shift();
      if (this.moves.length === 0) {
        return false;
      }
    }

    return this.moves.shift();
  }

  explore() {
    if (this.canSeePlayer()) {
      this.moves = [];
      this.mode = 'attack';
      this.attack();
    } else if (this.moves.length === 0) {
      this.moves = this.moves.concat(this.search(this.king, 'up'));
      this.moves = this.moves.concat(this.search(this.king, 'down'));
      this.moves = this.moves.concat(this.search(this.king, 'left'));
      this.moves = this.moves.concat(this.search(this.king, 'right'));
    }
  }

  search(startingCell, direction, shouldContinue = true) {
    let newMoves = [];
    let cell = startingCell;

    for (var i = 0; i < 10; i++) {
      if (cell) {
        let nextCoordinates = getNextCoordinates(cell.id, direction);
        let nextCell = this.board.findCell(nextCoordinates.join('-'));

        if (this.shouldCapture(cell, nextCell)) {
          newMoves.push(new Command(cell, direction));
          cell = nextCell;
        } else if (shouldContinue) {
          let otherDirections;
          switch (direction) {
            case 'up':
            case 'down':
              otherDirections = ['left', 'right'];
              break;
            case 'left':
            case 'right':
              otherDirections = ['up', 'down'];
              break;
            default:
              console.log("Bad direction input");
          }
          let otherDirection = shuffle(otherDirections).pop();
          return newMoves.concat(this.search(cell, otherDirection, false));
        } else {
          return newMoves;
        }
      }
    }

    return newMoves;
  }

  shouldCapture(cell, nextCell) {
    return (nextCell &&
    !nextCell.mountain &&
    !(nextCell.city && (nextCell.city.color !== 'blue') && cell.count + 2 < nextCell.count));
  }

  attack() {
    // send armies at player squares.  naively follow back to user.
  }

  kill() {
    // once adversary has seen the playerKing, send armies directly to enemy king.
  }

  canSeePlayer() {
    // this.board.blueTerritory().forEach(cell => {
    //   this.board.borderingCells(cell).forEach(otherCell => {
    //     if (otherCell.color === 'red') {
    //       return true;
    //     }
    //   });
    // });
    // return false;
    return false;
  }
}

export default Adversary;
