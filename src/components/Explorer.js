import React, { Component } from 'react';
import { Table } from './Table';
import Csv from '../utils/Csv';
import PropTypes from 'prop-types';
import { Paginater } from './Paginater';
import { ColumnFilterController } from './ColumnFilterController';
import { getFilteredRows } from '../utils/filterHelper';
import { getSortedRows } from '../utils/sortHelper';
import { ColumnSortController } from './ColumnSortController';
import { ColumnStatistics } from './ColumnStatistics';

class Explorer extends Component {
  state = {
    pageNum: 1,
    totalPages: null,
    startingRow: 0,
    endingRow: 10,
    sortedRows: [],
    selectedColumn: null,
    filterInfo: {
      filterBy: null,
      filterValue: null,
      selectedColumn: null,
    },
    filteredRows: [],
    useFilteredRows: false,
    sortInfo: {
      sortBy: '',
      selectedColumn: null,
    },
    useSortedRows: false,
  };

  componentWillMount() {
    // get total pages
    const rowCount = this.props.csv.rows.length;
    const totalPages = Math.ceil(rowCount / 10);
    this.setState({ totalPages });
  }

  setCurrentPage(pageNum, startingRow, endingRow) {
    this.setState({ pageNum, startingRow, endingRow });
  }

  // set new selected column and clear filters
  handleSelectedColumn(selectedColumn) {
    if (this.state.selectedColumn && (selectedColumn.name === this.state.selectedColumn.name)) {
      console.log('Column already selected', selectedColumn);
      return;
    }
    this.setState({
      selectedColumn,
      useFilteredRows: false,
      filterInfo: {
        filterBy: null,
        filterValue: null,
        selectedColumn
      }
    });
  }

  setColumnFilterInfo(filterInfo) {
    const { sortedRows, selectedColumn, useSortedRows } = this.state;
    const rows = useSortedRows ? sortedRows : this.props.csv.rows;
    const filteredRows = getFilteredRows(rows, filterInfo, selectedColumn);
    const useFilteredRows = (filterInfo.filterBy && filterInfo.filterValue);
    const rowCount = useFilteredRows ? filteredRows.length : rows.length;
    const totalPages = Math.ceil(rowCount / 10);

    this.setState({
      filterInfo,
      startingRow: 0,
      endingRow: 10,
      pageNum: 1,
      filteredRows,
      useFilteredRows,
      totalPages,
    });
  }

  setColumnSortInfo(sortInfo) {
    const { useFilteredRows, filteredRows } = this.state;
    const useSortedRows = !!sortInfo.sortBy;
    const rows = useFilteredRows ? filteredRows : this.props.csv.rows;
    const sortedRows = useSortedRows ? getSortedRows(rows, sortInfo.selectedColumn, sortInfo.sortBy) : [];
    const rowCount = sortedRows.length;
    const totalPages = Math.ceil(rowCount / 10);

    this.setState({
      sortInfo,
      useSortedRows,
      sortedRows,
      startingRow: 0,
      endingRow: 10,
      pageNum: 1,
      totalPages,
      filteredRows: useFilteredRows ? sortedRows : filteredRows,
    })
  }

  render() {
    const { csv } = this.props;
    const { startingRow, endingRow, pageNum, totalPages, selectedColumn, filterInfo, filteredRows, sortedRows, useFilteredRows, sortInfo, useSortedRows } = this.state;
    const rows = useFilteredRows ? filteredRows : useSortedRows ? sortedRows : csv.rows;
    const rowsToRender = rows.slice(startingRow, endingRow);
    let fullRowNumbers = [];
    for (let r = 0; r < rowsToRender.length; r++) {
      fullRowNumbers.push(r + startingRow + 1);
    }

    return (
      <div className="explorer">
        <ColumnSortController
          selectedColumn={selectedColumn}
          setColumnSortInfo={this.setColumnSortInfo.bind(this)}
          sortInfo={sortInfo}
        />
        <ColumnFilterController
          selectedColumn={selectedColumn}
          filterInfo={filterInfo}
          setColumnFilterInfo={this.setColumnFilterInfo.bind(this)}
        />
        <ColumnStatistics
          selectedColumn={selectedColumn}
          rows={rows}
        />
        <Paginater
          rows={rows}
          setCurrentPage={this.setCurrentPage.bind(this)}
          endingRow={endingRow}
          startingRow={startingRow}
          pageNum={pageNum}
          totalPages={totalPages}
        />
        <Table
          rows={rowsToRender}
          columns={csv.columns}
          handleSelectedColumn={this.handleSelectedColumn.bind(this)}
          setColumnSortInfo={this.setColumnSortInfo.bind(this)}
          sortInfo={sortInfo}
          filterInfo={filterInfo}
          fullRowNumbers={fullRowNumbers}
        />
      </div>
    );
  }
}

Explorer.propTypes = {
  csv: PropTypes.instanceOf(Csv),
}

export default Explorer;
