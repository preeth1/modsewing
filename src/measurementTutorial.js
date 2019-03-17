import React, { Component } from 'react';
import { MEASUREMENTS } from 'constants.js';
import { isPositiveValidNumber } from 'measurementHelpers.js';
import { front,
        back } from 'slopers/bodice.js'

class TutorialPage extends Component {

state = {
    measurementIndex: 0,
    measurements: MEASUREMENTS,
    measurementError: '',
    displayMeasurement: 'Enter measurement'
  }
    updateSize = (value) => {
      let newMeasurementIndex = this.state.measurementIndex + 1;
      let newMeasurement = this.state.measurements;
      newMeasurement[this.state.measurementIndex].measurement = value;
      this.setState({measurementIndex: newMeasurementIndex,
                    displayMeasurement: 'Enter measurement',
                    measurements: newMeasurement});
  }

  handleChange = (event) => {
    this.setState({displayMeasurement: event.currentTarget.value});
  }

  handleFocus = () => {
    this.setState({displayMeasurement: ''});
  }

  handleNextClick = () => {
    if (!isPositiveValidNumber(this.state.displayMeasurement)) {
      this.setState({measurementError: 'Make sure you enter a valid measurement!'});
  } else {
      this.setState({measurementError: ''});
      this.updateSize(this.state.displayMeasurement);
    }
  }

  handleBackClick = () => {
    let newMeasurementIndex = this.state.measurementIndex - 1;
    this.setState({measurementIndex: newMeasurementIndex})
  }

  showFinishButton = () => {
    return this.state.measurementIndex === MEASUREMENTS.length - 1;
  }

  showBackButton = () => {
    return this.state.measurementIndex !== 0;
  }

  generatePattern = (event) => {
    // Try making the pattern
    try {
      const frontPath = front(this.props.measurements); 
      let backPath = back(this.props.measurements);
      this.props.history.replace('/generatePattern')
    }
    catch(error) {
      this.setState({measurementError: 'Something went wrong!'});
    }
  }

  render () {
    return (
      <div className="TutorialPage">
        <div className="TutorialPanel">
          <div className="MeasurementPanel">
            <div className="MeasurementTitle">
              { MEASUREMENTS[this.state.measurementIndex].friendlyName } ({this.state.measurementIndex + 1} / {MEASUREMENTS.length})
            </div>
            <div className="MeasurementDescription">
              { MEASUREMENTS[this.state.measurementIndex].helpText }
            </div>
            <div className="MeasurementLabelPanel">
              <input className="MeasurementLabel" onFocus={this.handleFocus} onChange={this.handleChange} type="text" name="value" value={this.state.displayMeasurement}/>
              { !this.showFinishButton() && <div className="CuteButton NextButton" onClick={ this.handleNextClick }>Next!</div> }
              { this.showBackButton() && <div className="CuteButton BackButton" onClick={ this.handleBackClick }>Back!</div> }
              { this.showFinishButton() && <div className="CuteButton FinishButton" onClick={ this.generatePattern }>Finish!</div> }
            </div>
            <div className="MeasurementErrorPanel">
            { this.state.measurementError }
            </div>
          </div>
          <img className="MeasurementImage" src={ MEASUREMENTS[this.state.measurementIndex].image } alt="instruction"/>
          </div>
      </div>
    )
  }
}
export default TutorialPage;