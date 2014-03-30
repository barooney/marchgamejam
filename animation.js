var animation = function() {
	anAnimation = {
	    FRAMES_PER_IMAGE : 3,
	    framesLeftForCurImg : 3,
	    curImgIndex : 0,
	    x : 0,
	    y : 0,
	    loopImages : [],
	    loopAnimationFrames : 50,

	    play : function() {
		    ctx.drawImage(this.loopImages[this.curImgIndex], this.x, this.y);
		    this.framesLeftForCurImg--;
		    this.loopAnimationFrames--;

		    if (this.framesLeftForCurImg <= 0) {
			    this.framesLeftForCurImg = this.FRAMES_PER_IMAGE;
			    this.curImgIndex++;
			    this.curImgIndex = this.curImgIndex % this.loopImages.length;
		    }

		    // if the total time is over remove the animation from the global
			// array
		    if (this.loopAnimationFrames <= 0) {
			    for (i in animations) {
				    if (this === animations[i]) {
				    	animations.splice(i, 1);
				    }
			    }
		    }
	    }
	}

	return anAnimation;
};

var castleFightAnimation = function() {
	resultAnimation = new animation();
	resultAnimation.x = 20;
	resultAnimation.y = 20;
	resultAnimation.loopImages.push(castleFightLoop01Img);
	resultAnimation.loopImages.push(castleFightLoop02Img);
	resultAnimation.loopImages.push(castleFightLoop03Img);
	resultAnimation.loopAnimationFrames = 20;
	return resultAnimation;
};

var knightFightAnimation = function() {
	resultAnimation = new animation();
	resultAnimation.x = 20;
	resultAnimation.y = 20;
	resultAnimation.loopImages.push(knightFightLoop01Img);
	resultAnimation.loopImages.push(knightFightLoop02Img);
	resultAnimation.loopImages.push(knightFightLoop03Img);
	resultAnimation.loopAnimationFrames = 10;
	return resultAnimation;
};