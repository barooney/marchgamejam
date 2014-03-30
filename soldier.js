var soldier = function() {
    aSoldier = {
        startingCastle: null,
        targetCastle: null,
        progress: 0,
        velocity: (Math.random() * 0.05) + 0.01,
        owner: 1,

        getPosX: function() {
            return (1.0 - this.progress) * this.startingCastle.posX + (this.progress) * this.targetCastle.posX;
        },
        getPosY: function() {
            return (1.0 - this.progress) * this.startingCastle.posY + (this.progress) * this.targetCastle.posY;
        },

        drawMe: function() {
            var yOffset = -30;

            // mirror soldiers if necessary
            var mirroredMultiplier = 1;
            if (this.targetCastle !== undefined && this.startingCastle !== undefined && this.targetCastle.posX < this.startingCastle.posX) {
                ctx.scale(-1, 1);
                mirroredMultiplier = -1;
            }

            switch (this.owner) {
                case 1:
                    ctx.drawImage(soldierImgs1[animFrame], mirroredMultiplier * this.getPosX() - 15, this.getPosY() + yOffset);
                    break;
                case 2:
                    ctx.drawImage(soldierImgs2[animFrame], mirroredMultiplier * this.getPosX() - 15, this.getPosY() + yOffset);
                    break;
                case 3:
                    ctx.drawImage(soldierImgs3[animFrame], mirroredMultiplier * this.getPosX() - 15, this.getPosY() + yOffset);
                    break;
            }

            if (mirroredMultiplier == -1) {
                ctx.scale(-1, 1);
                mirroredMultiplier = 1;
            }
        },

        updateCastles: function() {
            if (this.progress > 0.999) {
                this.startingCastle = this.targetCastle;
                this.targetCastle = this.startingCastle.neighbours[this.startingCastle.selectedDirection];
                this.progress = 0;

                // destroy yourself
                for (i in soldiers) {
                    if (this === soldiers[i] && this.startingCastle.owner != this.owner) {
                        soldiers.splice(i, 1);
                        var rndNeighbourIndex = Math.floor(Math.random() * this.startingCastle.neighbours.length);
                        this.startingCastle.selectedDirection = rndNeighbourIndex;
                        var fightAnimation = new castleFightAnimation();
                        fightAnimation.x = this.startingCastle.posX - 30;
                        fightAnimation.y = this.startingCastle.posY - 50;
                        animations.push(fightAnimation);
                    }
                }
                if (this.startingCastle.owner !== this.owner) {
                    if (mainBases.indexOf(this.startingCastle) > 0) {
                        sounds_fanfare[0].play();
                    }
                }
                this.startingCastle.owner = this.owner;
                sound_blades[Math.floor(Math.random() * sound_blades.length)].play();
            }
        },

        checkCollisions: function(otherSoldier) {
            // don't apply collisions to yourself or teammembers:
            if (this.owner === otherSoldier.owner) {
                return;
            }

            // is other soldier inside collision radius? return if not.
            var collisionRadius = 2;
            var distance = Math.sqrt((this.getPosX() - otherSoldier.getPosX()) * (this.getPosX() - otherSoldier.getPosX()) + (this.getPosY() - otherSoldier.getPosY()) * (this.getPosY() - otherSoldier.getPosY()));
            if (distance > collisionRadius) {
                return;
            }

            // handle the collision
            var fightAnimation = new knightFightAnimation();
            fightAnimation.x = this.getPosX() - 20;
            fightAnimation.y = this.getPosY() - 35;
            animations.push(fightAnimation);
            sound_blades[Math.floor(Math.random() * sound_blades.length)].play();
            if (Math.random() < 0.5) {
                this.suicide();
            } else {
                otherSoldier.suicide();
            }
        },

        suicide: function() {
            // destroy yourself
            for (i in soldiers) {
                if (this === soldiers[i]) {
                    soldiers.splice(i, 1);
                }
            }
        }
    };

    return aSoldier;
};