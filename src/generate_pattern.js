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
    pixelToInchRatio: 1,
  }

  generatePathElement = () => {
    
    // const size = this.props.size;
    const size = 'Small';
    const frontPath = front(size); 

    const displayDimensions = {x: this.state.displayWidth, y: this.state.displayHeight};
    const pathElement = createPathElement('bodiceFront', frontPath, displayDimensions);
    return pathElement
  }

  generatePixelToInchRatio = () => {
    // Making this function to call the helper function. Should be named better.
    // Calling this because you can't set the state from here because this is in the render fn
    // const size = this.props.size;
    const size = 'Small';
    const frontPath = front(size); 

    const displayDimensions = {x: this.state.displayWidth, y: this.state.displayHeight};
    return calculatePixelToInchRatio(frontPath, displayDimensions)
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
          {this.generatePathElement() }
          </svg>



          </div>
          <div className="PrintButtonPanel">
            <PrintButton size={this.props.size} 
                         displayWidth={this.state.displayWidth} 
                         displayHeight={this.state.displayHeight}
                         pixelToInchRatio={this.generatePixelToInchRatio()}/>
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

  let imageWidth = canvas.width*this.props.pixelToInchRatio;
  let imageHeight = canvas.height*this.props.pixelToInchRatio;

  imageWidth = 30;
  imageHeight = 40;


  // const orientation = 'p'; // portrait ('p') or landscape ('l')
  // const unit = 'in'; // points ('pt'), 'mm', 'cm', 'in'
  // const format = 'a4'; // 'a3', 'a4','a5' ,'letter' ,'legal'
  doc.addImage(imgData, 'PNG', 0, 0, imageWidth, imageHeight);

  
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
