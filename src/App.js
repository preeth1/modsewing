import React, { Component } from 'react';
import './App.css';
import logoImage from './images/logo.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Measurements/>
      </div>
    );
  }
}

export default App;


class Measurements extends Component {
  state = {
    size: '',
  }

  onSizeButtonChange = (event) => {
    debugger
    this.setState({size: event.currentTarget.value});
  }

  render () {
    return (
      <div className="Measurements">
        <div className="LogoPanel">
          <img className="LogoImage" src={logoImage} alt="Modsewing"/>
        </div>
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
            <GenerateButton/>
        </div>
      </div>
      )
  }
}

class GenerateButton extends Component {
  GeneratePattern = (event) => {
    
  }
  render () {
    return (
        <div className="CuteButton GenerateButton" onClick={this.GeneratePattern}>
          Generate Pattern
        </div>  
      )
  }
}