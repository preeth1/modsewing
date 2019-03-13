import React, { Component } from 'react';
import { MEASUREMENTS } from 'constants.js';

class TutorialPage extends Component {

state = {
    measurementIndex: 0,
  }
    updateSize = (name, value) => {
    const newMeas = this.state.measurements;
    newMeas[name].measurement = value
    this.setState({measurements: newMeas});
  }

  handleFocusFn = (measurementInfo) => {
    this.setState({displayImage: measurementInfo.image});
    this.setState({imageDescription: measurementInfo.helpText});
  }

  handleClick = () => {
    let newMeasurementIndex = this.state.measurementIndex + 1;
    this.setState({measurementIndex: newMeasurementIndex})
  }

  render () {
    return (
      <div className="TutorialPage">
        <div className="TutorialPanel">
          <div className="MeasurementPanel">
            <div className="MeasurementTitle">
              { MEASUREMENTS[this.state.measurementIndex].friendlyName }
            </div>
            <div className="MeasurementDescription">
              { MEASUREMENTS[this.state.measurementIndex].helpText }
            </div>
            <input className="MeasurementLabel" type="text" name="LastName" value="Mouse"/>
            <button type="button" onClick={ this.handleClick }>Next!</button>
          </div>
          <img className="MeasurementImage" src={ MEASUREMENTS[this.state.measurementIndex].image } alt="instruction"/>
          </div>
      </div>
    )
  }
}
export default TutorialPage;