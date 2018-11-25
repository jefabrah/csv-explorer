export default class Field {
  constructor(value, row, column) {
    this.type = column.type;
    this.name = column.name;
    this.value = value;
    this.row = row;
  }
}