import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Countries from "./containers/Countries/countries"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Countries/>
      </div>
    );
  }
}

export default App;