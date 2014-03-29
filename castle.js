var castle = function() {
	return {
		posX : 50,
		posY : 50,

		drawMe : function() {
			ctx.drawImage(castleImg, this.posX, this.posY);
		}
	};
}