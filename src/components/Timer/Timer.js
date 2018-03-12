import React from 'react';

import TimeSpent from './TimeSpent'

// A React.js component is just a ES6 class extending React.Component
// It should implement at least the render method
class Timer extends React.Component {
  // You have a constructor receiving the props as parameters
  constructor(props) {
    super(props)
    // Timer class functions
    this.handleChange = this.handleChange.bind(this)
    this.timerOn = this.timerOn.bind(this)
    this.leadingZero = this.leadingZero.bind(this)
    this.leadingZeroMilliseconds = this.leadingZeroMilliseconds.bind(this)
    // default states
    this.state = { 
      status: 'off', 
      start: null, 
      diff: 0, 
      amount: 0, 
      speed: 10, 
      hours: '00', 
      minutes: '00', 
      seconds: '00', 
      hundredths: '000', 
      interval: f=>f 
    }
  }

  handleChange(e) {
    if (this.state.status === 'off') {
      this.setState({ status: 'on' })
      this.setState({ start: new Date().getTime() })
      this.setState({ interval: setInterval(this.timerOn, this.state.speed) })
    } 
    else {
      this.setState({ status: 'off' })
      this.setState({ amount: (this.state.amount + this.state.diff) })
      clearInterval(this.state.interval)
    }
  }
  
  timerOn() {
    if (this.state.status === 'on') {
      //get start time
      let start = this.state.start;
      // get current time
		  let current = new Date().getTime();
		  // get difference between current and start times
      let diff = new Date(current-start);
      //update state for difference
      this.setState({ diff: diff.getTime() })
      
      //set time to show (new range of times between clicks + total amount of time)
      let show = new Date(this.state.amount + diff.getTime());
      this.setState({ hours: this.leadingZero(show.getUTCHours()) })
      this.setState({ minutes: this.leadingZero(show.getUTCMinutes()) })
      this.setState({ seconds: this.leadingZero(show.getUTCSeconds()) })
      this.setState({ hundredths: this.leadingZeroMilliseconds(show.getUTCMilliseconds()) })
    }
  }

  // The render method is called each time the state of component changes
  render() {
    // More info at https://reactjs.org/docs/jsx-in-depth.html
    return ( 
      <div>
        <TimeSpent hours={this.state.hours} minutes={this.state.minutes} seconds={this.state.seconds} hundredths={this.state.hundredths} /> 
        <button id="clicker" onClick={this.handleChange}>{this.state.status}</button>
      </div>
    );
  }

  leadingZero(time) {
    return (time < 10) ? "0" + time : + time;
  }
  
  leadingZeroMilliseconds(time) {
    if(time<10){
      return "00" + time;
    }
    else if(time<100){
      return "0" + time;
    }
    return time;
  }

}

// Exporting the react component class to be included
export default Timer
