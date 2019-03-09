import React, { Component } from 'react';
import 'App.css';
import logoImage from 'images/logo.png';
import { front,
        back } from 'slopers/bodice.js'

import { createPathElement, 
         joinPaths,
         translatePath,
         getHeight,
         getWidth,
         calculateScaleFactor } from 'svgHelpers/elements'
import { _createCanvasElement,
        _initializeDoc,
        _addPreviewPage,
        _addPatternPage,
        _calculatePatternPageInitialValues,
        _generatePatternPages } from 'patternGenerators/printButtonHelpers'
import { a4 } from '..//constants'; 
import * as jsPDF  from 'jspdf'
import * as canvg  from 'canvg'
import _ from 'lodash';

class GeneratePage extends Component {

  state = {
    displayWidth: 300,
    displayHeight: 150,
    inchToPixelRatio: 1,
  }

  generatePathElement = () => {
    const sloperPath = this.generatePath();
    const displayDimensions = {x: this.state.displayWidth, y: this.state.displayHeight};
    const pathElement = createPathElement('bodiceFront', sloperPath, displayDimensions);
    const pathdims=this.calculatePathDimensions();
    return pathElement
  }

  generatePath = () => {
    // const size = this.props.size;
    const size = 'Small';
    const frontPath = front(size); 
    let backPath = back(size); 
    const backPathWidth = getWidth(backPath);
    backPath = translatePath(backPath, {x: backPathWidth, y: 0});
    const sloperPath = joinPaths(frontPath, backPath);
    return sloperPath;
  }

  getScaleFactor = () => {
    // Making this function to call the helper function. Should be named better.
    // Calling this because you can't set the state from here because this is in the render fn
    // const size = this.props.size;
    const sloperPath = this.generatePath();
    const displayDimensions = {x: this.state.displayWidth, y: this.state.displayHeight};
    return calculateScaleFactor(sloperPath, displayDimensions);
  }

  calculatePathDimensions = () => {
    const sloperPath = this.generatePath();
    const scaleFactor = this.getScaleFactor();
    const width = getWidth(sloperPath) * scaleFactor;
    const height = getHeight(sloperPath) * scaleFactor;
    return {width: width, height: height};
  }

  componentDidMount() {
    this.setDisplayHeight()
  }

  setDisplayHeight = () => {
    this.setState({displayWidth: this.patternDisplayElement.clientWidth});
    this.setState({displayHeight: this.patternDisplayElement.clientHeight});
    this.forceUpdate();
  }

  render () {
    return (
      <div className="GeneratePage">
        <div className="LogoPanel">
          <img className="LogoImage" src={logoImage} alt="Modsewing"/>
        </div>
        <div className="ContentPanelPattern">
          <div className="PatternDisplay" ref={ (patternDisplayElement) => this.patternDisplayElement = patternDisplayElement} >
            <svg  id="svg" width={`${this.calculatePathDimensions().width}px`} height={`${this.calculatePathDimensions().height}px`}>
            {this.generatePathElement() }
            </svg>
          </div>
          <div className="PrintButtonPanel">
            <PrintButton size={this.props.size} 
                         displayWidth={this.state.displayWidth} 
                         displayHeight={this.state.displayHeight}
                         scaleFactor={this.getScaleFactor()}/>
          </div>
        </div>
      </div>
    )
  }
}
export default GeneratePage;

class PrintButton extends Component {
  PrintButtonClicked = (event) => {

    const canvas = _createCanvasElement(this.props.displayWidth,
                                       this.props.displayHeight,
                                       this.props.scaleFactor);
    const initialVals = _calculatePatternPageInitialValues(canvas);
    const doc = _initializeDoc();
    const pdfTitle = "sewing"
    _addPreviewPage(doc, canvas);
    _generatePatternPages(doc, canvas, initialVals, pdfTitle);

  }

  render () {
    return (
      <div className="CuteButton PrintButton" onClick={this.PrintButtonClicked}> 
          Print Pattern
      </div>
    )
  }
}
