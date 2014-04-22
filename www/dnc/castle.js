var castle = function() {
	aCastle = {
	  posX : 50,
	  posY : 50,
	  neighbours : [],
	  selectedDirection : 0,
	  owner : 1,
	  dmg : 0,

	  drawMe : function() {
	  	var imageToDraw = null;
		  switch (this.dmg) {
		  case 0:
		  	imageToDraw = castleDmg0Img;
			  break;
		  case 1:
		  	imageToDraw = castleDmg1Img;
			  break;
		  case 2:
		  	imageToDraw = castleDmg2Img;
			  break;
		  default:
		  	imageToDraw = castleDmg3Img;
			  break;
		  }
		  ctx.drawImage(imageToDraw, this.posX - 20 + OFFSET_X, this.posY - 30 + OFFSET_Y);
	  },

	  drawDirection : function() {
		  if (this.owner != 1 && !(SHOW_ENEMY_CASTLE_DIRECTIONS)) {
			  return;
		  }

		  ctx.beginPath();
		  ctx.lineWidth = 0.1;
		  ctx.fillStyle = "rgba(0,0,0,1)";
		  var targetCastle = this.neighbours[this.selectedDirection];
		  for (var i = 0.25; i < 0.50; i += 0.05) {
			  var distance = i;
			  directionMarkerPosX = (1.0 - distance) * this.posX + (distance)
			      * targetCastle.posX + OFFSET_X;
			  directionMarkerPosY = (1.0 - distance) * this.posY + (distance)
			      * targetCastle.posY + OFFSET_Y;
			  ctx.arc(directionMarkerPosX, directionMarkerPosY, 5 - (10 * i), 0,
			      Math.PI * 2, false);

			  ctx.fill();
			  ctx.stroke();
		  }
	  },

	  drawStreets : function() {
		  // draw the way to the neighbors
		  ctx.strokeStyle = "#999";
		  ctx.lineWidth = 10;
		  for (neighboursIndex in this.neighbours) {
			  var curNeighbour = this.neighbours[neighboursIndex];
			  if (curNeighbour.posY === this.posY && this.posX < curNeighbour.posX) {
				  ctx.drawImage(way1Img, this.posX + OFFSET_X, this.posY - 5 + OFFSET_Y);
			  } else if (curNeighbour.posY > this.posY
			      && this.posX < curNeighbour.posX) {
				  ctx.drawImage(way2Img, this.posX - 5 + OFFSET_X, this.posY + OFFSET_Y);
			  } else if (curNeighbour.posY > this.posY
			      && this.posX > curNeighbour.posX) {
				  // flip context horizontally
				  ctx.scale(-1, 1);
				  ctx.drawImage(way2Img, -this.posX - 5 - OFFSET_X, this.posY + OFFSET_Y);
				  ctx.scale(-1, 1);
			  }
		  }
	  },

	  drawFlag : function() {
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
			  ctx.drawImage(img, this.posX - 20 + OFFSET_X, this.posY - 45 + OFFSET_Y);
		  }
	  },

	  isInside : function(x, y) {
		  return (x >= this.posX - 20) && (x <= this.posX + 20)
		      && (y > this.posY - 20) && (y < this.posY + 20);
	  },

	  nextTarget : function() {
		  this.selectedDirection++;
		  this.selectedDirection = this.selectedDirection % this.neighbours.length;
		  soundEngine.playCastleDirectionChange();
	  }
	};
	return aCastle;
};