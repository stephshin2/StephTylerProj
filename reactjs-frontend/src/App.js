import React from 'react';
import logo from './logo.svg';

import CountdownClock from './CountdownClock';

import './App.css';

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


            <div>
            </div>


        </div>
    );
}

export default App;
