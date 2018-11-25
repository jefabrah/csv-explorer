import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from '../utils/Column';

export class StringColumnSortControls extends Component {
  state = {
    sortBy: '',
  }

  handleSortByChange(e) {
    this.setState({ sortBy: e.target.value });
  }

  handleClearSort() {
    this.setState({
      sortBy: '',
      selectedColumn: this.props.column,
    });
    this.props.handleClearSort();
  }

  applySortInfo() {
    const sortBy = this.state.sortBy;
    if (!sortBy) {
      return;
    }
    const newSortInfo = {
      sortBy,
      selectedColumn: this.props.column,
    };
    this.props.handleSortChange(newSortInfo);
  }

  render() {
    const { column } = this.props;
    const { sortBy } = this.state;
    return (
      <div className="string-sort-controls">

        <div className="sort-by-select-list">
          <label htmlFor="sortBy">
            Sort <strong>{column.name}</strong> by:
            <select
              id="sortBy"
              value={sortBy}
              onChange={this.handleSortByChange.bind(this)}
            >
              <option value=""> </option>
              <option value="ascending">Alphabetical Ascending</option>
              <option value="descending">Alphabetical Descending</option>
              <option value="shortest">Shortest First</option>
              <option value="longest">Longest First</option>
            </select>
          </label>
        </div>
        <div className="sort-buttons">
          <button
            className="clear-sort-btn"
            onClick={this.handleClearSort.bind(this)}>
            Clear Sort
        </button>
          <button
            className="apply-sort-btn"
            onClick={this.applySortInfo.bind(this)}>
            Apply Sort
        </button>
        </div>
      </div>
    );
  }
}

StringColumnSortControls.propTypes = {
  column: PropTypes.instanceOf(Column),
  handleSortChange: PropTypes.func.isRequired,
  handleClearSort: PropTypes.func.isRequired,
  sortInfo: PropTypes.object.isRequired,
};