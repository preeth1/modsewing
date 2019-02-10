import React, { Component } from 'react';
import './App.css';

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
  render () {
    return (
      <div className="Measurements">
        <div className="LogoPanel">
          ModSewing
        </div>
        <div className="HeaderPanel">
          Choose a size
        </div>
        <div className="ButtonPanel">
          <div className="SizeButtonPanel">
            <SizeButton size={"S"} input type="radio"/>
            <SizeButton size={"M"} input type="radio"/>
            <SizeButton size={"L"} input type="radio"/>
          </div>
            <GenerateButton/>
          <div className="XXXXX">
          
          </div>
        </div>
      </div>
      )
  }
}

class SizeButton extends Component {
  state = {
    backgroundColor: 'pink'
  }
  handleSizeButtonClick = (event) => {
    this.setState({
      backgroundColor: 'blue'
    })
  }

  render () {
    return (
        <div className="CuteButton SizeButton" onClick={this.handleSizeButtonClick} style={{backgroundColor:this.state.backgroundColor}}>
          {this.props.size}
        </div>  
      )
  }
}

class GenerateButton extends Component {
  render () {
    return (
        <div className="CuteButton GenerateButton">
          Generate Pattern
        </div>  
      )
  }
}