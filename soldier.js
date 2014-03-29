var soldier = function() {
    return {
        startingCastle: null,
        targetCastle: null,
        progress: 0,

        getPosX: function() {
            return (1.0 - this.progress) * this.startingCastle.posX + (this.progress) * this.targetCastle.posX;
        },
        getPosY: function() {
            return (1.0 - this.progress) * this.startingCastle.posY + (this.progress) * this.targetCastle.posY;
        },

        drawMe: function() {
            ctx.drawImage(soldierImgs[animFrame], this.getPosX(), this.getPosY());
        }
    };
};