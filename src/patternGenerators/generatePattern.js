import React, { Component } from 'react';
import 'App.css';
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
        _calculatePatternPageInitialValues,
        _generatePatternPages } from 'patternGenerators/printButtonHelpers'

class GeneratePage extends Component {

  state = {
    displayWidth: 300,
    displayHeight: 150,
  }

  generatePathElement = () => {
    const sloperPath = this.generatePath();
    const displayDimensions = {x: this.state.displayWidth, y: this.state.displayHeight};
    const pathElement = createPathElement('bodiceFront', sloperPath, displayDimensions);
    return pathElement
  }

  generatePath = () => {
    const frontPath = front(this.props.measurements);
    let backPath = back(this.props.measurements);
    const backPathWidth = getWidth(backPath);
    backPath = translatePath(backPath, {x: backPathWidth, y: 0});
    const sloperPath = joinPaths(frontPath, backPath);
    return sloperPath;
  }

  getScaleFactor = () => {
    // Making this function to call the helper function. Should be named better.
    // Calling this because you can't set the state from here because this is in the render fn
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
    this.setState({displayWidth: this.PatternDisplayElement.clientWidth});
    this.setState({displayHeight: this.PatternDisplayElement.clientHeight});
    this.forceUpdate();
  }

    render () {
    return (
      <div className="TutorialPage">
        <div className="TutorialPanel">
          <div className="DescriptionPanel">
            <div className="DescriptionTitle">
              Your pattern
            </div>
            <div className="DescriptionText">
              Print it out!
            </div>
            <div className="InputPanel">
              <PrintButton measurements={this.props.measurements}
                           displayWidth={this.state.displayWidth}
                           displayHeight={this.state.displayHeight}
                           scaleFactor={this.getScaleFactor()}/>
              </div>
              <div className="ErrorPanel">
              </div>
            </div>
            <div className="PatternDisplay" id="PatternDisplay" ref={ (PatternDisplayElement) => this.PatternDisplayElement = PatternDisplayElement}>
            <svg width={`${this.calculatePathDimensions().width}px`} height={`${this.calculatePathDimensions().height}px`}>
             {this.generatePathElement() }
             </svg>
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
      <div className="CuteButton PrintBtn" onClick={this.PrintButtonClicked}>
          Download PDF
      </div>
    )
  }
}
