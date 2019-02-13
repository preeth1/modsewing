import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import logoImage from './images/logo.png';
import { absMovePen,
         addAbsLine,
       } from './svgHelpers/pathHelpers.jsx'

import {createPathElement} from './svgHelpers/elementHelpers.jsx'

class GeneratePage extends Component {

  preethi_fn = () => {
    let pathString = "";
    pathString = absMovePen(pathString, {x: 5, y: 12})
    pathString = addAbsLine(pathString, {x: 10, y: 3})
    pathString = addAbsLine(pathString, {x: 53, y: 63})
    pathString = addAbsLine(pathString, {x: 2, y: 69})
    pathString = addAbsLine(pathString, {x: 66, y: 9})
    let pathElement = createPathElement('id', pathString)
    console.log(pathString)
    return pathElement

  }

  render () {
    return (
      <div className="GeneratePage">
        <div className="LogoPanel">
          <img className="LogoImage" src={logoImage} alt="Modsewing"/>
        </div>
        <div className="ContentPanelPattern">
          <div className="PatternPreview">

          <svg>
          {this.preethi_fn() }
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
  HandlePrint = (event) => {
    console.log("print clicked")
  }

  render () {
    return (
      <div className="CuteButton PrintButton" onClick={this.HandlePrint}>
        <Link to={'/generate_pattern'}>  
          Print Pattern
        </Link> 
      </div>
    )
  }
}
