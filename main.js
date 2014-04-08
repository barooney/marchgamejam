var KI_FRAME_INTERVAL = 1000 / FRAME_DELAY;
var kiMoveCountDown = KI_FRAME_INTERVAL;

var DEBUG_ONE_TIME_TEST_FLAG = true;

function doAIMoves() {
	kiMoveCountDown--;
	if (kiMoveCountDown <= 0) {
		kiMoveCountDown = KI_FRAME_INTERVAL;

		// collect castles of player 2 in an array:
		var castlesPlayer2 = [];
		for ( var curCastleIndex in castles) {
			var curCastle = castles[curCastleIndex];
			if (curCastle.owner === 2) {
				castlesPlayer2.push(curCastle);
			}
		}

		if (castlesPlayer2.length === 0) {
			return;
		}

		// select one random castle from the array
		castleToChangeIndex = Math.floor(Math.random() * castlesPlayer2.length);
		castleToChange = castlesPlayer2[castleToChangeIndex];

		// select a random new direction for the selected castle:
		var rndDirectionIndex = Math.floor(Math.random()
		    * castleToChange.neighbours.length);
		castleToChange.selectedDirection = rndDirectionIndex;

		// collect castles of player 3 in an array:
		var castlesPlayer3 = [];
		for ( var curCastleIndex in castles) {
			var curCastle = castles[curCastleIndex];
			if (curCastle.owner === 3) {
				castlesPlayer3.push(curCastle);
			}
		}

		if (castlesPlayer3.length === 0) {
			return;
		}

		// select one random castle from the array
		castleToChangeIndex = Math.floor(Math.random() * castlesPlayer3.length);
		castleToChange = castlesPlayer3[castleToChangeIndex];

		// select a random new direction for the selected castle:
		var rndDirectionIndex = Math.floor(Math.random()
		    * castleToChange.neighbours.length);
		castleToChange.selectedDirection = rndDirectionIndex;
	}
}

function getWinner() {
	// for each player...
	for (var curPlayer = 1; curPlayer <= 3; curPlayer++) {

		// Check if the player has won:
		// ... count the defeted enemies...
		var intactEnemiesCounter = 0;
		for (var mainBaseIndex = 0; mainBaseIndex < mainBases.length; mainBaseIndex++) {
			var curMainBase = mainBases[mainBaseIndex];
			var curAssertedOwner = mainBaseIndex + 1;

			if (curAssertedOwner !== curPlayer
			    && curMainBase.owner === curAssertedOwner) {
				intactEnemiesCounter++;
			}
		}

		// Check if the player has lost:
		if (mainBases[0].owner != 1) {
			return 2;
		}

		// ... and return the player if all of them are defeated
		if (intactEnemiesCounter === 0) {
			return curPlayer;
		}
	}

	// if no player has won, return 0
	return 0;
}

function toggleMusic() {
	playMusic = !playMusic;
	sound_background.togglePlay();
}

function toggleSound() {
	playSounds = !playSounds;
}

function resetButtons() {
	buttons = [];

	var toggleMusicBtn = new button();
	toggleMusicBtn.x = 20;
	toggleMusicBtn.y = 20;
	toggleMusicBtn.w = 30;
	toggleMusicBtn.h = 30;
	toggleMusicBtn.title = "\u266B";
	toggleMusicBtn.callback = toggleMusic;
	toggleMusicBtn.isTurnedOff = function() {
		return (!playMusic);
	}

	buttons.push(toggleMusicBtn);

	var toggleSoundBtn = new button();
	toggleSoundBtn.x = 60;
	toggleSoundBtn.y = 20;
	toggleSoundBtn.w = 30;
	toggleSoundBtn.h = 30;
	toggleSoundBtn.title = "\u266A";
	toggleSoundBtn.callback = toggleSound;
	toggleSoundBtn.isTurnedOff = function() {
		return (!playSounds);
	}
	buttons.push(toggleSoundBtn);
}

function startBattle() {
	shownScreen = SCREEN_BATTLE;
	resetButtons();
	init();
	if (playSounds) {
		sound_blades[Math.floor(Math.random() * sound_blades.length)].play();
	}
}

