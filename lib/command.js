import { getNextCoordinates } from './util';

class Command {
  constructor(cell, direction){
    this.cell = cell;
    this.nextCoordinates = getNextCoordinates(cell.id, direction);
    this.direction = direction;
  }

  execute(board) {
    let nextCell = board.grid[this.nextCoordinates[0]][this.nextCoordinates[1]];
    if (this.cell && this.cell.color !== 'unoccupied' && !nextCell.mountain) {
      // TODO remove direction class from currentHTMLCell (for displaying queue)
      this.cell.capture(nextCell);

    }
  }

}

export default Command;
