import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from '../utils/Column';

export class StringColumnFilterControls extends Component {
  state = {
    filterBy: '',
    filterValue: '',
  }

  handleFilterByTypeChange(e) {
    const filterBy = e.target.value;
    if (this.props.filterInfo.filterBy === filterBy) {
      console.log('Filter already applied:', filterBy);
      return;
    }
    this.setState({ filterBy: e.target.value });
  }

  handleClearFilter() {
    this.setState({
      filterBy: '',
      filterValue: '',
    });
    this.props.handleClearFilter();
  }

  handleFilterValueChange(e) {
    this.setState({ filterValue: e.target.value });
  }

  applyFilterInfo() {
    if (!this.state.filterBy || !this.state.filterValue) {
      return;
    }
    const newFilterInfo = {
      ...this.props.filterInfo,
      filterBy: this.state.filterBy,
      filterValue: this.state.filterValue,
    };
    this.props.handleFilterChange(newFilterInfo);
  }

  render() {
    const { column } = this.props;
    const { filterBy, filterValue } = this.state;
    return (
      <div className="string-filter-controls">

        <div className="filter-by-select-list">
          <label htmlFor="filterBy">
            <strong>{column.name}</strong> should:
            <select
              id="filterBy"
              value={filterBy}
              onChange={this.handleFilterByTypeChange.bind(this)}
            >
              <option value=""> </option>
              <option value="contains">Contain</option>
              <option value="startWith">Start With</option>
            </select>
          </label>
          <input
            type="text"
            value={filterValue}
            onChange={this.handleFilterValueChange.bind(this)}
          />
        </div>
        <div className="filter-buttons">
          <button
            className="clear-filters-btn"
            onClick={this.handleClearFilter.bind(this)}>
            Clear Filters
        </button>
          <button
            className="apply-filters-btn"
            onClick={this.applyFilterInfo.bind(this)}>
            Apply Filters
        </button>
        </div>
      </div>
    );
  }
}

StringColumnFilterControls.propTypes = {
  column: PropTypes.instanceOf(Column),
  handleFilterChange: PropTypes.func.isRequired,
  handleClearFilter: PropTypes.func.isRequired,
  filterInfo: PropTypes.object.isRequired,
};