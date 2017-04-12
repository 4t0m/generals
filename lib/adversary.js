import Command from './command';
import MoveTree from './move_tree';
import { shuffle, getNextCoordinates } from './util';
import TreeNode from './tree_node';

class Adversary {
  constructor(board) {
    this.board = board;
    this.king = board.cities().find(cell => cell.king && cell.color === 'blue');
    this.moves = [];
    this.seen = false;
    this.playerKing = null;
    this.strategy = 'explore';
    this.contactCell = null;
  }

  nextMove() {
    this.addMoves();
    if (this.moves.length === 0) {
      return false;
    }

    while (this.moves[0].cell.color !== 'blue' || this.moves[0].cell.count < 2) {
      this.moves.shift();
      if (this.moves.length === 0) {
        return false;
      }
    }

    return this.moves.shift();
  }

  addMoves() {
    this.updateStrategy();
    switch (this.strategy) {
      case 'explore':
        this.explore();
        break;
      case 'attack':
        this.attack();
        break;
      case 'defend':
        this.defend();
        break;
      case 'kill':
        this.kill();
        break;
      default:
        console.log("Invalid movement strategy");
    }
  }

  updateStrategy() {
    this.seenByPlayer();
    this.canSeePlayer();

    if (this.seen) {
      if (this.strategy !== 'defend') {
        this.moves = [];
      }
      this.strategy = 'defend';
    } else if (this.playerKing) {
      if (this.strategy !== 'kill') {
        this.moves = [];
      }
      this.strategy = 'kill';
    } else if (this.contactCell) {
      if (this.strategy !== 'attack') {
        this.moves = [];
      }
      this.strategy = 'attack';
    } else {
      if (this.strategy !== 'explore') {
        this.moves = [];
      }
      this.strategy = 'explore';
    }
  }

  explore() {
    // TODO Have it actively try to take cities when it has a lot of troops
    if (this.moves.length === 0) {
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
    !(nextCell.city && nextCell.color !== 'blue' && cell.count + 2 < nextCell.count));
  }

  attack() {
    if (this.moves.length === 0) {
      let moveTree = new MoveTree(this.largestArmy(), this.board);
      let attackVector = moveTree.findPath(this.contactCell);

      this.moves = attackVector;
    }
  }

  kill() {
    if (this.moves.length === 0) {
      let moveTree = new MoveTree(this.largestArmy(false), this.board);
      this.moves = moveTree.findPath(this.playerKing);
    }
  }


  defend() {
    if (this.moves.length === 0 && this.board.blueTerritory().length > 1) {
      let moveTree = new MoveTree(this.largestArmy(false), this.board);
      this.moves = moveTree.findPath(this.king);
    }
  }



  canSeePlayer() {
    // TODO eventually return a random cell that works, not just the first one

    let redCell;
    this.board.blueTerritory().forEach(cell => {
      this.board.visibleCells(cell).forEach(otherCell => {
        console.log(otherCell);
        if (otherCell.color === 'red') {
          redCell = otherCell;
          if (otherCell.king) {
            this.playerKing = otherCell;
          }
        }
      });
    });

    this.contactCell = redCell;
    return redCell;
  }


  seenByPlayer() {
    this.board.visibleCells(this.king).forEach(otherCell => {
      if (otherCell.color === 'red') {
        this.seen = true;
      }
    });
  }

  largestArmy(includeKing = true) {
    let currentLargest;
    this.board.blueTerritory().forEach(cell => {
      if (!currentLargest || cell.count > currentLargest.count) {
        if (!cell.king || includeKing) {
          currentLargest = cell;
        }
      }
    });

    return currentLargest;
  }
}

export default Adversary;
