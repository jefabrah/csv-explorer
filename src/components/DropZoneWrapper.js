import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Csv from '../utils/Csv';

export class DropZoneWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      dropzoneActive: false
    }
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files) {
    files.forEach(file => {
      const reader = new FileReader();
      // parse csv
      reader.onload = () => {
        const csvString = reader.result;
        const csv = new Csv(csvString);
        this.props.handleNewCsv(csv);
      };

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    });
    this.setState({
      files,
      dropzoneActive: false
    });
  }

  render() {
    return (
      <Dropzone
        disableClick
        style={{ position: "relative" }}
        accept={"text/csv"}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
        className="dropzone-wrapper-content"
      >
        {this.props.children}
      </Dropzone>
    );
  }
}