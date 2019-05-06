import React, { Component } from 'react';
import { MEASUREMENTS } from 'constants.js';
import { isPositiveValidNumber,
        brokePattern } from 'measurementHelpers.js';
import { front,
        back } from 'slopers/bodice.js'

class TutorialPage extends Component {

  state = {
      measurementIndex: 0,
      measurements: JSON.parse(JSON.stringify(MEASUREMENTS)),
      measurementError: '',
      displayMeasurement: 'Enter measurement'
  }

  updateMeasurement = (value) => {
    let newMeasurement = this.state.measurements;
    newMeasurement[this.state.measurementIndex].measurement = parseFloat(value);
    this.setState({measurements: newMeasurement});
  }

  advanceTutorial = () => {
    let newMeasurementIndex = this.state.measurementIndex + 1;
    let newMeasurement = this.state.measurements;
    this.setState({measurementIndex: newMeasurementIndex,
                  displayMeasurement: 'Enter measurement'});
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
        this.updateMeasurement(this.state.displayMeasurement);
        if (brokePattern(this.state.measurements)) {
          this.setState({measurementError: 'Broke the pattern!!!'});
        } else {
          this.advanceTutorial();
        }
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