import Command from './command';
import { shuffle, getNextCoordinates } from './util';
import TreeNode from './tree_search';

class Adversary {
  constructor(board) {
    this.board = board;
    this.king = board.cities().find(cell => cell.king && cell.color === 'blue');
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
    // TODO move logic for determining mode into nextMove
    if (false /*this.canSeePlayer()*/) {
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

  search(startingCell, direction, continueCount = 4) {
    let newMoves = [];
    let cell = startingCell;

    for (var i = 0; i < 10; i++) {
      if (cell) {
        let nextCoordinates = getNextCoordinates(cell.id, direction);
        let nextCell = this.board.findCell(nextCoordinates.join('-'));

        if (this.shouldCapture(cell, nextCell)) {
          newMoves.push(new Command(cell, direction));
          cell = nextCell;
        } else if (continueCount > 0) {
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
          return newMoves.concat(this.search(cell, otherDirection, continueCount - 1));
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
    !(nextCell.city && nextCell.city.color !== 'blue' && cell.count + 2 < nextCell.count));
  }

  attack() {
    // send armies at player squares.  naively follow back to user.
    // okay, so I need something that takes two cells and builds a command path between the two cells
    // after it gets to this arbitrary point of contact, it keeps taking red cells
    // when it runs out of cells on that path, it goes a randomly selected point of contact and repeats
    // when the attacking army runs out of troops, it takes the strongest available army and does the above
    // if (this.moves.length === 0) {
    //   let origin = this.largestArmy();
    //   let contactCell = this.canSeePlayer();
    //   let attackVector = findPath(origin, contactCell, this.board);
    //
    //   // once it has reached the contact point, start taking pieces at random
    //   // let currentCell = contactCell;
    //   // for (var i = 0; i < 10; i++) {
    //   //   attackVector.push(new Command)
    //   this.moves = attackVector;
    //   }
    //
    // }
  }

  kill() {
    // once adversary has seen the playerKing, send armies directly to enemy king.
    // okay, so I need something that takes two cells and builds a command path between the two cells
    // then constantly build that path between the most powerful cell and the playerKing
  }


  defend() {
    
  }

  canSeePlayer() {
    // eventually return a random cell that works, not just the first one
    this.board.blueTerritory().forEach(cell => {
      this.board.adjacentCells(cell).forEach(otherCell => {
        if (otherCell.color === 'red') {
          return cell;
        }
      });
    });
    return false;
  }


  seenByPlayer() {

  }

  largestArmy() {
    let currentLargest;
    this.board.blueTerritory.forEach(cell => {
      if (!currentLargest || cell.count > currentLargest.count) {
        currentLargest = cell;
      }
    });

    return currentLargest;
  }
}

export default Adversary;
