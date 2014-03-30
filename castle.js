var castle = function() {
    return {
        posX: 50,
        posY: 50,
        neighbours: [],
        selectedDirection: 0,
        owner: 1,

        drawMe: function() {
            ctx.beginPath();
            ctx.lineWidth = 0.1;

            switch (this.owner) {
                case 0:
                    ctx.fillStyle = "rgba(0,0,0,0)";
                    break;
                case 1:
                    ctx.fillStyle = "rgba(255,0,0,0.5)";
                    break;
                case 2:
                    ctx.fillStyle = "rgba(0,0,255,0.5)";
                    break;
                case 3:
                    ctx.fillStyle = "rgba(0,255,0,0.5)";
                    break;
                    // draw the castle itself
            }
            // ctx.arc(this.posX, this.posY, 28, 0, Math.PI * 2, false);
            // ctx.fill();
            ctx.drawImage(castleImg, this.posX - 20, this.posY - 20);
        },

        drawDirection: function() {
            ctx.beginPath();
            ctx.lineWidth = 0.1;
            ctx.fillStyle = "rgba(0,0,0,1)";
            var targetCastle = this.neighbours[this.selectedDirection];
            for (var i = 0.25; i < 0.50; i += 0.05) {
                var distance = i;
                directionMarkerPosX = (1.0 - distance) * this.posX + (distance) * targetCastle.posX;
                directionMarkerPosY = (1.0 - distance) * this.posY + (distance) * targetCastle.posY;
                ctx.arc(directionMarkerPosX, directionMarkerPosY, 5 - (10 * i), 0,
                    Math.PI * 2, false);

                ctx.fill();
                ctx.stroke();
            }
        },

        drawStreets: function() {
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
        },

        drawFlag: function() {
            if (this.owner > 0) {
                var img;
                switch (this.owner) {
                    case 1:
                        img = flagImgs1[animFlagFrameCtr];
                        break;
                    case 2:
                        img = flagImgs2[animFlagFrameCtr];
                        break;
                    case 3:
                        img = flagImgs3[animFlagFrameCtr];
                        break;
                }
                ctx.drawImage(img, this.posX - 20, this.posY - 35);
            }
        },

        isInside: function(x, y) {
            return (x >= this.posX - 20) && (x <= this.posX + 20) && (y > this.posY - 20) && (y < this.posY + 20);
        },

        nextTarget: function() {
            this.selectedDirection++;
            this.selectedDirection = this.selectedDirection % this.neighbours.length;
        }
    };
};