import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import 'App.css';
import logoImage from 'images/logo.png';
import GeneratePage from 'patternGenerators/generatePattern.js'
import history from 'history.js';
import { MEASUREMENTS } from 'constants.js'
import _ from 'lodash';

class App extends Component {
  state = {
    measurements: MEASUREMENTS,
    displayImage: "",
    imageDescription: "",
  }

  updateSize = (name, value) => {
    const newMeas = this.state.measurements;
    newMeas[name].measurement = value
    this.setState({measurements: newMeas});
  }

  handleFocusFn = (measurementInfo) => {
    debugger
    this.setState({displayImage: measurementInfo.image});
    this.setState({imageDescription: measurementInfo.helpText});
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path='/' render={(props) => 
            <MeasurementsPage measurements={this.state.measurements} 
            updateSizeFn={this.updateSize} 
            handleFocusFn={this.handleFocusFn} 
            history={history} 
            displayImage={this.state.displayImage}
            imageDescription={this.state.imageDescription}/>}
          />
          <Route exact path='/generatePattern' render={(props) => 
            <GeneratePage measurements={this.state.measurements}/>}
          />
        </div>
      </Router>
    );
  }
}

export default App;

class MeasurementsPage extends Component {
  render () {
    return (
      <div className="MeasurementsPage">
        <Measurements measurements={this.props.measurements} 
        updateSizeFn={this.props.updateSizeFn}
        handleFocusFn={this.props.handleFocusFn}
        displayImage={this.props.displayImage}
        imageDescription={this.props.imageDescription} />
        <GenerateButton measurements={this.props.measurements} history={this.props.history}/>
      </div>
    )
  }
}

class Measurements extends Component {

  handleChange = (name, event) => {
    this.props.updateSizeFn(name, event.currentTarget.measurementInfo);
  }

  handleFocus = (measurementInfo) => {
    this.props.handleFocusFn(measurementInfo)
  }

  generateMeasurementLabels = () => {
    let measurementLabels = []
    _.each(MEASUREMENTS, (measurementInfo, measurementName) => {
      measurementLabels.push(<label className="MeasurementLabel">
                  { measurementName }: 
                  <input type="text" 
                  value={this.props.measurements[measurementName].measurement} 
                  onChange={(event) => this.handleChange(measurementName, event)}
                  onFocus = {() => this.handleFocus(measurementInfo)} />
                </label>
                )
    })
    return measurementLabels
  }

render () {
    return (
      <div className="Measurements">
        <div className="LogoPanel">
          <img className="LogoImage" src={logoImage} alt="Modsewing"/>
        </div>
          <form onSubmit={this.handleSubmit} className="ContentPanelMeasurements">
            <div className="MeasurementPanel">
              
                {this.generateMeasurementLabels()}


            </div>
            <div className="ImagePanel">
              <img className="MeasurementImage" src={this.props.displayImage} alt="instruction"/>
              <div className="MeasurementImageDescription">
                { this.props.imageDescription }
              </div>

            </div>
          </form>
      </div>
      )
  }
}

class GenerateButton extends Component {
  GeneratePatternClicked = (event) => {
    this.props.history.replace('/generatePattern')
  }

  render () {
    return (
      <div className="GeneratePanel">
        <div className="CuteButton GenerateButton"  onClick={this.GeneratePatternClicked}>
          Generate Pattern
        </div>
      </div>  
    )
  }
}

