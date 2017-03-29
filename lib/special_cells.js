import Cell from './cell';

class City extends Cell {
  constructor() {
    super();
    this.city = true;
  }
}

class King extends City {
  constructor(color) {
    super();
    this.king = true;
    this.color = color;
  }
}

let Mountain = new Cell();
Mountain.mountain = true;
Object.freeze(Mountain);



export { City, Mountain, King };
