import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableHeader } from './TableHeader';
import { TableCell } from './TableCell';
import Field from '../utils/Field';
import Column from '../utils/Column';

export class TableColumn extends Component {
  originalRowColumn = new Column('Original row #', 'integer', -1)

  // render column headers
  // if render first column (column -1), show original row # label
  renderColumnHeader() {
    const { columns, columnNumber, handleColumnClick, setColumnSortInfo, sortInfo, filterInfo } = this.props;
    if (columnNumber !== -1) {
      return <TableHeader
        column={columns[columnNumber]}
        handleColumnClick={handleColumnClick}
        setColumnSortInfo={setColumnSortInfo}
        sortInfo={sortInfo}
        filterInfo={filterInfo}
      />
    }
    return <TableHeader
      column={this.originalRowColumn}
      handleColumnClick={handleColumnClick}
      setColumnSortInfo={setColumnSortInfo}
      sortInfo={sortInfo}
      filterInfo={filterInfo}
    />
  }

  // render column field values
  // if render first column (column -1), show original row #
  renderColumnCells() {
    const { columns, rows, columnNumber, fullRowNumbers } = this.props;
    if (columnNumber !== -1) {
      return rows.map((row, rowNumber) => {
        return (
          <TableCell
            field={row[columnNumber]}
            key={row[columnNumber].row}
            lastRow={rowNumber === rows.length - 1}
            lastColumn={columnNumber === columns.length - 1}
            column={columns[columnNumber]}
            rowNumber={rowNumber}
            fullRowNumbers={fullRowNumbers}
          />
        )
      })
    }

    return rows.map((row, rowNumber) => {
      return (
        <TableCell
          field={new Field(row[1].row, row[1].row, -1)}
          key={row[1].row}
          lastRow={rowNumber === rows.length - 1}
          lastColumn={false}
          column={this.originalRowColumn}
          rowNumber={rowNumber}
          fullRowNumbers={fullRowNumbers}
        />
      );
    })
  }

  render() {
    return (
      <div className="table-column">
        {this.renderColumnHeader()}
        {this.renderColumnCells()}
      </div>
    );
  }
}

TableColumn.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Field).isRequired).isRequired).isRequired,
  columns: PropTypes.arrayOf(PropTypes.instanceOf(Column).isRequired).isRequired,
  columnNumber: PropTypes.number.isRequired,
  setColumnSortInfo: PropTypes.func.isRequired,
  sortInfo: PropTypes.object.isRequired,
  filterInfo: PropTypes.object.isRequired,
  fullRowNumbers: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};