
export class Grid {
    constructor(width, height, gridsize){
        this.width = width;
        this.height = height;
        this.gridsize = gridsize;
    }

    draw(ctx) {

        for(let i = 0; i < this.height / this.gridsize; i++)
        {
            for(let j = 0; j < this.width / this.gridsize; j++)
            {
                ctx.beginPath();
                ctx.rect(j * this.gridsize, i * this.gridsize, this.gridsize, this.gridsize);
                ctx.stroke();
            }
        }
    }

}