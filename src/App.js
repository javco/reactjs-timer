import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Timer from './components/Timer/Timer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Timer</h1>
        </header>
        <p className="App-intro">
          Click the button to start/stop the timer
        </p>
        <Timer />
      </div>
    );
  }
}

export default App;
