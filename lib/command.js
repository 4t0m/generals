class Command {
  constructor(cell, nextCoordinates, direction){
    this.cell = cell;
    this.nextCoordinates = nextCoordinates;
    this.direction = direction;
  }

  execute(board) {
    let nextCell = board.grid[this.nextCoordinates[0]][this.nextCoordinates[1]];
    if (this.cell && this.cell.color !== 'unoccupied' && !nextCell.mountain) {
      // TODO remove direction class from currentHTMLCell
      this.cell.capture(nextCell);
    }
  }
}

export default Command;
