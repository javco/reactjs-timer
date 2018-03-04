import React from 'react';

import TimeSpent from './TimeSpent'

// A React.js component is just a ES6 class extending React.Component
// It should implement at least the render method
class Timer extends React.Component {
  // You have a constructor receiving the props as parameters
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.timerOn = this.timerOn.bind(this)
    this.state = { status: 'off', speed: 1000, seconds: 0, interval: f=>f }
  }

  handleChange(e) {
    if (this.state.status === 'off') {
      this.setState({ status: 'on' })
      this.setState({ interval: setInterval(this.timerOn, this.state.speed) })
    } 
    else {
      this.setState({ status: 'off' })
      clearInterval(this.state.interval)
    }
  }

  timerOn() {
    if (this.state.status === 'on') {
      const { seconds } = this.state
      this.setState({ seconds: seconds + 1 })
    }
  }

  // The render method is called each time the state of component changes
  render() {
    console.log(this.state)
    console.log('timer is ' + this.state.status)

    // More info at https://reactjs.org/docs/jsx-in-depth.html
    return ( 
      <div>
        <TimeSpent seconds={this.state.seconds}/> 
        <button id="clicker" onClick={this.handleChange}>Run me!</button>
      </div>
    );
  }
}

// Exporting the react component class to be included
export default Timer
