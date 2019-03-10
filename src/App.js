import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import 'App.css';
import logoImage from 'images/logo.png';
import GeneratePage from 'patternGenerators/generatePattern.js'
import history from 'history.js';
import { MEASUREMENTS } from 'constants.js'
import _ from 'lodash';
import spongebob from 'images/spongebob.png'

class App extends Component {
  state = {
    measurements: MEASUREMENTS,
    displayImage: ""
  }

  updateSize = (name, value) => {
    const newMeas = this.state.measurements;
    newMeas[name] = value
    this.setState({measurements: newMeas});
  }

  handleFocusFn = () => {
    this.setState({displayImage: spongebob});
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path='/' render={(props) => 
            <MeasurementsPage measurements={this.state.measurements} 
            updateSizeFn={this.updateSize} handleFocusFn={this.handleFocusFn} history={history} displayImage={this.state.displayImage}/>}
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
        displayImage={this.props.displayImage} />
        <GenerateButton measurements={this.props.measurements} history={this.props.history}/>
      </div>
    )
  }
}

class Measurements extends Component {

  handleChange = (name, event) => {
    this.props.updateSizeFn(name, event.currentTarget.value);
  }

  handleFocus = () => {
    this.props.handleFocusFn()
  }

  generateMeasurementLabels = () => {
    let measurementLabels = []
    _.each(MEASUREMENTS, (value, name) => {
      measurementLabels.push(<label className="MeasurementLabel">
                  { name }: 
                  <input type="text" 
                  value={this.props.measurements[name]} 
                  onChange={(e) => this.handleChange(name, e)}
                  onFocus = {this.handleFocus} />
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

