var castle = function() {
	return {
		posX : 50,
		posY : 50,
		neighbours : [],

		drawMe : function() {
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