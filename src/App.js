import React, { Component } from 'react';
import { Router, Link, Route } from 'react-router-dom';
import './App.css';
import logoImage from './images/logo.png';
import GeneratePage from './generate_pattern'
import history from './history';

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
          <Route exact path='/generate_pattern' render={(props) => 
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
        <div className="ContentPanelMeasurements">
          <div className="HeaderPanel">
            Choose a size
          </div>
          <div className="ButtonPanel">
            <div className="SizeButtonPanel">
              <label className="container">
                <input type="radio" name="radio" onChange={this.onSizeButtonChange} value="Small"></input> Small
              </label> 
              <label className="container">
                <input type="radio" name="radio" value="Medium" onChange={this.onSizeButtonChange}></input> Medium
              </label>
              <label className="container">
                <input type="radio" name="radio" value="Large" onChange={this.onSizeButtonChange}></input> Large
              </label>
            </div>
          </div>
        </div>
      </div>
      )
  }
}

class GenerateButton extends Component {
  GeneratePatternClicked = (event) => {
    this.props.history.replace('/generate_pattern')
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

