import React, { Component } from 'react';
import './App.css';
import logoImage from './images/logo.png';
import { absMovePen,
         drawRelLine,
         closePath,
         drawAbsBez
       } from './svgHelpers/drawing'

import {createPathElement,
        centerAndScalePath} from './svgHelpers/elements'

import { STANDARD_MEASUREMENTS } from './constants'


class GeneratePage extends Component {

  state = {
    displayWidth: 300,
    displayHeight: 150,
  }

  generatePattern = () => {
    const measurements = STANDARD_MEASUREMENTS[this.props.size]
    
    const path = [];
    absMovePen(path, {x: 0, y: 0});
    drawRelLine(path, {x: 60, y: 0});
    drawRelLine(path, {x: 0, y: 100});
    drawAbsBez(path, {x: 50, y: 40}, {x: 0, y: 0});
    closePath(path);

    let pathElement = createPathElement('id', path)
    pathElement = centerAndScalePath(pathElement, path, this.state.displayWidth, this.state.displayHeight);
    return pathElement
  }

  componentDidMount() {
    this.setDisplayHeight()
  }

  setDisplayHeight = () => {
    this.setState({displayWidth: this.divElement.clientWidth});
    this.setState({displayHeight: this.divElement.clientHeight});
    this.forceUpdate();
  }

  render () {
    return (
      <div className="GeneratePage">
        <div className="LogoPanel">
          <img className="LogoImage" src={logoImage} alt="Modsewing"/>
        </div>
        <div className="ContentPanelPattern">
          <div className="PatternDisplay" ref={ (divElement) => this.divElement = divElement}>

          <svg>
          {this.generatePattern() }
          </svg>



          </div>
          <div className="PrintButtonPanel">
            <PrintButton size={this.props.size}/>
          </div>
        </div>
      </div>
    )
  }
}
export default GeneratePage;


class PrintButton extends Component {
  PrintButtonClicked = (event) => {
    console.log("print button clicked")
  }

  render () {
    return (
      <div className="CuteButton PrintButton" onClick={this.PrintButtonClicked}> 
          Print Pattern
      </div>
    )
  }
}
