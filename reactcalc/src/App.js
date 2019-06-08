import React from 'react';
import Calculator from './Calc'
import logo from './assets/calc.svg';
import './css/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>This is Theo's first stab at Web dev</h2>
        </div>
        <p className="App-intro">
          Here's a shity calculator:
        </p>
        <div class = "calcDiv">
        <Calculator className = 'C'></Calculator>
        i hate css so much
        </div>
      </div>
    );
  }
}

export default App;
