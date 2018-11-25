import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from '../utils/Column';
import { StringColumnFilterControls } from './StringColumnFilterControls';
import { NumberColumnFilterControls } from './NumberColumnFilterControls';

export class ColumnFilterController extends Component {

  renderNoColumnSelected() {
    if (this.props.selectedColumn) {
      return null;
    }
    return (
      <div className="no-column-selected">
        <span>Click a column heading in the table below to start adding filters to.</span>
      </div>
    )
  }

  handleFilterChange(filterInfo) {
    this.props.setColumnFilterInfo(filterInfo);
  }

  handleClearFilter() {
    this.props.setColumnFilterInfo({
      filterBy: null,
      filterValue: null,
      selectedColumn: this.props.selectedColumn,
    })
  }

  renderColumnFilters() {
    if (!this.props.selectedColumn) {
      return null;
    }
    const { selectedColumn } = this.props;
    if (selectedColumn.type === 'string') {
      return <StringColumnFilterControls
        key={selectedColumn.columnNumber}
        column={selectedColumn}
        filterInfo={this.props.filterInfo}
        handleFilterChange={this.handleFilterChange.bind(this)}
        handleClearFilter={this.handleClearFilter.bind(this)}
      />
    }
    return <NumberColumnFilterControls
      key={selectedColumn.columnNumber}
      column={selectedColumn}
      filterInfo={this.props.filterInfo}
      handleFilterChange={this.handleFilterChange.bind(this)}
      handleClearFilter={this.handleClearFilter.bind(this)}
    />
  }

  render() {
    return (
      <div className="filter-controller">
        <h3>Filter column</h3>
        {this.props.selectedColumn
          ? this.renderColumnFilters.call(this)
          : this.renderNoColumnSelected.call(this)}
      </div >
    );
  }
}

ColumnFilterController.propTypes = {
  selectedColumn: PropTypes.instanceOf(Column),
  filterInfo: PropTypes.object.isRequired,
  setColumnFilterInfo: PropTypes.func.isRequired,
};