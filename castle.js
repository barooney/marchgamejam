var castle = {
		posX : 50,
		posY : 50,
		
		drawMe : function() {
			ctx.drawImage(img1, this.posX, this.posY);
		},

		clone : function() {
			return {
				posX : this.posX,
				posY : this.posY,
				drawMe : this.drawMe
			};
		}
}