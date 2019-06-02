import React, { Component } from 'react';
import logo from './assets/chess.svg';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>This is Theo's first stab at Web dev</h2>
        </div>
        <p className="App-intro">
          Here's a shitty game of chess:
        </p>
      </div>
    );
  }
}

export default App;
