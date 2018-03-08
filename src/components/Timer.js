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
    this.leadingZero = this.leadingZero.bind(this)
    this.leadingZeroMilliseconds = this.leadingZeroMilliseconds.bind(this)
    this.state = { status: 'off', start: null, speed: 10, hours: '00', minutes: '00', seconds: '00', hundredths: '000', interval: f=>f }
  }

  handleChange(e) {
    if (this.state.status === 'off') {
      this.setState({ status: 'on' })
      this.setState({ start: new Date().getTime() })
      this.setState({ interval: setInterval(this.timerOn, this.state.speed) })
    } 
    else {
      this.setState({ status: 'off' })
      clearInterval(this.state.interval)
    }
  }

  timerOn() {
    if (this.state.status === 'on') {
      let start = this.state.start;
      // get current date
		  let actual = new Date().getTime();
		  // get difference between current and start dates
		  let diff=new Date(actual-start);
      
      this.setState({ hours: this.leadingZero(diff.getUTCHours()) })
      this.setState({ minutes: this.leadingZero(diff.getUTCMinutes()) })
      this.setState({ seconds: this.leadingZero(diff.getUTCSeconds()) })
      this.setState({ hundredths: this.leadingZeroMilliseconds(diff.getUTCMilliseconds()) })
    }
  }

  // The render method is called each time the state of component changes
  render() {
    //console.log(this.state)
    //console.log('timer is ' + this.state.status)

    // More info at https://reactjs.org/docs/jsx-in-depth.html
    return ( 
      <div>
        <TimeSpent hours={this.state.hours} minutes={this.state.minutes} seconds={this.state.seconds} hundredths={this.state.hundredths} /> 
        <button id="clicker" onClick={this.handleChange}>Run me!</button>
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
