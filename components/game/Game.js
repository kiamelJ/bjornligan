import React, { useEffect, useRef } from "react";

import { useKeyPress } from "./hooks/movement";

import {Grid} from "./Grid"
import {Snake} from "./Snake";



function Game() {


  const canvasRef = useRef(null);
  let snake = new Snake(15, 15, "cool orm");
  let grid = new Grid(450, 450, 15);

  useInterval(() => {
      if(!snake.death)
      {
        snake.updatePos();
      }
    }, 100 * 1);


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const render = () => {
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText("Points: " + snake.points, canvas.width/2, (canvas.height - 25));
      snake.checkCollision();
      if(snake.death)
      {
        ctx.font = "100px Arial";
        ctx.fillText("Död", canvas.width/2, canvas.height - 50)
      }
      

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
    width="450"
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