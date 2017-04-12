class Cell {
  constructor() {
    this.color = "unoccupied";
    this.count = 0;
    this.isHidden = false;
    this.id = null;
  }

  capture(otherCell) {
    if (this.count > 1) {
      if (this.color === otherCell.color) {
        otherCell.count = otherCell.count + this.count - 1;
      } else {
        if (this.count - 1 > otherCell.count) {
          otherCell.count = this.count - otherCell.count - 1;
          otherCell.color = this.color;
        } else {
          otherCell.count = otherCell.count - (this.count - 1);
        }
      }
      this.count = 1;
    }
  }

  generateTroops() {
    this.count++;
  }

  reveal() {
    this.isHidden = false;
  }

  hide() {
    this.isHidden = true;
  }
}

export default Cell;
