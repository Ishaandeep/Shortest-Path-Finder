import React, { useEffect, useState } from "react";
import logo from "./path-logo-2.jpg";
import PathfindingVisualizer from "./PathfindingVisualizer";
import "./PathfindingVisualizer.css";
import "../App.css";
import Modal from "../components/Modal";

const PathfindingWrapper = () => {
  const [key, setKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    // Check if user is visiting for the first time
    const isFirstVisit = localStorage.getItem("hasVisited") === null;
    if (isFirstVisit) {
      setShowModal(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const resetComponent = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Modal isVisible={showModal} onClose={handleCloseModal} />
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
