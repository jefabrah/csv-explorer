import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from '../utils/Column';
import { NumberColumnSortControls } from './NumberColumnSortControls';
import { StringColumnSortControls } from './StringColumnSortControls';

export class ColumnSortController extends Component {

  renderNoColumnSelected() {
    if (this.props.selectedColumn) {
      return null;
    }
    return (
      <div className="no-column-selected">
        <span>Click a column heading in the table below to add sorting.</span>
      </div>
    )
  }

  handleSortChange(sortInfo) {
    this.props.setColumnSortInfo(sortInfo);
  }

  handleClearSort() {
    this.props.setColumnSortInfo({
      sortBy: '',
      selectedColumn: this.props.selectedColumn,
    })
  }

  renderColumnSorters() {
    if (!this.props.selectedColumn) {
      return null;
    }
    const { selectedColumn } = this.props;
    if (selectedColumn.type === 'string') {
      return <StringColumnSortControls
        key={selectedColumn.columnNumber}
        column={selectedColumn}
        sortInfo={this.props.sortInfo}
        handleSortChange={this.handleSortChange.bind(this)}
        handleClearSort={this.handleClearSort.bind(this)}
      />
    }
    return <NumberColumnSortControls
      key={selectedColumn.columnNumber}
      column={selectedColumn}
      sortInfo={this.props.sortInfo}
      handleSortChange={this.handleSortChange.bind(this)}
      handleClearSort={this.handleClearSort.bind(this)}
    />
  }

  render() {
    return (
      <div className="sort-controller">
        <h3>Sort column</h3>
        {this.props.selectedColumn
          ? this.renderColumnSorters.call(this)
          : this.renderNoColumnSelected.call(this)}
      </div >
    );
  }
}

ColumnSortController.propTypes = {
  selectedColumn: PropTypes.instanceOf(Column),
  setColumnSortInfo: PropTypes.func.isRequired,
  sortInfo: PropTypes.object.isRequired
};