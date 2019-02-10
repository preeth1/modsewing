import React, { Component } from 'react';
import './App.css';
import logoImage from './images/logo.png';

class App extends Component {
  state = {
    size: '',
  }

  updateSize = (size) => {
    this.setState({size: size});
  }

  render() {
    return (
      <div className="App">
        <Measurements size={this.state.size} updateSizeFn={this.updateSize}/>
        <Generate size={this.state.size}/>
      </div>
    );
  }
}

export default App;


class Measurements extends Component {
  
  onSizeButtonChange = (event) => {
    debugger
    this.props.updateSizeFn(event.currentTarget.value);
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
        </div>
      </div>
      )
  }
}

class Generate extends Component {
  GeneratePattern = (event) => {
    console.log("generate pattern clicked")
    console.log(this.props.size)
  }

  render () {
    return (
      <div className="GeneratePanel">
        <div className="CuteButton GenerateButton" onClick={this.GeneratePattern}>
          Generate Pattern
        </div> 
      </div>  
    )
  }
}