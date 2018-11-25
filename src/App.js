import React, { Component } from 'react';
import { DropZoneWrapper } from './components/DropZoneWrapper';
import { Welcome } from './components/Welcome';
import Explorer from './components/Explorer';

class App extends Component {
  state = {
    csv: null,
  }

  handleNewCsv(csv) {
    console.log('Handling new csv:', csv);
    this.setState({ csv })
  }

  render() {
    const csvKey = this.state.csv ?
      `${this.state.csv.columns.map((col) => col.name).join('')}${this.state.csv.rows.length}${this.state.csv.rows[0][0]}${this.state.csv.rows[0][1]}`
      : null;
    return (
      <div className="App">
        <DropZoneWrapper
          handleNewCsv={this.handleNewCsv.bind(this)}
        >
          {this.state.csv ?
            <Explorer
              csv={this.state.csv}
              key={csvKey}
            />
            : <Welcome />}
        </DropZoneWrapper>
      </div>
    );
  }
}

export default App;
