import React, { useEffect, useRef } from "react";

import { useKeyPress } from "./hooks/movement";

import {Grid} from "./Grid"
import {Snake} from "./Snake";



function Game() {

  const up = useKeyPress("w");
  const left = useKeyPress("a");
  const down = useKeyPress("s");
  const right = useKeyPress("d");


  const canvasRef = useRef(null);

  let snake = new Snake(5, 5);
  let grid = new Grid(300, 300, 30);

  if(up)
  {
    snake.moveSnake("w");
    console.log("up");
  }
  if(left)
  {
    snake.moveSnake("a");
    console.log("left");
  }
  if(down)
  {
    snake.moveSnake("s");
    console.log("down");
  }
  if(right)
  {
    snake.moveSnake("d");
    console.log("right");
  }

  useInterval(() => {
        snake.updatePos();
    }, 1000 * 1);


  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      grid.draw(ctx);
      snake.drawSnake(ctx);


      requestAnimationFrame(render);
    }
    render();
  }, [])

  
  
  return (
    <><canvas
    id="canvas"
    ref={canvasRef}
    height="300"
    width="300"
    />
    

    
    </>
      


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