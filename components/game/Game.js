import React, { useEffect, useRef } from "react";

import { useKeyPress } from "./hooks/movement";

import {Grid} from "./Grid"
import {Snake} from "./Snake";



function Game() {


  const canvasRef = useRef(null);
  let snake = new Snake(5, 5, "cool orm");
  let grid = new Grid(600, 600, 30);

  useInterval(() => {
        snake.updatePos();
    }, 100 * 1);



  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      grid.draw(ctx);
      snake.drawSnake(ctx);
      snake.moveSnake();

      requestAnimationFrame(render);
    }
    render();
  }, [])

  
  
  return (
    <canvas
    id="canvas"
    ref={canvasRef}
    height="600"
    width="600"
    />
    

    


  )
}

export default Game

function useInterval(callback, delay) {
      const savedCallback = useRef();
    
      // Remember the latest callback.
      useEffect(() => {
        savedCallback.current = callback;
      }, [callback]);
    
      // Set up the interval.
      useEffect(() => {
        function tick() {
          savedCallback.current();
        }
        if (delay !== null) {
          let id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
      }, [delay]);
    }