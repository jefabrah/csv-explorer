import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from '../utils/Field';
import Column from '../utils/Column';
import { FieldDetail } from './FieldDetail';

export class TableCell extends Component {
  state = {
    showFieldDetail: false,
  }

  showFieldDetail() {
    this.setState({ showFieldDetail: true });
  }

  hideFieldDetail() {
    this.setState({ showFieldDetail: false });
  }

  renderFieldDetail() {
    const { rowNumber, fullRowNumbers } = this.props;
    if (!this.state.showFieldDetail) {
      return null;
    }
    return <FieldDetail rowNumber={fullRowNumbers[rowNumber]} />;
  }

  render() {
    let cellClassName = 'table-cell';
    cellClassName = this.props.lastRow ? `${cellClassName} last-row` : cellClassName;
    cellClassName = this.props.lastColumn ? `${cellClassName} last-column` : cellClassName;
    return (
      <div
        className={cellClassName}
        onMouseEnter={this.showFieldDetail.bind(this)}
        onMouseLeave={this.hideFieldDetail.bind(this)}
      >
        {this.props.field.value}
        {/* {this.props.column.name}
        {this.props.column.type} */}
        {this.renderFieldDetail.call(this)}
      </div>
    );
  }
}

TableCell.propTypes = {
  field: PropTypes.instanceOf(Field).isRequired,
  lastRow: PropTypes.bool.isRequired,
  lastColumn: PropTypes.bool.isRequired,
  column: PropTypes.instanceOf(Column),
  rowNumber: PropTypes.number.isRequired,
  fullRowNumbers: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};