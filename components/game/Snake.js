

export class Snake {
    constructor(startX, startY){
        this.startSnake = new SnakePart(startX, startY);
        this.direction = 0;
        this.headX = startX;
        this.headY = startY;
        this.currentDirection = "w";
    }



    drawSnake(ctx) {
        // for(let i = 0; i < this.fullsnake.length; i++)
        // {
        //     this.fullsnake[i].draw(ctx);
        // }
        this.startSnake.draw(ctx);
    }

    moveSnake(dir){
        this.currentDirection = dir;
    }

    updatePos(){
        console.log("movement");
        if(this.currentDirection == "w"){
            console.log("up");
            this.startSnake.y--;
        }
        if(this.currentDirection == "a"){
            console.log("left");
            this.startSnake.x--;
        }
        if(this.currentDirection == "s"){
            console.log("down");
            this.startSnake.y++;
        }
        if(this.currentDirection == "d"){
            console.log("right");
            this.startSnake.x++;
        }

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