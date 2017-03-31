import Command from './command';
import { getNextCoordinates } from './util';

class Adversary {
  constructor(board) {
    this.board = board;
    this.king = board.cities.filter(cell => cell.king && cell.color === 'blue');
    this.moves = [];
    this.mode = 'explore';
  }

  nextMove() {
    this.mode === 'explore' ? this.explore() : this.attack();
    return this.moves.shift();
  }

  explore() {
    // pick a random direction, and go as far as you can in that direction, starting from king
    // TODO DON'T RUN INTO A CITY THOUGH

    if (this.canSeePlayer()) {
      this.moves = [];
      this.mode = 'attack';
      this.attack();
    } else if (this.moves.length === 0) {
      let newMoves = [];

      this.moves = this.moves.concat(newMoves);
    }
  }

  attack() {
    // send armies at player squares.  naively follow back to user.
  }

  kill() {
    // once adversary has seen the playerKing, send armies directly to enemy king.
  }

  canSeePlayer() {
    
  }
}

export default Adversary;
