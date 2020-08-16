import React from 'react';
import { Messenger } from './Components';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>
        Messenger
        <span role="img" aria-label="fire">
          🔥
        </span>
      </h1>
      <Messenger />
    </div>
  );
}

export default App;
