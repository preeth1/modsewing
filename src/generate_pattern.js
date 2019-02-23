import React, { Component } from 'react';
import 'App.css';
import logoImage from 'images/logo.png';
import { absMovePen,
         drawRelLine,
         closePath,
         drawAbsBez
       } from 'svgHelpers/drawing'

import { createPathElement,
         centerAndScalePath,
         joinPaths,
         translatePath } from 'svgHelpers/elements'

import { convertMeasurements } from 'measurements'

import { STANDARD_MEASUREMENTS } from 'constants.js'


class GeneratePage extends Component {

  state = {
    displayWidth: 300,
    displayHeight: 150,
  }

  generatePattern = () => {
    // const size = this.props.size;
    const size = 'Small';
    const convertedMeasurements = convertMeasurements(STANDARD_MEASUREMENTS[size]);
    console.log(convertedMeasurements);
    
    const path1 = [
    ...absMovePen({x: 0, y: 0}),
    ...drawRelLine({x: 10, y: 0}),
    ...drawRelLine({x: 0, y: 10}),
    ...drawRelLine({x: -10, y: 0}),
    ...drawRelLine({x: 0, y: -10}),
    ];

    const path2 = [
    ...absMovePen({x: 0, y: 0}),
    ...drawRelLine({x: 10, y: 0}),
    ...drawRelLine({x: 0, y: 10}),
    ...drawRelLine({x: -10, y: 0}),
    ...drawRelLine({x: 0, y: -10}),
    ];

    const translation = {x: 15, y: 20};
    const transPath2 = translatePath(path2, translation)
    const joinedPaths = joinPaths(path1, transPath2);


    const displayDimensions = {x: this.state.displayWidth, y: this.state.displayHeight}

    let pathElement = createPathElement('id', joinedPaths, displayDimensions)
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
