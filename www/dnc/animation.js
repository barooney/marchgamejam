var PATH = 'dnc/';

var tutorial01Img01 = new Image();
tutorial01Img01.src = PATH + 'img/tutorial01_01.png';
var tutorial01Img02 = new Image();
tutorial01Img02.src = PATH + 'img/tutorial01_02.png';
var tutorial01Img03 = new Image();
tutorial01Img03.src = PATH + 'img/tutorial01_03.png';

var animation = function() {
    anAnimation = {
        FRAMES_PER_IMAGE: 3,
        framesLeftForCurImg: 3,
        curImgIndex: 0,
        x: 0,
        y: 0,
        loopImages: [],
        loopAnimationFrames: 50,

        play: function() {
            ctx.drawImage(this.loopImages[this.curImgIndex], this.x + OFFSET_X, this.y + OFFSET_Y);
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
                for (var i in animations) {
                    if (this === animations[i]) {
                        animations.splice(i, 1);
                    }
                }
            }
        }
    };

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

var tutorialAnimation01 = function() {
    resultAnimation = new animation();
    resultAnimation.x = 20;
    resultAnimation.y = 20;
    resultAnimation.loopImages.push(tutorial01Img01);
    resultAnimation.loopImages.push(tutorial01Img02);
    resultAnimation.loopImages.push(tutorial01Img03);
    resultAnimation.loopImages.push(tutorial01Img02);
    resultAnimation.loopAnimationFrames = 150;
    return resultAnimation;
};