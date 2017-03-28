class Cell {
  constructor(canPass = true) {
    this.color = null;
    this.count = 0;
    this.isHidden = true;
    this.canPass = canPass;
  }

  capture(color, count) {
    this.color = color;
    this.count = count;
  }

  generateTroops() {
    this.count++;
  }

  reveal() {
    this.isHidden = false;
  }
}

export default Cell;
