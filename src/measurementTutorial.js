import React, { Component } from 'react';
import { MEASUREMENTS } from 'constants.js';

class TutorialPage extends Component {

state = {
    measurementIndex: 0,
    measurements: MEASUREMENTS
  }
    updateSize = (value) => {
      console.log(value)
      let newMeas = this.state.measurements;
      newMeas[this.state.measurementIndex].measurement = value
      this.setState({measurements: newMeas});
  }

  handleChange = (event) => {
    this.updateSize(event.currentTarget.value);
  }

  handleClick = () => {
    let newMeasurementIndex = this.state.measurementIndex + 1;
    this.setState({measurementIndex: newMeasurementIndex})
  }

  showFinishButton = () => {
    return this.state.measurementIndex == MEASUREMENTS.length - 1;
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
            <input className="MeasurementLabel" onChange={this.handleChange} type="text" name="value" value={MEASUREMENTS[this.state.measurementIndex].measurement}/>
            <button type="button" onClick={ this.handleClick }>Next!</button>
            { this.showFinishButton() && <button type="button" onClick={ this.handleClick }>Finish!</button> }
          </div>
          <img className="MeasurementImage" src={ MEASUREMENTS[this.state.measurementIndex].image } alt="instruction"/>
          </div>
      </div>
    )
  }
}
export default TutorialPage;