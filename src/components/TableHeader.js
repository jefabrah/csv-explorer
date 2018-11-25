import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from '../utils/Column';
import { FieldDetail } from './FieldDetail';

export class TableHeader extends Component {
  state = {
    showFieldDetail: false,
  }

  handleColumnSort(e) {
    const { setColumnSortInfo, sortInfo, column } = this.props;
    e.stopPropagation();
    let ascOrDec = 'ascending';
    if (sortInfo.selectedColumn &&
      sortInfo.selectedColumn.columnNumber === column.columnNumber &&
      sortInfo.sortBy === 'ascending') {
      ascOrDec = 'descending';
    }
    const newSortInfo = {
      sortBy: ascOrDec,
      selectedColumn: column,
    }
    setColumnSortInfo(newSortInfo);
  }

  renderHeaderDetails() {
    if (this.state.showFieldDetail) {
      return (
        <FieldDetail
          column={this.props.column}
          sortInfo={this.props.sortInfo}
          filterInfo={this.props.filterInfo}
          isColumn
        />
      );
    }
    return null;
  }

  showFieldDetail() {
    this.setState({ showFieldDetail: true });
  }

  hideFieldDetail() {
    this.setState({ showFieldDetail: false });
  }

  render() {
    const { handleColumnClick, column } = this.props;
    return (
      <div className="table-header-wrapper">
        <div
          className="table-header"
          onClick={() => handleColumnClick(column)}
          onMouseEnter={this.showFieldDetail.bind(this)}
          onMouseLeave={this.hideFieldDetail.bind(this)}
        >
          <h3>
            {column.name}
          </h3>
          <i
            className="fa fa-sort column-sort"
            onClick={this.handleColumnSort.bind(this)}
          />
        </div>
        {this.renderHeaderDetails.call(this)}
      </div>
    );
  }
}

TableHeader.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired,
  handleColumnClick: PropTypes.func.isRequired,
  setColumnSortInfo: PropTypes.func.isRequired,
  sortInfo: PropTypes.object.isRequired,
  filterInfo: PropTypes.object.isRequired,
}