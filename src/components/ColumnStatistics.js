// count and range; for  numerical columns,
// also display sum, arithmetic mean, and any other interesting statistics of your choice.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from '../utils/Column';
import Field from '../utils/Field';
import { getStringColumnMean, getStringColumnRange, getNumberColumnMean, getNumberColumnRange, getNumberColumnSum } from '../utils/statisticHelper';

export class ColumnStatistics extends Component {

  renderColumnStatistics() {
    if (!this.props.selectedColumn) {
      return null;
    }
    const { rows, selectedColumn } = this.props;

    if (selectedColumn.type === 'string') {
      return (
        <div className="statistics">
          <div className="statistic">Number of {selectedColumn.name}'s: {rows.length}</div>
          <div className="statistic">Mean: {getStringColumnMean(rows, selectedColumn)}</div>
          <div className="statistic">Range: {getStringColumnRange(rows, selectedColumn)}</div>
        </div>
      )
    }

    return (
      <div className="statistics">
        <div className="statistic">Number of {selectedColumn.name}'s: {rows.length}</div>
        <div className="statistic">Mean: {getNumberColumnMean(rows, selectedColumn)}</div>
        <div className="statistic">Range: {getNumberColumnRange(rows, selectedColumn)}</div>
        <div className="statistic">Sum: {getNumberColumnSum(rows, selectedColumn)}</div>
      </div>
    )

  }

  render() {
    return this.props.selectedColumn ? (
      <div className="statistics-container">
        <h3>Column Statistics</h3>
        {this.renderColumnStatistics.call(this)}
      </div >
    ) : null;
  }
}

ColumnStatistics.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Field).isRequired).isRequired),
  selectedColumn: PropTypes.instanceOf(Column),
};