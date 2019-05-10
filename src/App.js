import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import 'App.css';
import titleImage from 'images/title.svg';
import GeneratePage from 'patternGenerators/generatePattern.js';
import TutorialPage from 'measurementTutorial.js';
import history from 'history.js';
import { get_measurements } from 'constants.js';
import _ from 'lodash';

class App extends Component {
  state = {
    measurements: get_measurements({}),
  }

  handleLogoClick = (event) => {
    history.replace('/')
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <div className="LogoPanel" onClick={this.handleLogoClick}>
            <img className="TitleImage" src={titleImage} alt="Modsewing"/>
          </div>
          <Route exact path='/' render={(props) =>
            <MeasurementsPage measurements={this.state.measurements}
            history={history}
            displayImage={this.state.displayImage}
            imageDescription={this.state.imageDescription}/>}
          />
          <Route exact path='/generatePattern' render={(props) =>
            <GeneratePage measurements={this.state.measurements}/>}
          />
          <Route exact path='/getMeasurements' render={(props) =>
            <TutorialPage history={history} measurements={this.state.measurements}/>}
          />
        </div>
      </Router>
    );
  }
}

export default App;


class MeasurementsPage extends Component {

  generateMeasurementLabels = () => {
    let measurementLabels = []
    _.each(get_measurements({}), (measurementInfo, measurementName) => {
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

  generatePattern = (event) => {
    this.props.history.replace('/generatePattern')
  }

  measurementTutorialButtonClicked = (event) => {
    this.props.history.replace('/getMeasurements')
  }

render () {
    return (
      <div className="Measurements">
        <div className="ContentPanelMeasurements">
          <div className="MeasurementButton measurementTutorialButton" onClick={this.measurementTutorialButtonClicked}>
          Take your measurements
          </div>
          <div className="MeasurementButton MeasurementBuiltInButton">
          Use a built-in measurement
            <div className="BuiltInButtonPanel">
              <div className="BuiltInButton" onClick={this.generatePattern}>
              S
              </div>
              <div className="BuiltInButton" onClick={this.generatePattern}>
              M
              </div>
              <div className="BuiltInButton" onClick={this.generatePattern}>
              L
              </div>
            </div>
          </div>
        </div>
      </div>
      )
  }
}
