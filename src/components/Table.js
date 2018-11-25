import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableColumn } from './TableColumn';
import Field from '../utils/Field';
import Column from '../utils/Column';

export class Table extends Component {

  render() {
    const { columns, rows, handleSelectedColumn, setColumnSortInfo, sortInfo, filterInfo, fullRowNumbers } = this.props;
    return (
      <div className="table">
        <section className="table-body" ref={this.handleRef}>
          <TableColumn
            key={-1}
            columnNumber={-1}
            columns={columns}
            rows={rows}
            handleColumnClick={handleSelectedColumn}
            setColumnSortInfo={setColumnSortInfo}
            sortInfo={sortInfo}
            filterInfo={filterInfo}
            fullRowNumbers={fullRowNumbers}
          />
          {columns.map((col, colNum) => {
            return (
              <TableColumn
                key={colNum}
                columnNumber={colNum}
                columns={columns}
                rows={rows}
                handleColumnClick={handleSelectedColumn}
                setColumnSortInfo={setColumnSortInfo}
                sortInfo={sortInfo}
                filterInfo={filterInfo}
                fullRowNumbers={fullRowNumbers}
              />
            )
          })}
        </section>
      </div >
    );
  }
}

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Field).isRequired).isRequired).isRequired,
  columns: PropTypes.arrayOf(PropTypes.instanceOf(Column).isRequired).isRequired,
  handleSelectedColumn: PropTypes.func.isRequired,
  setColumnSortInfo: PropTypes.func.isRequired,
  sortInfo: PropTypes.object.isRequired,
  filterInfo: PropTypes.object.isRequired,
  fullRowNumbers: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};