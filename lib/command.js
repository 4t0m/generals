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

      // TODO remove fog from adjacent pieces
      if (this.cell.color === 'red') {
        this.removeFog();
      }
    }
  }

  removeFog() {
    // get all htmlCells adjacent to the nextHTMLCell, and remove fog class
    // actually, just get normal cells, call reveal on them, and let update do
    // the work of removing/applying the fog
  }
}

export default Command;
