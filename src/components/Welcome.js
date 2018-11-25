import React, { Component } from 'react';

// Landing page before csv has been added
export class Welcome extends Component {

  render() {
    return (
      <div className="welcom">
        <h1>CSV Explorer</h1>
        <h2>Drop a csv file anywhere to start.</h2>
      </div>
    );
  }
}