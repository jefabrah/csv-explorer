export default class Column {
  constructor(name, type, columnNumber) {
    this.name = name;
    // column types 'integer' 'float' 'string'
    this.type = type;
    this.columnNumber = columnNumber;
  }
}