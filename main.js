init();

function getWinner() {
    // for each player...
    for (var curPlayer = 1; curPlayer <= 3; curPlayer++) {

        // Check if the player has won:
        // ... count the defeted enemies...
        var intactEnemiesCounter = 0;
        for (var mainBaseIndex = 0; mainBaseIndex < mainBases.length; mainBaseIndex++) {
            var curMainBase = mainBases[mainBaseIndex];
            var curAssertedOwner = mainBaseIndex + 1;

            if (curAssertedOwner !== curPlayer && curMainBase.owner === curAssertedOwner) {
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

function fly() {
    if (shownScreen === SCREEN_START) {
        ctx.drawImage(startscreenImg, 0, 0);
    } else if (shownScreen === SCREEN_BATTLE) {
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
            soldiers[soldierIndex].progress += soldiers[soldierIndex].velocity;
            soldiers[soldierIndex].progress = Math.min(
                soldiers[soldierIndex].progress, 1.0);
            soldiers[soldierIndex].drawMe();
            soldiers[soldierIndex].updateCastles();
        }

        castlesPlayer1 = 1;
        castlesPlayer2 = 1;
        castlesPlayer3 = 1;
        // spawn new soldiers regularly
        framesToNextSpawn1--;
        if (framesToNextSpawn1 <= 0 && castles[0].owner === 1) {

            framesToNextSpawn1 = 100 / castlesPlayer1;
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
            framesToNextSpawn2 = 100 / castlesPlayer2;
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
            framesToNextSpawn3 = 100 / castlesPlayer3;
            var newSoldier = new soldier();
            newSoldier.startingCastle = castles[20]; // p1=0, p2=15, p3=20
            newSoldier.targetCastle = castles[20];
            newSoldier.progress = 1;
            newSoldier.owner = 3;
            soldiers.push(newSoldier);
        }

        var winner = getWinner();

        if (winner === 1) {
            shownScreen = SCREEN_WIN;
        } else if (winner > 1) {
            shownScreen = SCREEN_LOSE;
        }
    } else if (shownScreen === SCREEN_WIN) {
        ctx.drawImage(winScreenImg, 0, 0);
    } else if (shownScreen === SCREEN_LOSE) {
        ctx.drawImage(loseScreenImg, 0, 0);
    }
    setTimeout('fly()', FRAME_DELAY);
}

$('canvas').click(function(e) {
    if (shownScreen === SCREEN_START) {
        shownScreen = SCREEN_BATTLE;
    } else if (shownScreen === SCREEN_WIN) {
        shownScreen = SCREEN_START;
    } else if (shownScreen === SCREEN_LOSE) {
        shownScreen = SCREEN_START;
    } else if (shownScreen === SCREEN_BATTLE) {

        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;

        for (var c in castles) {
            if (castles[c].isInside(x, y) && castles[c].owner === 1) {
                castles[c].nextTarget();
            }
        }
    }
});

fly();