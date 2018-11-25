export function getSortedRows(rows, selectedColumn, sortBy) {
  if (sortBy === 'ascending' || sortBy === 'descending') {
    return sortByAscDesc(rows, selectedColumn, sortBy);
  }
  if (sortBy === 'longest' || sortBy === 'shortest') {
    return sortByShortestOrLongest(rows, selectedColumn, sortBy);
  }
}

function sortByShortestOrLongest(rows, selectedColumn, shortOrLong) {
  const sortByShortestFirst = shortOrLong === 'shortest';
  const columnNum = selectedColumn.columnNumber;

  if (sortByShortestFirst) {
    return [...rows].sort((a, b) => {
      const valA = a[columnNum].value;
      const valB = b[columnNum].value;
      return valA.length - valB.length;
    });
  }

  return [...rows].sort((a, b) => {
    const valA = a[columnNum].value;
    const valB = b[columnNum].value;
    return valB.length - valA.length;
  });
}

function sortByAscDesc(rows, selectedColumn, ascOrDesc) {
  const columnNum = selectedColumn.columnNumber;
  const ascending = ascOrDesc === 'ascending';
  // sort string column
  if (selectedColumn.type === 'string') {
    return [...rows].sort((a, b) => {
      const valA = a[columnNum].value;
      const valB = b[columnNum].value;
      return ascending
        ? valA.localeCompare(valB, 'en', { sensitivity: 'base' })
        : valB.localeCompare(valA, 'en', { sensitivity: 'base' });
    })
  }

  // sort number column
  return [...rows].sort((a, b) => {
    const valA = columnNum === -1 ? a[1].row : a[columnNum].value;
    const valB = columnNum === -1 ? b[1].row : b[columnNum].value;
    if (valA === valB) {
      return 0;
    }
    return ascending ? valA - valB : valB - valA;
  });
}