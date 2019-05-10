import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import 'App.css';
import titleImage from 'images/title.svg';
import GeneratePage from 'patternGenerators/generatePattern.js';
import TutorialPage from 'measurementTutorial.js';
import history from 'history.js';
import { get_measurements } from 'constants.js';
import _ from 'lodash';

class App extends Component {
  state = {
    measurements: get_measurements({}),
  }

  handleLogoClick = (event) => {
    history.replace('/')
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <div className="LogoPanel" onClick={this.handleLogoClick}>
            <img className="TitleImage" src={titleImage} alt="Modsewing"/>
          </div>
          <Route exact path='/' render={(props) =>
            <TutorialPage history={history} measurements={this.state.measurements}/>}
          />
          <Route exact path='/generatePattern' render={(props) =>
            <GeneratePage measurements={this.state.measurements}/>}
          />
        </div>
      </Router>
    );
  }
}

export default App;
