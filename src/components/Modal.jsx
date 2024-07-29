import React from "react";
import "./Modal.css";

const Modal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Getting Started</h2>
        <ul>
          <li>
            Click on the grid to place obstacles between the start (blue) and
            end (green) nodes.
          </li>
          <li>Click "Find Shortest Path" to visualize the path.</li>
          <li>Use the "Reset" button at the bottom to start over.</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
