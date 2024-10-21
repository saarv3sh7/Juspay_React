import React, { useState } from 'react';
import './App.css';
import catImage from './cat.png';

function ControlFrame({ id, placeholder, value, onChange, onClick, buttonLabel }) {
  return (
    <div
      className="control-frame"
      id={id}
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', id)}
    >
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
      />
      <button onClick={onClick}>{buttonLabel}</button>
    </div>
  );
}

function App() {
  const [rotation, setRotation] = useState(0);
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [draggedElements, setDraggedElements] = useState([]);
  const [clockwiseValue, setClockwiseValue] = useState(0);
  const [anticlockwiseValue, setAnticlockwiseValue] = useState(0);
  const [xInput, setXInput] = useState(0);
  const [yInput, setYInput] = useState(0);
  const [xSetPosition, setXSetPosition] = useState(0);
  const [ySetPosition, setYSetPosition] = useState(0);

  const rotateClockwise = (degrees) => setRotation((prevRotation) => prevRotation + degrees);
  const rotateAnticlockwise = (degrees) => setRotation((prevRotation) => prevRotation - degrees);
  const updatePosition = (axis, value) => (axis === 'x' ? setXPos(value) : setYPos(value));
  const moveToPosition = () => {
    setXPos(xSetPosition);
    setYPos(ySetPosition);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const elementId = e.dataTransfer.getData('text');
    setDraggedElements((prev) => [...prev, elementId]);
  };

  const playAnimation = () => {
    draggedElements.forEach((elementId, index) => {
      setTimeout(() => {
        switch (elementId) {
          case 'rotateClockwise':
            rotateClockwise(clockwiseValue);
            break;
          case 'rotateAnticlockwise':
            rotateAnticlockwise(anticlockwiseValue);
            break;
          case 'moveX':
            updatePosition('x', xInput);
            break;
          case 'moveY':
            updatePosition('y', yInput);
            break;
          case 'setPosition':
            moveToPosition();
            break;
          default:
            break;
        }
      }, index * 1000);
    });
  };

  const resetProject = () => {
    setRotation(0);
    setXPos(0);
    setYPos(0);
    setDraggedElements([]);
    setClockwiseValue(0);
    setAnticlockwiseValue(0);
    setXInput(0);
    setYInput(0);
    setXSetPosition(0);
    setYSetPosition(0);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Sprite</h1>
      </div>
      <div className="main-content">
        {/* Left section with controls */}
        <div className="controls-section">
          <div className="control-section-title">Controls</div>
          <ControlFrame
            id="rotateClockwise"
            placeholder="Enter degrees"
            value={clockwiseValue}
            onChange={setClockwiseValue}
            onClick={() => rotateClockwise(clockwiseValue)}
            buttonLabel="Rotate Clockwise"
          />
          <ControlFrame
            id="rotateAnticlockwise"
            placeholder="Enter degrees"
            value={anticlockwiseValue}
            onChange={setAnticlockwiseValue}
            onClick={() => rotateAnticlockwise(anticlockwiseValue)}
            buttonLabel="Rotate Anti-Clockwise"
          />
          <ControlFrame
            id="moveX"
            placeholder="X Position"
            value={xInput}
            onChange={setXInput}
            onClick={() => updatePosition('x', xInput)}
            buttonLabel="Move X"
          />
          <ControlFrame
            id="moveY"
            placeholder="Y Position"
            value={yInput}
            onChange={setYInput}
            onClick={() => updatePosition('y', yInput)}
            buttonLabel="Move Y"
          />
          <div
            className="control-frame"
            id="setPosition"
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', 'setPosition')}
          >
            <input
              type="number"
              placeholder="Set X"
              value={xSetPosition}
              onChange={(e) => setXSetPosition(parseInt(e.target.value) || 0)}
            />
            <input
              type="number"
              placeholder="Set Y"
              value={ySetPosition}
              onChange={(e) => setYSetPosition(parseInt(e.target.value) || 0)}
            />
            <button onClick={moveToPosition}>Set Position</button>
          </div>
          <div className="action-buttons">
            <button onClick={playAnimation}>Play Animation</button>
            <button className="reset-button" onClick={resetProject}>Reset</button>
          </div>
        </div>

        {/* Right section for drop zone and sprite */}
        <div id="drop-zone" className="drop-zone" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          {draggedElements.map((elementId, index) => (
            <div key={index} className="dropped-control-frame">{elementId}</div>
          ))}
          {draggedElements.length === 0 && "Drag and Drop Here"}
        </div>
        <div className="cat-container" style={{ transform: `rotate(${rotation}deg) translate(${xPos}px, ${yPos}px)` }}>
          <img src={catImage} alt="Cat Sprite" className="cat-image" />
        </div>
      </div>
    </div>
  );
}

export default App;
