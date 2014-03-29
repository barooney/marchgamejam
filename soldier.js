var soldier = function() {
	return {
		startingCastle : null,
		targetCastle : null,
		progress : 0,
		owner : 1,

		getPosX : function() {
			return (1.0 - this.progress) * this.startingCastle.posX
					+ (this.progress) * this.targetCastle.posX;
		},
		getPosY : function() {
			return (1.0 - this.progress) * this.startingCastle.posY
					+ (this.progress) * this.targetCastle.posY;
		},

		drawMe : function() {
			switch (this.owner) {
			case 1:
				ctx.drawImage(soldierImgs1[animFrame], this.getPosX() - 15,
						this.getPosY() - 15);
				break;
			case 2:
				ctx.drawImage(soldierImgs2[animFrame], this.getPosX() - 15,
						this.getPosY() - 15);
				break;
			case 3:
				ctx.drawImage(soldierImgs3[animFrame], this.getPosX() - 15,
						this.getPosY() - 15);
				break;
			}
		},

		updateCastles : function() {
			if (this.progress > 0.999) {
				this.startingCastle = this.targetCastle;
				this.targetCastle = this.startingCastle.neighbours[this.startingCastle.selectedDirection];
				this.progress = 0;
				this.startingCastle.owner = this.owner;
			}
		}
	};
};