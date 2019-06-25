import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button'
import CountdownClock from './CountdownClock';
import querystring from "querystring";
import './App.css';

import './spotify'
import Spotify from "./spotify"


var request = require('request')

function App() {
  return (
    <div className="App">
      <header className="App-header">
          Stephanie & Tyler's #fun project
      </header>


      <div className="countdown">
          <h5> How long until we see each other again! </h5>
          <CountdownClock/>
      </div>

          <Spotify/>


    </div>
  );
}

export default App;
