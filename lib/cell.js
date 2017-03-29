class Cell {
  constructor() {
    this.color = "unoccupied";
    this.count = 0;
    this.isHidden = false;
  }

  capture(color, count) {
    this.color = color;
    this.count = this.count - count;
  }

  generateTroops() {
    this.count++;
  }

  reveal() {
    this.isHidden = false;
  }
}

export default Cell;
