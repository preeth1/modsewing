import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import history from './history';
import logoImage from './images/logo.png';
import { absMovePen,
         addAbsLine,
       } from './svgHelpers/pathHelpers'

import {createPathElement} from './svgHelpers/elementHelpers'
import {STANDARD_MEASUREMENTS} from './constants'
import _ from 'lodash';
import {calculateBackCoordinates} from './bodice'

class GeneratePage extends Component {

  generate_sloper = (selected_size) => {
    const measurements = _.find(STANDARD_MEASUREMENTS, {size: selected_size}).measurements;
    
    const measurement_obj = {}
    _.forEach(measurements, function(measurements_entry) {
      measurement_obj[measurements_entry.name] = measurements_entry.value
    });
    let pathString = calculateBackCoordinates({measurements: measurement_obj});
    let pathElement = createPathElement('id', pathString)
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
          {this.generate_sloper(this.props.size) }
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
