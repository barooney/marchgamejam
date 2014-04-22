var button = function() {
	aButton = {
	  x : 220,
	  y : 100,
	  w : 200,
	  h : 40,
	  title : 'title',
	  callback : null,
	  isTurnedOff : function() {
		  return false;
	  },
	  draw : function() {
		  ctx.fillStyle = "#BBB";
		  ctx.beginPath();
		  ctx.rect(this.x + OFFSET_X, this.y + OFFSET_Y, this.w, this.h);
		  ctx.fill();
		  ctx.closePath();

		  var fontSize = 20;

		  ctx.font = '' + fontSize + 'px Palatino Linotype';
		  ctx.fillStyle = "#fff";

		  var txtW = ctx.measureText(this.title).width;

		  ctx.fillText(this.title, this.x + this.w / 2 - txtW / 2 + OFFSET_X,
		      this.y + this.h / 2 + fontSize / 3 + OFFSET_Y); // + fontSize/2 as
		  // y-offset looks
		  // worse but
		  // would be correct

		  // draw an X above the button if it's turned off
		  if (this.isTurnedOff()) {
			  ctx.strokeStyle = "#C33";
			  ctx.lineWidth = 5;
			  ctx.beginPath();
			  ctx.moveTo(this.x + OFFSET_X, this.y + OFFSET_Y);
			  ctx.lineTo(this.x + this.w + OFFSET_X, this.y + this.h + OFFSET_Y);
			  ctx.moveTo(this.x + this.w + OFFSET_X, this.y + OFFSET_Y);
			  ctx.lineTo(this.x + OFFSET_X, this.y + this.h + OFFSET_Y);
			  ctx.closePath();
			  ctx.stroke();
		  }
	  },

	  handleClickAt : function(x, y) {
		  var insideX = (x >= this.x) && (x <= this.x + this.w);
		  var insideY = (y >= this.y) && (y <= this.y + this.h);
		  if (insideX && insideY) {
			  this.callback();
		  }
	  }
	};

	return aButton;
};