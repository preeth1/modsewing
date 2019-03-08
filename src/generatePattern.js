import React, { Component } from 'react';
import 'App.css';
import logoImage from 'images/logo.png';
import { front } from 'slopers/bodice.js'

import { createPathElement, 
         calculateInchToPixelRatio } from 'svgHelpers/elements'
import { a4 } from './constants'; 
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
    
    // const size = this.props.size;
    const size = 'Small';
    const frontPath = front(size); 

    const displayDimensions = {x: this.state.displayWidth, y: this.state.displayHeight};
    const pathElement = createPathElement('bodiceFront', frontPath, displayDimensions);
    return pathElement
  }

  generateinchToPixelRatio = () => {
    // Making this function to call the helper function. Should be named better.
    // Calling this because you can't set the state from here because this is in the render fn
    // const size = this.props.size;
    const size = 'Small';
    const frontPath = front(size); 

    const displayDimensions = {x: this.state.displayWidth, y: this.state.displayHeight};
    return calculateInchToPixelRatio(frontPath, displayDimensions)
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
      <div className="GeneratePage">
        <div className="LogoPanel">
          <img className="LogoImage" src={logoImage} alt="Modsewing"/>
        </div>
        <div className="ContentPanelPattern">
          <div className="PatternDisplay" id="PatternDisplay" ref={ (PatternDisplayElement) => this.PatternDisplayElement = PatternDisplayElement}>
            <svg>
            {this.generatePathElement() }
            </svg>
          </div>
          <div className="PrintButtonPanel">
            <PrintButton size={this.props.size} 
                         displayWidth={this.state.displayWidth} 
                         displayHeight={this.state.displayHeight}
                         inchToPixelRatio={this.generateinchToPixelRatio()}/>
          </div>
        </div>
      </div>
    )
  }
}
export default GeneratePage;


class PrintButton extends Component {
  PrintButtonClicked = (event) => {

    const _createCanvasElement = () => {
      var svg = document.getElementById('PatternDisplay').innerHTML;
      var canvas = document.createElement('canvas');
      canvas.width = this.props.displayWidth;
      canvas.height = this.props.displayHeight;
      canvg(canvas, svg);
      const width = canvas.width/this.props.inchToPixelRatio
      const height = canvas.height/this.props.inchToPixelRatio;
      const image = canvas.toDataURL('image/png');
      return {width: width, height: height, image: image};
    }

    const _initializeDoc = () => {
      const orientation = 'p'; // portrait ('p') or landscape ('l')
      const unit = 'in'; // points ('pt'), 'mm', 'cm', 'in'
      const format = 'a4'; // 'a3', 'a4','a5' ,'letter' ,'legal'
      return new jsPDF(orientation, unit, format);
    }

    const _addPreviewPage = (doc, canvas) => {
      doc.setFontSize(22)
      doc.text(2, 2, 'Pattern Title Page')
      doc.addImage(canvas.image, 'PNG', 0, 0, 5, 5);
    }

    const _addPatternPage = (doc, canvas, topLeftX, topLeftY, heightPage, widthPage) => {
      doc.addPage();
      doc.addImage(canvas.image, 'PNG', topLeftX, topLeftY, canvas.width, canvas.height);
      doc.setFontSize(50)
      doc.setTextColor(153, 204, 255);
      doc.text(1, 2, 'Row: ' + heightPage)
      doc.text(1, 3, 'Column: ' + widthPage)
    }

    const _calculatePatternPageValues = (canvas) => {
      const numberHeightPages = Math.ceil(canvas.height / a4.height);
      const numberWidthPages = Math.ceil(canvas.width / a4.width);
      let initialTopLeftX = (numberWidthPages * a4.width - canvas.width) / 2;
      let initialTopleftY = (numberHeightPages * a4.height - canvas.height) / 2;
      return {numberHeightPages: numberHeightPages,
              numberWidthPages: numberWidthPages,
              initialTopLeftX: initialTopLeftX,
              initialTopleftY: initialTopleftY
            };
    }

    const _generatePatternPages = (doc, canvas, initialVals, pdfTitle) => {
      _.times(initialVals.numberHeightPages, (heightPage) => {
      _.times(initialVals.numberWidthPages, (widthPage) => {
        let topLeftX = initialVals.initialTopLeftX - (a4.width * heightPage);
        let topLeftY = initialVals.initialTopleftY - (a4.height * widthPage);
        _addPatternPage(doc, canvas, topLeftX, topLeftY, heightPage, widthPage)
      });
    });
    doc.save(pdfTitle + ".pdf");
    }

    const canvas = _createCanvasElement();
    const initialVals = _calculatePatternPageValues(canvas);
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
