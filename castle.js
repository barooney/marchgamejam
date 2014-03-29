var castle = function() {
    return {
        posX: 50,
        posY: 50,
        neighbours: [],
        id: null,
        castleImg: null,

        drawMe: function() {
            // draw the way to the neighbors
            ctx.strokeStyle = "#999";
            ctx.lineWidth = 10;
            for (var neighboursIndex in this.neighbours) {
                var curNeighbours = this.neighbours[neighboursIndex];
                ctx.beginPath();
                ctx.moveTo(this.posX, this.posY);
                ctx.lineTo(curNeighbours.posX, curNeighbours.posY);
                ctx.stroke();
            }
            this.castleImg = $(castleImg);
            this.castleImg.data('index', this.id);
            this.castleImg.click(function() {
                alert('test');
            });
            // draw the castle itself
            ctx.drawImage(castleImg, this.posX - 20, this.posY - 20);
        }
    };
};