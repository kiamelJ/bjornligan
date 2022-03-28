

import { useKeyPress } from "./hooks/movement";

export class Snake {
    constructor(startX, startY, id){
        console.log("constructor");
        this.fullSnake = [];
        this.fullSnake.push(new SnakePart(startX, startY));
        this.direction = 0;
        this.headX = startX;
        this.headY = startY;
        this.currentDirection = 1;
        this.id = id;
        this.keyDown = false;
        this.key = "a";
        this.food = new Food(Math.floor(Math.random()*19) + 1, Math.floor(Math.random()*19) + 1)
    }


    drawSnake(ctx) {
        for(let i = 0; i < this.fullSnake.length; i++)
        {
            this.fullSnake[i].draw(ctx);
        }
        this.food.draw(ctx);
    }
    


      

    moveSnake(){
        
        window.addEventListener("keydown", (event) => {
            this.keyDown = true;
            this.key = event.key;
        });
        window.addEventListener("keyup", (event) => {
            this.keyDown = false;
        });


        if(this.key == "w")
        {
            console.log("w");
            this.currentDirection = 0;
        }
        if(this.key == "a")
        {
            this.currentDirection = 1;
        }
        if(this.key == "s")
        {
            this.currentDirection = 2;
        }
        if(this.key == "d")
        {
            this.currentDirection = 3;
        }
    }

    updatePos(){
        if(this.currentDirection == 0){
            this.headY--;
            this.fullSnake.unshift(new SnakePart(this.headX, this.headY))
            if(this.headX == this.food.x && this.headY == this.food.y)
            {
                this.food.x = Math.floor(Math.random()*19) + 1;
                this.food.y = Math.floor(Math.random()*19) + 1; 
                console.log("new food x: ", this.food.x, " y: ", this.food.y);
            }
            else{
                this.fullSnake.pop();
            }
        }
        if(this.currentDirection == 1){
            this.headX--;
            this.fullSnake.unshift(new SnakePart(this.headX, this.headY))
            if(this.headX == this.food.x && this.headY == this.food.y)
            {
                this.food.x = Math.floor(Math.random()*19) + 1;
                this.food.y = Math.floor(Math.random()*19) + 1; 
                console.log("new food x: ", this.food.x, " y: ", this.food.y);
            }
            else{
                this.fullSnake.pop();
            }
        }
        if(this.currentDirection == 2){
            this.headY++;
            this.fullSnake.unshift(new SnakePart(this.headX, this.headY))
            if(this.headX == this.food.x && this.headY == this.food.y)
            {
                this.food.x = Math.floor(Math.random()*19) + 1;
                this.food.y = Math.floor(Math.random()*19) + 1; 
                console.log("new food x: ", this.food.x, " y: ", this.food.y);
            }
            else{
                this.fullSnake.pop();
            }
        }
        if(this.currentDirection == 3){
            this.headX++;
            this.fullSnake.unshift(new SnakePart(this.headX, this.headY))
            if(this.headX == this.food.x && this.headY == this.food.y)
            {
                this.food.x = Math.floor(Math.random()*19) + 1;
                this.food.y = Math.floor(Math.random()*19) + 1; 
                console.log("new food x: ", this.food.x, " y: ", this.food.y);
            }
            else{
                this.fullSnake.pop();
            }
        }

        if(this.headX < 0 || this.headY < 0 || this.headX > 19 || this.headY > 19)
        {
            console.log("du dör");
        }

    }
}

class Food {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.x * 30, this.y * 30, 30, 30);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }

}


class SnakePart {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.x * 30, this.y * 30, 30, 30);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();
    }
}