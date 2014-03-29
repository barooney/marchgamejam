var castle = function() {
	return {
		posX : 50,
		posY : 50,
		neighbours : [],
		owner : 2,

		drawMe : function() {
			ctx.beginPath();
			ctx.lineWidth = 0.1;
			
			switch (this.owner) {
			case 1:
				ctx.fillStyle = "rgba(255,0,0,0.5)";
				ctx.arc(this.posX, this.posY, 28, 00, Math.PI * 2, false);
				ctx.fill();
				break;
			case 2:
				ctx.fillStyle = "rgba(0,255,0,0.5)";
				ctx.arc(this.posX, this.posY, 28, 00, Math.PI * 2, false);
				ctx.fill();
				break;
			case 3:
				ctx.fillStyle = "rgba(0,0,255,0.5)";
				ctx.arc(this.posX, this.posY, 28, 00, Math.PI * 2, false);
				ctx.fill();
				break;

			
			}

			// draw the castle itself
			ctx.drawImage(castleImg, this.posX - 20, this.posY - 20);
		},

		drawStreets : function() {
			// draw the way to the neighbors
			ctx.strokeStyle = "#999";
			ctx.lineWidth = 10;
			for (neighboursIndex in this.neighbours) {
				var curNeighbours = this.neighbours[neighboursIndex];
				ctx.beginPath();
				ctx.moveTo(this.posX, this.posY);
				ctx.lineTo(curNeighbours.posX, curNeighbours.posY);
				ctx.stroke();
			}
		},

		isInside : function(x, y) {
			return (x >= this.posX - 20) && (x <= this.posX + 20)
					&& (y > this.posY - 20) && (y < this.posY + 20);
		}
	};
};