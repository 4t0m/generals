class Cell {
  constructor(mountain = false) {
    this.color = "unoccupied";
    this.count = 0;
    this.isHidden = false;
    this.mountain = mountain;
    this.city = false;
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
