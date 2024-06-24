import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isPaused: true,
    minutes: 25,
    seconds: 0,
  }

  time = () => {
    const {minutes, seconds} = this.state
    if (seconds > 0) {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    } else if (minutes > 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        seconds: 59,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({isPaused: true})
    }
  }

  onDecrement = () => {
    console.log('Decrement is Clicked')
    const {isPaused, minutes} = this.state
    if (isPaused && minutes > 1) {
      console.log('Decrementing')
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        seconds: 0,
      }))
    } else {
      console.log('no Decrementing')
      return null
    }
    return null
  }

  onIncrement = () => {
    console.log('increment is clicked')
    const {isPaused} = this.state
    if (isPaused) {
      console.log('incrementing')
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        seconds: 0,
      }))
    } else {
      console.log('no Incrementing')
      return null
    }
    return null
  }

  toggleStartPause = () => {
    const {isPaused} = this.state
    if (isPaused) {
      this.timerId = setInterval(this.time, 1000)
    } else {
      clearInterval(this.timerId)
    }

    this.setState(prevState => ({isPaused: !prevState.isPaused}))
  }

  onResetTime = () => {
    clearInterval(this.timerId)
    this.setState({minutes: 25, seconds: 0, isPaused: true})
  }

  render() {
    const {isPaused, minutes, seconds} = this.state
    const formattedSeconds = seconds.toString().padStart(2, '0')
    return (
      <div className="main-container">
        <h1>Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-container">
            <div className="timer-background">
              <div className="timer">
                <h1>
                  {minutes}:{formattedSeconds}
                </h1>
                {isPaused === true && <p>Paused</p>}
                {isPaused === false && <p>Running</p>}
              </div>
            </div>
          </div>
          <div className="controls-container">
            <div className="start-reset-container">
              <div>
                {isPaused ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="pause icon"
                  />
                )}
                <button
                  className="start-button"
                  type="button"
                  onClick={this.toggleStartPause}
                >
                  {isPaused ? 'Start' : 'Pause'}
                </button>
              </div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <button
                  type="button"
                  className="start-button"
                  onClick={this.onResetTime}
                >
                  Reset
                </button>
              </div>
            </div>
            <p>Set Timer Limit</p>
            <div className="controls">
              <button type="button" onClick={this.onDecrement}>
                -
              </button>
              <p>{minutes}</p>
              <button type="button" onClick={this.onIncrement}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
