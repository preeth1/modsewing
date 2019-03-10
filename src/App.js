import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import 'App.css';
import logoImage from 'images/logo.png';
import GeneratePage from 'patternGenerators/generatePattern.js'
import history from 'history.js';

class App extends Component {
  state = {
    size: '',
  }

  updateSize = (size) => {
    this.setState({size: size});
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path='/' render={(props) => 
            <MeasurementsPage size={this.state.size} updateSizeFn={this.updateSize} history={history}/>}
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
        <Measurements size={this.props.size} updateSizeFn={this.props.updateSizeFn} />
        <GenerateButton size={this.props.size} history={this.props.history}/>
      </div>
    )
  }
}

class Measurements extends Component {
  
  onSizeButtonChange = (event) => {
    this.props.updateSizeFn(event.currentTarget.value);
  }

render () {
    return (
      <div className="Measurements">
        <div className="LogoPanel">
          <img className="LogoImage" src={logoImage} alt="Modsewing"/>
        </div>
          <form onSubmit={this.handleSubmit} className="ContentPanelMeasurements">
            <div className="MeasurementPanel">
              <div className="MeasurementBox">

              </div>
              <div className="MeasurementBox">

              </div>

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

