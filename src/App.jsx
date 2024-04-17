import React, { createRef } from 'react'
import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App(props) {
  const [color, setColor] = useState("null");
  const [erase, setErase] = useState(false);
  const [width, setWidth] = useState(11);

  const canvasRef = useRef(null);

  return (
    <>
      <h1>Paint App</h1>
      <ColorPicker setColor={setColor}/>
      <EraseButton erase={erase} setErase={setErase}/>
      <WidthSlider setWidth={setWidth}/>
      <ClearButton canvasRef={canvasRef}/>
      <Canvas ref={canvasRef} color={color} erase={erase} width={width}/>
    </>
  )
}

function ColorPicker(props) {

  function handleChange(value) {
    console.log("Color Picker changed!");
    props.setColor(value);
    console.log("Color =", value);
  }

  return (
    <>
      <input id="color-picker" 
        type="color" 
        onChange={event => handleChange(event.target.value)}></input>
    </>
  )
}

function EraseButton(props) {

  function handleClick() {
    props.setErase(!props.erase);
    console.log("Erase Button clicked! erase =", !props.erase);
  }

  return (
    <>
      <button id="erase-button" onClick={handleClick}>
        {props.erase ? "Draw" : "Erase"}
      </button>
    </>
  )
}

function WidthSlider(props) {

  function handleChange(value) {
    console.log("Width Slider changed!");
    props.setWidth(value);
    console.log("width =", value);
  }

  return (
    <>
      <input id="width-slider" type="range" min="1" max="50" defaultValue="11"
        onChange={event => handleChange(event.target.value)}></input>
    </>
  )
}

function ClearButton(props) {

  function handleClick() {
    console.log(props);
    const canvas = props.canvasRef.current;
    console.log(canvas);
    const context = canvas.getContext('2d');

    context.clearRect(0,0,canvas.width,canvas.height);
  }

  return (
    <>
      <button id="clear-button" onClick={handleClick}>Clear All</button>
    </>
  )
}

const Canvas = React.forwardRef((props, ref) => {
  const [isDragging, setDragging] = useState(false);

  // const canvasRef = useRef(null);
  // ref = useRef(null);

  function handleMove(event) {
    if (isDragging) {
      // const context = canvasRef.current.getContext('2d');
      const context = ref.current.getContext('2d');
      if (!props.erase) {
        context.strokeStyle = props.color;
      } else {
        context.strokeStyle = "white";
      }
      context.lineWidth = props.width;
      
      context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      context.stroke();
    }
  }

  function handleMouseDown() {
    // const context = canvasRef.current.getContext('2d');
    const context = ref.current.getContext('2d');
    context.beginPath();
    setDragging(true);
  }

  function handleMouseUp() {
    setDragging(false);
  }

  return (
    <>
      <canvas id="canvas-element" width="800" height="600"
        // ref={canvasRef}
        ref={ref}
        onMouseMove={event => handleMove(event)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
      </canvas>
    </>
  )
});

export default App