function fly() {
	if (shownScreen === SCREEN_START) {
		ctx.drawImage(startscreenImg, 0, 0);

		if (DEBUG_ONE_TIME_TEST_FLAG) {
			DEBUG_ONE_TIME_TEST_FLAG = false;
			// do something once here
		}

	} else if (shownScreen === SCREEN_BATTLE) {
		doAIMoves();

		ctx.clearRect(0, 0, 640, 480);
		ctx.drawImage(backgroundImg, 0, 0);
		animFrameCtr++;
		if (animFrameCtr < animFrameMax) {

		} else {
			animFrame++;
			animFrameCtr = 0;
			animFlagFrame++;
		}
		animFrame %= 3;
		if (animFlagFrame === animFlagFrameMax) {
			// animFlagFrameCtr != animFlagFrameCtr;
			animFlagFrameCtr = (!animFlagFrameCtr) ? 1 : 0;
			animFlagFrame = 0;
		}
		for (castleIndex in castles) {
			castles[castleIndex].drawStreets();
		}
		for (castleIndex in castles) {
			castles[castleIndex].drawFlag();
			castles[castleIndex].drawMe();
		}
		for (castleIndex in castles) {
			castles[castleIndex].drawDirection();
		}
		for (soldierIndex in soldiers) {
			var curSoldier = soldiers[soldierIndex];
			curSoldier.progress += curSoldier.velocity;
			curSoldier.progress = Math.min(curSoldier.progress, 1.0);

			// check for collisions with enemy soldiers:
			for (otherSoldierIndex in soldiers) {
				var otherSoldier = soldiers[otherSoldierIndex];
				curSoldier.checkCollisions(otherSoldier);
			}

			curSoldier.drawMe();
			curSoldier.updateCastles();
		}

		// animate the animations
		for (var i = 0; i < animations.length; i++) {
			var curAnimation = animations[i];
			curAnimation.play();
		}

		// count castles of each player:
		castlesPlayer1 = 0;
		castlesPlayer2 = 0;
		castlesPlayer3 = 0;
		for ( var curCastleIndex in castles) {
			var curCastle = castles[curCastleIndex];
			if (curCastle.owner === 1) {
				castlesPlayer1++;
			} else if (curCastle.owner === 2) {
				castlesPlayer2++;
			} else if (curCastle.owner === 3) {
				castlesPlayer3++;
			}
		}

		// spawn new soldiers regularly
		framesToNextSpawn1--;
		if (framesToNextSpawn1 <= 0 && castles[0].owner === 1) {

			framesToNextSpawn1 = SPAWN_INTERVAL_BASE
			    - SPAWN_INTERVAL_REDUCTION_PER_CASTLE * castlesPlayer1;
			var newSoldier = new soldier();
			newSoldier.startingCastle = castles[0]; // p1=0, p2=15, p3=20
			newSoldier.targetCastle = castles[0];
			newSoldier.progress = 1;
			newSoldier.owner = 1;
			soldiers.push(newSoldier);
		}

		// spawn new soldiers regularly
		framesToNextSpawn2--;
		if (framesToNextSpawn2 <= 0 && castles[15].owner === 2) {
			framesToNextSpawn2 = SPAWN_INTERVAL_BASE
			    - SPAWN_INTERVAL_REDUCTION_PER_CASTLE * castlesPlayer2;
			var newSoldier = new soldier();
			newSoldier.startingCastle = castles[15]; // p1=0, p2=15, p3=20
			newSoldier.targetCastle = castles[15];
			newSoldier.progress = 1;
			newSoldier.owner = 2;
			soldiers.push(newSoldier);
		}

		// spawn new soldiers regularly
		framesToNextSpawn3--;
		if (framesToNextSpawn3 <= 0 && castles[20].owner === 3) {
			framesToNextSpawn3 = SPAWN_INTERVAL_BASE
			    - SPAWN_INTERVAL_REDUCTION_PER_CASTLE * castlesPlayer3;
			var newSoldier = new soldier();
			newSoldier.startingCastle = castles[20]; // p1=0, p2=15, p3=20
			newSoldier.targetCastle = castles[20];
			newSoldier.progress = 1;
			newSoldier.owner = 3;
			soldiers.push(newSoldier);
		}

		// show number of castles
		ctx.drawImage(flagImgs1[0], 530, 30);
		ctx.drawImage(flagImgs2[0], 530, 60);
		ctx.drawImage(flagImgs3[0], 530, 90);
		ctx.font = "20px Palatino Linotype";
		ctx.fillStyle = "#fff";
		ctx.fillText(castlesPlayer1, 580, 50);
		ctx.fillText(castlesPlayer2, 580, 80);
		ctx.fillText(castlesPlayer3, 580, 110);

		var winner = getWinner();

		if (winner === 1) {
			shownScreen = SCREEN_WIN;
		} else if (winner > 1) {
			shownScreen = SCREEN_LOSE;
		}
	} else if (shownScreen === SCREEN_HELP) {
		ctx.drawImage(helpScreenImg, 0, 0);
	} else if (shownScreen === SCREEN_CREDITS) {
		ctx.drawImage(creditsScreenImg, 0, 0);
	} else if (shownScreen === SCREEN_WIN) {
		ctx.drawImage(winScreenImg, 0, 0);
	} else if (shownScreen === SCREEN_LOSE) {
		ctx.drawImage(loseScreenImg, 0, 0);
	}

	for (var buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
		buttons[buttonIndex].draw();
	}

	setTimeout('fly()', FRAME_DELAY);
}

