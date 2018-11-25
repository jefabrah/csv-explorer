import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from '../utils/Field';

export class Paginater extends Component {

  handlePageUp() {
    const { pageNum, endingRow, totalPages, startingRow, rows, setCurrentPage } = this.props;
    console.log('Page up');
    let nextEndingRow = endingRow + 10;
    let nextStartingRow = endingRow;
    let nextPageNum = pageNum + 1;
    if (pageNum === totalPages) {
      console.log('Already on last page');
      return;
    }
    // handle sigle page csv
    if (10 >= rows.length) {
      console.log('Single page CSV');
      return;
    }
    // handle last page
    if (nextEndingRow >= rows.length) {
      nextEndingRow = rows.length;
      nextStartingRow = endingRow;
      // if only one item left
      if (nextStartingRow === nextEndingRow) {
        nextEndingRow = nextEndingRow + 1;
      }
    }
    console.log("starting:", startingRow);
    console.log("ending:", endingRow);
    console.log("nextStarting:", nextStartingRow);
    console.log("nextEnding:", nextEndingRow);
    setCurrentPage(nextPageNum, nextStartingRow, nextEndingRow);
  }

  handlePageDown() {
    const { pageNum, endingRow, startingRow, setCurrentPage } = this.props;
    const comingFromPageWithoutTenItems = ((endingRow - startingRow) < 10);
    let nextEndingRow = endingRow - 10;
    let nextStartingRow = nextEndingRow - 10;
    let nextPageNum = pageNum - 1;
    // coming from a page without 10 items (a last page if rows are not multiples of 10)
    if (comingFromPageWithoutTenItems) {
      console.log('Coming from page with less than 10 items');
      nextEndingRow = startingRow;
      nextStartingRow = nextEndingRow - 10;
      console.log("starting:", startingRow);
      console.log("ending:", endingRow);
      console.log("nextStarting:", nextStartingRow);
      console.log("nextEnding:", nextEndingRow);
      setCurrentPage(nextPageNum, nextStartingRow, nextEndingRow);
      return;
    }
    if (pageNum === 1) {
      console.log('Already on first page');
      return;
    }
    console.log("starting:", startingRow);
    console.log("ending:", endingRow);
    console.log("nextStarting:", nextStartingRow);
    console.log("nextEnding:", nextEndingRow);
    setCurrentPage(nextPageNum, nextStartingRow, nextEndingRow);
  }

  render() {
    const { pageNum, totalPages } = this.props;
    return (
      <div className="paginater">
        <p className="page-info">
          Page {pageNum} of {totalPages}
        </p>
        <div className="paginater-controls">
          <button
            className="fa fa-chevron-left page-down"
            onClick={this.handlePageDown.bind(this)}
          />
          <button
            className="fa fa-chevron-right page-up"
            onClick={this.handlePageUp.bind(this)}
          />
        </div>
      </div >
    );
  }
}

Paginater.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Field))).isRequired,
  startingRow: PropTypes.number.isRequired,
  endingRow: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};