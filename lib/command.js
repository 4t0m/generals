class Command {
  constructor(cell, nextCoordinates){
    this.cell = cell;
    this.nextCoordinates = nextCoordinates;
  }

  execute(board) {
    let nextCell = board.findCell(this.nextCoordinates.join('-'));
    this.cell.capture(nextCell);
    // debugger;
  }
}

export default Command;
