import React, { useState, useEffect } from "react";

import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithm/dijkstra";

import "./PathfindingVisualizer.css";
import "../App.css";

const START_NODE_ROW_LARGE = 10;
const START_NODE_COL_LARGE = 15;
const FINISH_NODE_ROW_LARGE = 10;
const FINISH_NODE_COL_LARGE = 35;

const START_NODE_ROW_SMALL = 12;
const START_NODE_COL_SMALL = 1;
const FINISH_NODE_ROW_SMALL = 12;
const FINISH_NODE_COL_SMALL = 12;

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [rows, setRows] = useState(20); // Default to larger display
  const [cols, setCols] = useState(50); // Default to larger display
  const [startNodeRow, setStartNodeRow] = useState(START_NODE_ROW_LARGE);
  const [startNodeCol, setStartNodeCol] = useState(START_NODE_COL_LARGE);
  const [finishNodeRow, setFinishNodeRow] = useState(FINISH_NODE_ROW_LARGE);
  const [finishNodeCol, setFinishNodeCol] = useState(FINISH_NODE_COL_LARGE);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Assuming mobile width threshold
        console.log("small screen");
        setRows(24);
        setCols(14);
        setStartNodeRow(START_NODE_ROW_SMALL);
        setStartNodeCol(START_NODE_COL_SMALL);
        setFinishNodeRow(FINISH_NODE_ROW_SMALL);
        setFinishNodeCol(FINISH_NODE_COL_SMALL);
      } else {
        console.log("big screen");
        setRows(20);
        setCols(50);
        setStartNodeRow(START_NODE_ROW_LARGE);
        setStartNodeCol(START_NODE_COL_LARGE);
        setFinishNodeRow(FINISH_NODE_ROW_LARGE);
        setFinishNodeCol(FINISH_NODE_COL_LARGE);
      }
    };

    handleResize(); // Set initial values
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const initialGrid = getInitialGrid(
      rows,
      cols,
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol
    );
    console.log(initialGrid);
    setGrid(initialGrid);
  }, [rows, cols, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol]);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <>
      <button className="button" onClick={visualizeDijkstra}>
        Find Shortest Path
      </button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={handleMouseUp}
                    row={row}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

const getInitialGrid = (
  rows,
  cols,
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol
) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(
        createNode(
          col,
          row,
          startNodeRow,
          startNodeCol,
          finishNodeRow,
          finishNodeCol
        )
      );
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (
  col,
  row,
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol
) => {
  return {
    col,
    row,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default PathfindingVisualizer;
