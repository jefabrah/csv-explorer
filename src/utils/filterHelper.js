export function getFilteredRows(rows, filterInfo, column) {
  if (column.type === 'string') {
    return getFilteredStringRows(rows, filterInfo, column);
  }
  return getFilteredNumberRows(rows, filterInfo, column);
}

export function getFilteredStringRows(rows, filterInfo, column) {
  if (!filterInfo.filterValue) {
    return rows;
  }
  if (filterInfo.filterBy === 'contains' ||
    !filterInfo.filterBy) {
    return rows.filter((row) => {
      const value = row[column.columnNumber].value;
      return value.toLocaleLowerCase().includes(filterInfo.filterValue.toLocaleLowerCase());
    });
  }
  if (filterInfo.filterBy === 'startWith') {
    return rows.filter((row) => {
      const value = row[column.columnNumber].value;
      return value.toLocaleLowerCase().startsWith(filterInfo.filterValue.toLocaleLowerCase());
    });
  }
}

export function getFilteredNumberRows(rows, filterInfo, column) {
  if (!filterInfo.filterValue) {
    return rows;
  }
  if (filterInfo.filterBy === 'equals' ||
    !filterInfo.filterBy) {
    return rows.filter((row) => {
      const value = column.columnNumber === -1
        ? row[1].row : row[column.columnNumber].value;

      const filterValue = column.type === 'float'
        ? parseFloat(filterInfo.filterValue)
        : parseInt(filterInfo.filterValue);
      return value === filterValue;
    });
  }
  if (filterInfo.filterBy === 'greaterThan') {
    return rows.filter((row) => {
      const value = column.columnNumber === -1
        ? row[1].row : row[column.columnNumber].value;

      const filterValue = column.type === 'float'
        ? parseFloat(filterInfo.filterValue)
        : parseInt(filterInfo.filterValue);
      return value > filterValue;
    });
  }
  if (filterInfo.filterBy === 'lessThan') {
    return rows.filter((row) => {
      const value = column.columnNumber === -1
        ? row[1].row : row[column.columnNumber].value;

      const filterValue = column.type === 'float'
        ? parseFloat(filterInfo.filterValue)
        : parseInt(filterInfo.filterValue);
      return value < filterValue;
    });
  }
}