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
		  ctx.rect(this.x, this.y, this.w, this.h);
		  ctx.fill();
		  ctx.closePath();

		  var fontSize = 20;

		  ctx.font = '' + fontSize + 'px Palatino Linotype';
		  ctx.fillStyle = "#fff";

		  var txtW = ctx.measureText(this.title).width;

		  ctx.fillText(this.title, this.x + this.w / 2 - txtW / 2, this.y + this.h
		      / 2 + fontSize / 2);

		  // draw an X above the button if it's turned off
		  if (this.isTurnedOff()) {
			  ctx.strokeStyle = "#C33";
			  ctx.lineWidth = 5;
			  ctx.beginPath();
			  ctx.moveTo(this.x, this.y);
			  ctx.lineTo(this.x + this.w, this.y + this.h);
			  ctx.moveTo(this.x + this.w, this.y);
			  ctx.lineTo(this.x, this.y + this.h);
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