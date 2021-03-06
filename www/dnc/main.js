var KI_FRAME_INTERVAL = 1000 / MILLISECONDS_PER_FRAME;
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

		if (castlesPlayer2.length > 0) {
			// select one random castle from the array
			castleToChangeIndex = Math.floor(Math.random() * castlesPlayer2.length);
			castleToChange = castlesPlayer2[castleToChangeIndex];

			// select a random new direction for the selected castle:
			var rndDirectionIndex = Math.floor(Math.random()
			    * castleToChange.neighbours.length);
			castleToChange.selectedDirection = rndDirectionIndex;
		}

		// collect castles of player 3 in an array:
		var castlesPlayer3 = [];
		for ( var curCastleIndex in castles) {
			var curCastle = castles[curCastleIndex];
			if (curCastle.owner === 3) {
				castlesPlayer3.push(curCastle);
			}
		}

		if (castlesPlayer3.length > 0) {
			// select one random castle from the array
			castleToChangeIndex = Math.floor(Math.random() * castlesPlayer3.length);
			castleToChange = castlesPlayer3[castleToChangeIndex];

			// select a random new direction for the selected castle:
			var rndDirectionIndex = Math.floor(Math.random()
			    * castleToChange.neighbours.length);
			castleToChange.selectedDirection = rndDirectionIndex;
		}
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
	soundEngine.toggleMusic();
}

function toggleSound() {
	soundEngine.toggleSound();
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
		return (!(soundEngine.isMusicPlaying()));
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
		return (!(soundEngine.isSoundPlaying()));
	}
	buttons.push(toggleSoundBtn);
}

function startBattle() {
	shownScreen = SCREEN_BATTLE;
	resetButtons();
	init();
	soundEngine.playBlade();
	soundEngine.startBattleMusic();

	var tutorial01Animation = new tutorialAnimation01();
	tutorial01Animation.x = castles[0].posX - 300;
	tutorial01Animation.y = castles[0].posY;
	animations.push(tutorial01Animation);
}

