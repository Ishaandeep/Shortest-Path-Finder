import React, { useState } from "react";
import logo from "./path-logo-2.jpg";
import PathfindingVisualizer from "./PathfindingVisualizer";
import "./PathfindingVisualizer.css";
import "../App.css";

const PathfindingWrapper = () => {
  const [key, setKey] = useState(0);

  const resetComponent = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <div className="header">
        <img src={logo} alt="logo" className="App-logo" />
        <h1>Shortest Path Finder</h1>
      </div>
      <PathfindingVisualizer key={key} />
      <button className="button button-reset" onClick={resetComponent}>
        Reset Grid
      </button>
    </>
  );
};

export default PathfindingWrapper;