/**
 * Handles a click at (x, y) and triggers callbacks of the buttons at the given
 * position.
 * 
 * @param x
 *          something like e.pageX - this.offsetLeft;
 * @param y
 *          something like e.pageY - this.offsetTop;
 */
function handleBtnClick(x, y) {
	for (var curBtnIndex = 0; curBtnIndex < buttons.length; curBtnIndex++) {
		buttons[curBtnIndex].handleClickAt(x, y);
	}
}

$('canvas').click(function(e) {
	var x = e.pageX - this.offsetLeft;
	var y = e.pageY - this.offsetTop;

	if (shownScreen === SCREEN_HELP) {
		handleBtnClick(x, y);
		showStartScreen();
	} else if (shownScreen === SCREEN_WIN) {
		handleBtnClick(x, y);
		showStartScreen();
	} else if (shownScreen === SCREEN_LOSE) {
		handleBtnClick(x, y);
		showStartScreen();
	} else if (shownScreen === SCREEN_BATTLE) {
		handleBtnClick(x, y);
		for ( var c in castles) {
			if (castles[c].isInside(x, y) && castles[c].owner === 1) {
				castles[c].nextTarget();
			}
		}
	} else {
		handleBtnClick(x, y);
	}
});

function showHelpScreen() {
	shownScreen = SCREEN_HELP;
	resetButtons();
}

function openSomeHomePage() {
	window.open('http://google.com', '_blank');
}

function showCreditsScreen() {
	shownScreen = SCREEN_CREDITS;
	resetButtons();

	var hpBtn = new button();
	hpBtn.title = "some home page";
	hpBtn.callback = openSomeHomePage;
	buttons.push(hpBtn);

	var backBtn = new button();
	backBtn.title = "back";
	backBtn.callback = showStartScreen;
	backBtn.y += 200;
	backBtn.x -= 100;
	buttons.push(backBtn);
}

function showStartScreen() {
	shownScreen = SCREEN_START;
	resetButtons();

	var startBtn = new button();
	startBtn.title = "Start Battle";
	startBtn.callback = startBattle;
	buttons.push(startBtn);

	var hlpBtn = new button();
	hlpBtn.title = "Help";
	hlpBtn.callback = showHelpScreen;
	hlpBtn.y += 50;
	buttons.push(hlpBtn);

	var credBtn = new button();
	credBtn.title = "Credits";
	credBtn.callback = showCreditsScreen;
	credBtn.y += 100;
	buttons.push(credBtn);
}

showStartScreen();

fly();