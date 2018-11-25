export function getStringColumnMean(rows, column) {
  let totalLength = 0;
  let totalRows = rows.length;
  for (let row of rows) {
    totalLength += row[column.columnNumber].value.length;
  }
  return totalLength / totalRows;
}

export function getStringColumnRange(rows, column) {
  let longest = 0;
  let shortest = 0;
  let totalRows = rows.length;
  for (let row of rows) {
    const strLength = row[column.columnNumber].value.length
    if (shortest > strLength) {
      shortest = strLength;
    }
    if (longest < strLength) {
      longest = strLength;
    }
  }
  return longest - shortest;
}

export function getNumberColumnSum(rows, column) {
  let total = 0;
  for (let row of rows) {
    const rowVal = column.columnNumber === -1 ? row[1].row : row[column.columnNumber].value;
    total += rowVal;
  }
  return total;
}

export function getNumberColumnMean(rows, column) {
  let total = 0;
  for (let row of rows) {
    const rowVal = column.columnNumber === -1 ? row[1].row : row[column.columnNumber].value;
    total += rowVal;
  }
  return total / rows.length;
}

export function getNumberColumnRange(rows, column) {
  let largest = 0;
  let smallest = 0;
  let totalRows = rows.length;
  for (let row of rows) {
    const rowVal = column.columnNumber === -1 ? row[1].row : row[column.columnNumber].value;
    if (smallest > rowVal) {
      smallest = rowVal;
    }
    if (largest < rowVal) {
      largest = rowVal;
    }
  }
  return largest - smallest;
}