import Column from "./Column";
import Field from "./Field";

export default class Csv {
  constructor(csvString) {
    const { columns, rows } = this.parseCsv(csvString);
    this.columns = columns;
    this.rows = rows;
  }

  parseCsv(csvString) {
    console.log('csvString:', csvString);
    // get rows
    const rows = csvString.trim().split('\n');
    console.log('Unformatted rows:', rows);
    // parse the csv string and create Field
    // and Column instances
    const t0 = performance.now();
    const columns = [];
    const formattedRows = rows
      .map((row, rowNumber) => {
        return row.split(',')
          .map((field, columnNumber) => {
            const fieldInfo = {
              type: 'string',
              value: field,
            };
            // create header names in columns
            if (rowNumber === 0) {
              columns[columnNumber] = field;
              return field;
            }
            // check field type: 'string','integer','float'
            // and parse int or float 
            if (!isNaN(parseInt(field))) {
              const parsedInt = parseInt(field);
              const parsedFloat = parseFloat(field);
              if (parsedInt === parsedFloat) {
                fieldInfo.value = parsedInt;
                fieldInfo.type = 'integer';
              }
              else {
                fieldInfo.value = parsedFloat;
                fieldInfo.type = 'float';
              }
            }
            // create Column with column type and header names from first row
            if (rowNumber === 1) {
              columns[columnNumber] = new Column(columns[columnNumber], fieldInfo.type, columnNumber);
            }
            return new Field(fieldInfo.value, rowNumber, columns[columnNumber]);
          })
      })
    const t1 = performance.now();
    console.log("Time parse csv: " + (t1 - t0) + " milliseconds.");
    return {
      columns,
      rows: formattedRows.slice(1)
    };
  }
}