function fly() {
	// calculate start date for FPS calculation.
	var startDate = new Date();

	if (shownScreen === SCREEN_START) {
		ctx.drawImage(startscreenImg, 0 + BACKGROUND_BIG_OFFSET_X, 0 + BACKGROUND_BIG_OFFSET_Y);

		if (DEBUG_ONE_TIME_TEST_FLAG) {
			DEBUG_ONE_TIME_TEST_FLAG = false;
			// do something once here
		}

	} else if (shownScreen === SCREEN_BATTLE) {
		doAIMoves();

		ctx.clearRect(0, 0, c.width, c.height);
		ctx.drawImage(backgroundImg, 0 + BACKGROUND_BIG_OFFSET_X, 0 + BACKGROUND_BIG_OFFSET_Y);
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

		// count soldiers of each player:
		soldiersPlayer1 = 0;
		soldiersPlayer2 = 0;
		soldiersPlayer3 = 0;
		for ( var curSoldierIndex in soldiers) {
			var curSoldier = soldiers[curSoldierIndex];
			if (!curSoldier) {
				continue;
			}
			if (curSoldier.owner === 1) {
				soldiersPlayer1++;
			} else if (curSoldier.owner === 2) {
				soldiersPlayer2++;
			} else if (curSoldier.owner === 3) {
				soldiersPlayer3++;
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

		// draw background for castle and soldier counters
		ctx.lineJoin = "round";
		ctx.lineWidth = 20;
		ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
		ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
		ctx.strokeRect(490 + OFFSET_X, 35 + OFFSET_Y, 130, 100);
		ctx.fillRect(500 + OFFSET_X, 45 + OFFSET_Y, 110, 80);

		// show number of castles
		ctx.drawImage(flagImgs1[0], 480 + OFFSET_X, 30 + OFFSET_Y);
		ctx.drawImage(flagImgs2[0], 480 + OFFSET_X, 70 + OFFSET_Y);
		ctx.drawImage(flagImgs3[0], 480 + OFFSET_X, 110 + OFFSET_Y);
		ctx.font = "20px Palatino Linotype";
		ctx.fillStyle = "#fff";
		ctx.fillText(castlesPlayer1, 530 + OFFSET_X, 50 + OFFSET_Y);
		ctx.fillText(castlesPlayer2, 530 + OFFSET_X, 90 + OFFSET_Y);
		ctx.fillText(castlesPlayer3, 530 + OFFSET_X, 130 + OFFSET_Y);

		// show number of soldiers
		ctx.drawImage(soldierFrontalImg1, 570 + OFFSET_X, 30 + OFFSET_Y);
		ctx.drawImage(soldierFrontalImg2, 570 + OFFSET_X, 70 + OFFSET_Y);
		ctx.drawImage(soldierFrontalImg3, 570 + OFFSET_X, 110 + OFFSET_Y);
		ctx.font = "20px Palatino Linotype";
		ctx.fillStyle = "#fff";
		ctx.fillText(soldiersPlayer1, 600 + OFFSET_X, 50 + OFFSET_Y);
		ctx.fillText(soldiersPlayer2, 600 + OFFSET_X, 90 + OFFSET_Y);
		ctx.fillText(soldiersPlayer3, 600 + OFFSET_X, 130 + OFFSET_Y);

		var winner = getWinner();

		if (winner === 1) {
			showWinScreen();
		} else if (winner > 1) {
			showLoseScreen();
		}
	} else if (shownScreen === SCREEN_HELP) {
		ctx.drawImage(helpScreenImg, 0 + BACKGROUND_BIG_OFFSET_X, 0 + BACKGROUND_BIG_OFFSET_Y);
	} else if (shownScreen === SCREEN_CREDITS) {
		ctx.drawImage(creditsScreenImg, 0 + BACKGROUND_BIG_OFFSET_X, 0 + BACKGROUND_BIG_OFFSET_Y);
	} else if (shownScreen === SCREEN_WIN) {
		ctx.drawImage(winScreenImg, 0 + BACKGROUND_BIG_OFFSET_X, 0 + BACKGROUND_BIG_OFFSET_Y);
	} else if (shownScreen === SCREEN_LOSE) {
		ctx.drawImage(loseScreenImg, 0 + BACKGROUND_BIG_OFFSET_X, 0 + BACKGROUND_BIG_OFFSET_Y);
	}

	for (var buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
		buttons[buttonIndex].draw();
	}

	// calculate spent time for frame
	var endDate = new Date();
	var dateDiff = new Date(endDate.getTime() - startDate.getTime());
	var spentMilliseconds = dateDiff.getMilliseconds();
	var pauseToNextFrame = Math
	    .max(1, MILLISECONDS_PER_FRAME - spentMilliseconds);

	setTimeout('fly()', pauseToNextFrame);
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

$(document).keyup(function(e) {
	// esc
	if (e.keyCode == 27) {
		showStartScreen();
		soundEngine.startMenuMusic();
	}
});

$('canvas').click(function(e) {
	var xScreen = e.pageX - this.offsetLeft;
	var yScreen = e.pageY - this.offsetTop;
	
	var x = (xScreen / scaleRate - OFFSET_X);
	var y = (yScreen / scaleRate - OFFSET_Y);
	
	if (shownScreen === SCREEN_HELP) {
		handleBtnClick(x, y);
		showStartScreen();
	} else if (shownScreen === SCREEN_WIN) {
		handleBtnClick(x, y);
		showStartScreen();
		soundEngine.startMenuMusic();
	} else if (shownScreen === SCREEN_LOSE) {
		handleBtnClick(x, y);
		showStartScreen();
		soundEngine.startMenuMusic();
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

function showWinScreen() {
	shownScreen = SCREEN_WIN;
	soundEngine.playGameWin();
	soundEngine.stopMusic();
}

function showLoseScreen() {
	shownScreen = SCREEN_LOSE;
	soundEngine.playGameLose();
	soundEngine.stopMusic();
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