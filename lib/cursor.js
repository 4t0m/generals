import Command from './command';

class Cursor {
  constructor(board) {
    this.board = board;
    this.moves = [];
  }

  move(direction) {
    let currentHTMLCell = document.getElementsByClassName('selected')[0];
    let nextCoordinates = this.getNextCoordinates(currentHTMLCell.id, direction);

    if(nextCoordinates.every(coord => coord >= 0 && coord <= 9)) {
      let currentCell = this.board.findCell(currentHTMLCell.id);
      let nextHTMLCell = document.getElementById(nextCoordinates.join('-'));

      currentHTMLCell.classList.remove('selected');
      nextHTMLCell.classList.add('selected');

      if (currentCell) {
        // TODO Add direction class to the corresponding htmlCell
        this.moves.push(new Command(currentCell, nextCoordinates, direction));
      }
    }
  }

  clearMoves() {
    this.moves = [];
  }

  nextMove() {
    if (this.moves.length === 0) {
      return false;
    }

    while (this.moves[0].cell.color !== 'red' || this.moves[0].cell.count < 2) {
      // TODO remove the direction class from the corresponding htmlCell
      this.moves.shift();
      if (this.moves.length === 0) {
        return false;
      }
    }

    return this.moves.shift();
  }

  getNextCoordinates(id, direction) {
    let nextId;
    let coordinates = id.split('-').map(char => parseInt(char));

    switch (direction) {
      case 'up':
        return [coordinates[0]-1, coordinates[1]];
      case 'down':
        return [coordinates[0]+1, coordinates[1]];
      case 'left':
        return [coordinates[0], coordinates[1]-1];
      case 'right':
        return [coordinates[0], coordinates[1]+1];
      default:
        console.log('Invalid Move');
    }
  }
}

export default Cursor;
