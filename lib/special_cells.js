import Cell from './cell';

class City extends Cell {
  constructor() {
    super();
    this.city = true;
    this.count = 40;
  }
}

class King extends City {
  constructor(color) {
    super();
    this.king = true;
    this.color = color;
    this.count = 1;
  }
}

let Mountain = new Cell();
Mountain.mountain = true;
Object.freeze(Mountain);



export { City, Mountain, King };
