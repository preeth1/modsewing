import React, { Component } from 'react';
import './App.css';
import logoImage from './images/logo.png';
import { absMovePen,
         drawAbsLine,
         drawRelLine
       } from './svgHelpers/drawing'

import {createPathElement,
        centerAndScalePath} from './svgHelpers/elements'

class GeneratePage extends Component {

  state = {
    displayWidth: 300,
    displayHeight: 150,
  }

  generatePattern = () => {
    let pathString = "";
    pathString = 'M 0 0 l 600 0 l 0 15 l -600 0 l 0 -15 Z'
    let pathElement = createPathElement('id', pathString)
    pathElement = centerAndScalePath(pathElement, pathString, this.state.displayWidth, this.state.displayHeight);
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
