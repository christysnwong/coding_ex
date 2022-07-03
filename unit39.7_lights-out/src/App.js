import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <h2>Lights Out!</h2>

      <p>Try to turn off all the lights</p>

      <Board />
    </div>
  );
}

export default App;
