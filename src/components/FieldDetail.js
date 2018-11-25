import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from '../utils/Column';

export class FieldDetail extends Component {

  hasSortApplied() {
    const { column, isColumn, sortInfo } = this.props;
    return (isColumn && sortInfo.sortBy
      && sortInfo.selectedColumn.columnNumber === column.columnNumber);
  }

  hasFilterApplied() {
    const { filterInfo, column, isColumn } = this.props;

    return (isColumn
      && filterInfo.selectedColumn
      && filterInfo.selectedColumn.columnNumber === column.columnNumber
      && (filterInfo.filterBy || filterInfo.filterValue));
  }

  getFilteredByLabel({ filterBy, filterValue }) {
    switch (filterBy) {
      case 'contains':
        return <span>Containing <b>{filterValue}</b></span>;
      case 'startWith':
        return <span>Starting with <b>{filterValue}</b></span>;
      case 'equals':
        return <span>Equal to <b>{filterValue}</b></span>;
      case 'greaterThan':
        return <span>Greater than <b>{filterValue}</b></span>;
      case 'lessThan':
        return <span>Less than <b>{filterValue}</b></span>;
      default:
        console.log('No matching filter type found', filterBy);
        return 'No matching filter type found';
    }
  }

  getSortedByLabel(sortBy, columnType) {
    switch (sortBy) {
      case 'ascending':
        return columnType === 'string' ? 'Sorted alphabetically ascending' : 'Sorted by lowsest first';
      case 'descending':
        return columnType === 'string' ? 'Sorted alphabetically descending' : 'Sorted by highest first';
      case 'shortest':
        return 'Sorted by shortest first';
      case 'longest':
        return 'Sorted by longest first';
      default:
        console.log('No matching sort type found', sortBy);
        return 'No matching sort type found';
    }
  }

  renderFilter() {
    const { filterInfo } = this.props;
    if (this.hasFilterApplied()) {
      return <div className="field-detail-label">{this.getFilteredByLabel(filterInfo)}</div>;
    }
    return null;
  }

  renderSorter() {
    const { column, sortInfo } = this.props;
    if (this.hasSortApplied()) {
      return <div className="field-detail-label">{this.getSortedByLabel(sortInfo.sortBy, column.type)}</div>;
    }
    return null;
  }

  renderRowNum() {
    const { isColumn, rowNumber } = this.props;
    if (isColumn) {
      return null;
    }
    return <div className="field-detail-label">Row {rowNumber}</div>
  }

  renderNoFiltersOrSorting() {
    const { isColumn } = this.props;
    if (isColumn
      && !(this.hasFilterApplied())
      && !this.hasSortApplied()) {
      return <div className="field-detail-label">No sorting or filters</div>
    }
  }

  renderColumnType() {
    const { isColumn, column } = this.props;
    if (!isColumn) {
      return null;
    }
    const label = column.type === 'string' ? 'Strings' : 'Numbers';
    return <b className="field-detail-label">{label}</b>

  }

  render() {
    return (
      <div className="field-detail">
        {this.renderColumnType.call(this)}
        {this.renderFilter.call(this)}
        {this.renderSorter.call(this)}
        {this.renderRowNum.call(this)}
        {this.renderNoFiltersOrSorting.call(this)}
      </div>
    );
  }
}

FieldDetail.propTypes = {
  column: PropTypes.instanceOf(Column),
  isColumn: PropTypes.bool,
  filterInfo: PropTypes.object,
  sortInfo: PropTypes.object,
  rowNumber: PropTypes.number,
}