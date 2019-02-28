import React, { Component } from 'react';
import 'App.css';
import logoImage from 'images/logo.png';
import { front } from 'slopers/bodice.js'

import { createPathElement, 
         calculatePixelToInchRatio } from 'svgHelpers/elements'
import * as jsPDF  from 'jspdf'
import * as canvg  from 'canvg'

class GeneratePage extends Component {

  state = {
    displayWidth: 300,
    displayHeight: 150,
  }

  generatePattern = () => {
    
    // const size = this.props.size;
    const size = 'Small';
    const frontPath = front(size); 

    const displayDimensions = {x: this.state.displayWidth, y: this.state.displayHeight};
    const pathElement = createPathElement('bodiceFront', frontPath, displayDimensions);
    const pixelToInchRatio = calculatePixelToInchRatio(frontPath, displayDimensions)
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
          <div className="PatternDisplay" id="PatternDisplay" ref={ (divElement) => this.divElement = divElement}>

          <svg>
          {this.generatePattern() }
          </svg>



          </div>
          <div className="PrintButtonPanel">
            <PrintButton size={this.props.size} displayWidth={this.state.displayWidth} displayHeight={this.state.displayHeight}/>
          </div>
        </div>
      </div>
    )
  }
}
export default GeneratePage;


class PrintButton extends Component {
  PrintButtonClicked = (event) => {


  var svg = document.getElementById('PatternDisplay').innerHTML;
  if (svg)
    svg = svg.replace(/\r?\n|\r/g, '').trim();

  var canvas = document.createElement('canvas');

  canvas.width= this.props.displayWidth;
  canvas.height = this.props.displayHeight;

  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  canvg(canvas, svg);
  var imgData = canvas.toDataURL('image/png');
  // Generate PDF
  var doc = new jsPDF('p', 'pt', 'a4');
  doc.addImage(imgData, 'PNG', 0, 0, canvas.width*3, canvas.height*3);

  
  doc.save('sewing.pdf');

  }

  render () {
    return (
      <div className="CuteButton PrintButton" onClick={this.PrintButtonClicked}> 
          Print Pattern
      </div>
    )
  }
}
