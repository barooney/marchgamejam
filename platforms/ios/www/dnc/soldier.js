var soldier = function() {
	aSoldier = {
	  startingCastle : null,
	  targetCastle : null,
	  progress : 0,
	  velocity : (Math.random() * SOLDIER_SPEED_BONUS) + SOLDIER_SPEED_BASE,
	  owner : 1,

	  getPosX : function() {
		  return (1.0 - this.progress) * this.startingCastle.posX + (this.progress)
		      * this.targetCastle.posX;
	  },
	  getPosY : function() {
		  return (1.0 - this.progress) * this.startingCastle.posY + (this.progress)
		      * this.targetCastle.posY;
	  },

	  drawMe : function() {
		  var yOffset = -30;

		  // mirror soldiers if necessary
		  var mirroredMultiplier = 1;
		  if (this.targetCastle !== undefined && this.startingCastle !== undefined
		      && this.targetCastle.posX < this.startingCastle.posX) {
			  ctx.scale(-1, 1);
			  mirroredMultiplier = -1;
		  }

		  switch (this.owner) {
		  case 1:
			  ctx.drawImage(soldierImgs1[animFrame], mirroredMultiplier
			      * this.getPosX() - 15, this.getPosY() + yOffset);
			  break;
		  case 2:
			  ctx.drawImage(soldierImgs2[animFrame], mirroredMultiplier
			      * this.getPosX() - 15, this.getPosY() + yOffset);
			  break;
		  case 3:
			  ctx.drawImage(soldierImgs3[animFrame], mirroredMultiplier
			      * this.getPosX() - 15, this.getPosY() + yOffset);
			  break;
		  }

		  if (mirroredMultiplier == -1) {
			  ctx.scale(-1, 1);
			  mirroredMultiplier = 1;
		  }
	  },

	  updateCastles : function() {
		  if (this.progress > 0.999) {
			  this.startingCastle = this.targetCastle;
			  this.progress = 0;

			  if (this.startingCastle.owner != this.owner) {
				  this.handleCastleFight(this.startingCastle);
			  }

			  // move on into the direction defined by the caste
			  this.targetCastle = this.startingCastle.neighbours[this.startingCastle.selectedDirection];
		  }
	  },

	  handleCastleFight : function(foughtCastle) {

		  // store some values
		  var ownerBeforeFight = foughtCastle.owner;

		  // start the fight castle animation and sounds
		  var fightAnimation = new castleFightAnimation();
		  fightAnimation.x = foughtCastle.posX - 30;
		  fightAnimation.y = foughtCastle.posY - 50;
		  animations.push(fightAnimation);
		  soundEngine.playBlade();

		  // damage the castle with some probability
		  var damaged = false;
		  if (ownerBeforeFight === 0
		      && Math.random() <= WIN_AGAINST_NEUTRAL_CASTLE_PROPABILITY) {
			  foughtCastle.dmg++;
			  damaged = true;
		  }
		  if (ownerBeforeFight != 0
		      && Math.random() <= WIN_AGAINST_ENEMY_CASTLE_PROPABILITY) {
			  foughtCastle.dmg++;
			  damaged = true;
		  }

		  // capture the castle if the new damage is high enough and repair it
		  var captured = false;
		  if (foughtCastle.owner != 0 && foughtCastle.dmg >= CASTLE_HIT_POINTS) {
			  foughtCastle.owner = this.owner;
			  foughtCastle.dmg = 0;
			  captured = true;
		  }
		  if (foughtCastle.owner === 0
		      && foughtCastle.dmg >= NEUTRAL_CASTLE_HIT_POINTS) {
			  foughtCastle.owner = this.owner;
			  foughtCastle.dmg = 0;
			  captured = true;
		  }

		  // change the direction of a captured castle randomly
		  if (captured) {
			  var rndNeighbourIndex = Math.floor(Math.random()
			      * foughtCastle.neighbours.length);
			  foughtCastle.selectedDirection = rndNeighbourIndex;
		  }

		  // play a sound if a main base was captured
		  if (captured && mainBases.indexOf(foughtCastle) > 0) {
			  soundEngine.playFanfare();
		  }

		  // destroy yourself after attacking a castle if necessary
		  if (ownerBeforeFight != 0 && SOLDIER_SUICIDE_AFTER_ENEMY_CASTLE_ATTACK) {
			  this.suicide();
		  }
		  if (ownerBeforeFight === 0 && SOLDIER_SUICIDE_AFTER_NEUTRAL_CASTLE_ATTACK) {
			  this.suicide();
		  }
	  },

	  checkCollisions : function(otherSoldier) {
		  // don't apply collisions to yourself or team members:
		  if (this.owner === otherSoldier.owner) {
			  return;
		  }

		  // is other soldier inside collision radius? return if not.
		  var collisionRadius = 2;
		  var distance = Math.sqrt((this.getPosX() - otherSoldier.getPosX())
		      * (this.getPosX() - otherSoldier.getPosX())
		      + (this.getPosY() - otherSoldier.getPosY())
		      * (this.getPosY() - otherSoldier.getPosY()));
		  if (distance > collisionRadius) {
			  return;
		  }

		  // handle the collision
		  // play knight fight animation and sound
		  var fightAnimation = new knightFightAnimation();
		  fightAnimation.x = this.getPosX() - 20;
		  fightAnimation.y = this.getPosY() - 35;
		  animations.push(fightAnimation);
		  soundEngine.playBlade();

		  // kill one of the soldiers
		  // handle fights between player and AI
		  if (this.owner === 1) {
			  if (Math.random() <= WIN_AGAINST_ENEMY_SOLDIER_PROPABILITY) {
				  otherSoldier.suicide();
			  } else {
				  this.suicide();
			  }
		  }
		  if (otherSoldier.owner === 1) {
			  if (Math.random() < WIN_AGAINST_ENEMY_SOLDIER_PROPABILITY) {
				  this.suicide();
			  } else {
				  otherSoldier.suicide();
			  }
		  }
		  // handle fights between AI and AI
		  if (this.owner != 1 && otherSoldier.owner != 1) {
			  if (Math.random() <= 0.5) {
				  this.suicide();
			  } else {
				  otherSoldier.suicide();
			  }
		  }
	  },

	  suicide : function() {
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
