var button = function() {
	aButton = {
	    x : 220,
	    y : 100,
	    w : 200,
	    h : 40,
	    title : 'title',
	    callback : null,
	    draw : function() {
	    	ctx.beginPath();
		    ctx.rect(this.x, this.y, this.w, this.h);
		    ctx.stroke();
		    ctx.closePath();

		    var fontSize = 20;

		    ctx.font = '' + fontSize + 'px Palatino Linotype';
		    ctx.fillStyle = "#fff";

		    var txtW = ctx.measureText(this.title).width;

		    ctx.fillText(this.title, this.x + this.w / 2 - txtW / 2, this.y
		            + this.h / 2 + fontSize / 2);
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