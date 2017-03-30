class Command {
  constructor(cell, nextCoordinates){
    this.cell = cell;
    this.nextCoordinates = nextCoordinates;
  }

  execute(board) {
    let nextCell = board.grid[this.nextCoordinates[0]][this.nextCoordinates[1]];
    if (this.cell && this.cell.color !== 'unoccupied' && !nextCell.mountain) {
      this.cell.capture(nextCell);
    }
  }
}

export default Command;
