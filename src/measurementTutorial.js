import React, { Component } from 'react';

class TutorialPage extends Component {

state = {
    title: "MEASUREMENTS.neck.friendlyName",
    image: "MEASUREMENTS.neck.image",
    description: "MEASUREMENTS.neck.helpText",
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

  render () {
    return (
      <div className="TutorialPage">
        <div className="TutorialPanel">
          <div className="MeasurementPanel">
            <div className="MeasurementTitle">
              TITLE
            </div>
            <div className="MeasurementDescription">
              { this.state.description }
            </div>
            <input className="MeasurementLabel" type="text" name="LastName" value="Mouse"/>
            <button type="button">Next!</button>
          </div>
          <img className="MeasurementImage" src={ this.state.image } alt="instruction"/>        
          </div>
      </div>
    )
  }
}
export default TutorialPage;