import Command from './command';

class Cursor {
  constructor(board) {
    this.board = board;
    this.moves = [];
  }

  move(direction) {
    let currentHTMLCell = document.getElementsByClassName('selected')[0];
    let currentCell = this.board.findCell(currentHTMLCell.id);
    let nextHTMLCell = this.getNextHTMLCell(currentHTMLCell.id, direction);

    currentHTMLCell.classList.remove('selected');


    nextHTMLCell.classList.add('selected');
    this.moves.push(new Command(currentCell, direction));
    console.log(this.moves);
  }

  clearMoves() {
    this.moves = [];
  }

  getNextHTMLCell(id, direction) {
    let nextId;
    let coordinates = id.split('-').map(char => parseInt(char));

    switch (direction) {
      case 'up':
        nextId = `${coordinates[0]-1}-${coordinates[1]}`;
        break;
      case 'down':
        nextId = `${coordinates[0]+1}-${coordinates[1]}`;
        break;
      case 'left':
        nextId = `${coordinates[0]}-${coordinates[1]-1}`;
        break;
      case 'right':
        nextId = `${coordinates[0]}-${coordinates[1]+1}`;
        break;
      default:
        console.log('Invalid Move');
    }

    return document.getElementById(nextId);
  }
}

export default Cursor;
