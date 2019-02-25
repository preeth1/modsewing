import React, { Component } from 'react';
import 'App.css';
import logoImage from 'images/logo.png';
import { front } from 'slopers/bodice.js'

import { createPathElement } from 'svgHelpers/elements'
import * as jsPDF  from 'jspdf'
import canvg from 'canvg'

class GeneratePage extends Component {

  state = {
    displayWidth: 300,
    displayHeight: 150,
  }

  generatePattern = () => {
    
    // const size = this.props.size;
    const size = 'Small';
    const frontPath = front(size); 

    const displayDimensions = {x: this.state.displayWidth, y: this.state.displayHeight}
    let pathElement = createPathElement('bodiceFront', frontPath, displayDimensions)
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
  var svg = document.getElementById('PatternDisplay').innerHTML;
  var canvas = document.createElement('canvas');
  canvg(canvas, svg);

  var imgData = canvas.toDataURL('image/png');
  // Generate PDF
  var doc = new jsPDF('p', 'pt', 'a4');
  doc.addImage(imgData, 'PNG', 10, 10, 100, 100);
  doc.save('test.pdf');
  console.log("print button clicked")
  var doc = new jsPDF()
  doc.save('sewing.pdf')
  }

  render () {
    return (
      <div className="CuteButton PrintButton" onClick={this.PrintButtonClicked}> 
          Print Pattern
      </div>
    )
  }
}
