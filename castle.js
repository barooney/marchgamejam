var castle = function() {
	return {
		posX : 50,
		posY : 50,
		neighbours : [],
		owner : 1, 

		drawMe : function() {
			switch (this.owner) {
			case 1:
			ctx.beginPath();
			ctx.lineWidth = 0.1;
			ctx.fillStyle = "rgba(255,0,0,0.5)";
			ctx.arc( this.posX, this.posY, 28, 00,Math.PI*2,false);
			ctx.fill();
			ctx.stroke();
			break;
			case 2:
			ctx.fillStyle = "#0F0";
			ctx.fillRect( this.posX - 20, this.posY - 20, 40, 40);
			break;
			case 3:
			ctx.fillStyle = "#00F";
			ctx.fillRect( this.posX - 20, this.posY - 20, 40, 40);
			break;
			}
			
			// draw the castle itself
			ctx.drawImage(castleImg, this.posX - 20, this.posY - 20);
		},
	
		drawStreets : function() {
			// draw the way to the neighbors
			ctx.strokeStyle = "#999";
			ctx.lineWidth=10;
			for (neighboursIndex in this.neighbours) {
				var curNeighbours = this.neighbours[neighboursIndex];
				ctx.beginPath();
				ctx.moveTo(this.posX, this.posY);
				ctx.lineTo(curNeighbours.posX, curNeighbours.posY);
				ctx.stroke();
			}
		}
	};
};
