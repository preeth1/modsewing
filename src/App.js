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
    size: '',
    measurements: MEASUREMENTS,
  }

  updateSize = (name, value) => {
    const newMeas = this.state.measurements;
    newMeas[name] = value
    this.setState({measurements: newMeas});
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path='/' render={(props) => 
            <MeasurementsPage size={this.state.size} measurements={this.state.measurements} 
            updateSizeFn={this.updateSize} history={history}/>}
          />
          <Route exact path='/generatePattern' render={(props) => 
            <GeneratePage size={this.state.size}/>}
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
        <Measurements size={this.props.size} measurements={this.props.measurements} updateSizeFn={this.props.updateSizeFn} />
        <GenerateButton size={this.props.size} history={this.props.history}/>
      </div>
    )
  }
}

class Measurements extends Component {

  handleChange = (name, event) => {
    this.props.updateSizeFn(name, event.currentTarget.value);
  }

  handleFocus = () => {
    console.log("handleFocus!!")
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
              <div className="MeasurementImage">

              </div>
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

