import React, { Component } from 'react';
import { MEASUREMENTS } from 'constants.js';

class TutorialPage extends Component {

state = {
    measurementIndex: 0,
    measurements: MEASUREMENTS,
    measurementError: '',
    displayMeasurement: 'Enter measurement'
  }
    updateSize = (value) => {
      let newMeasurementIndex = this.state.measurementIndex + 1;
      this.setState({measurementIndex: newMeasurementIndex})
      this.setState({displayMeasurement: 'Enter measurement'});
      let newMeasurement = this.state.measurements;
      newMeasurement[this.state.measurementIndex].measurement = value
      this.setState({measurements: newMeasurement});
  }

  handleChange = (event) => {
    this.setState({displayMeasurement: event.currentTarget.value});
  }

  handleFocus = () => {
    this.setState({displayMeasurement: ''});
  }

  handleNextClick = () => {
    if (!this.isPositiveValidNumber()) {
      this.setState({measurementError: 'Make sure you enter a valid measurement!'});
  } else {
      this.setState({measurementError: ''});
      this.updateSize(this.state.displayMeasurement);
    }
  }

  isPositiveValidNumber = () => {
    const positiveValidNumber = RegExp('^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$')
    return positiveValidNumber.test(this.state.displayMeasurement)
  }

  showFinishButton = () => {
    return this.state.measurementIndex == MEASUREMENTS.length - 1;
  }

  generatePattern = (event) => {
    this.props.history.replace('/generatePattern')
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