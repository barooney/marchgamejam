var castle = function() {
	return {
		posX : 50,
		posY : 50,
		neighbors : [],

		drawMe : function() {
			ctx.drawImage(castleImg, this.posX - 20, this.posY - 20);
		}
	};
};