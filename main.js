var framesToNextSpawn1 = 20;
var framesToNextSpawn2 = 20;
var framesToNextSpawn3 = 20;

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var castleImg = new Image();
castleImg.src = 'img/40x40castle.png';

var startscreenImg = new Image();
startscreenImg.src = 'img/startscreen.png';

var way1Img = new Image();
way1Img.src = 'img/way_1.png';
var way2Img = new Image();
way2Img.src = 'img/way_2.png';

var backgroundImg = new Image();
backgroundImg.src = 'img/background.png';

var flagImgs1 = [ new Image(), new Image() ];
var flagImgs2 = [ new Image(), new Image() ];
var flagImgs3 = [ new Image(), new Image() ];
flagImgs1[0].src = 'img/fahne_orange_1.png';
flagImgs1[1].src = 'img/fahne_orange_2.png';
flagImgs2[0].src = 'img/fahne_blau_1.png';
flagImgs2[1].src = 'img/fahne_blau_2.png';
flagImgs3[0].src = 'img/fahne_gruen_1.png';
flagImgs3[1].src = 'img/fahne_gruen_2.png';

var animFrame = 0;
var animFrameCtr = 0;
var animFrameMax = 5;

var animFlagFrame = 0;
var animFlagFrameMax = 1;
var animFlagFrameCtr = 0;

var soldierImgs1 = [ new Image(), new Image(), new Image ];
var soldierImgs2 = [ new Image(), new Image(), new Image ];
var soldierImgs3 = [ new Image(), new Image(), new Image ];
soldierImgs1[0].src = 'img/knight_1orange.png';
soldierImgs1[1].src = 'img/knight_2orange.png';
soldierImgs1[2].src = 'img/knight_3orange.png';
soldierImgs2[0].src = 'img/knight_1blau.png';
soldierImgs2[1].src = 'img/knight_2blau.png';
soldierImgs2[2].src = 'img/knight_3blau.png';
soldierImgs3[0].src = 'img/knight_1gruen.png';
soldierImgs3[1].src = 'img/knight_2gruen.png';
soldierImgs3[2].src = 'img/knight_3gruen.png';

var castles = [];
for (castlePosIndex in castlePosArray) {
	var curPosObj = castlePosArray[castlePosIndex];
	var curCastle = new castle();
	curCastle.posX = curPosObj.x;
	curCastle.posY = curPosObj.y;
	curCastle.owner = curPosObj.owner;
	castles.push(curCastle);
}
// castles.reverse();

// connect to neighbours
for (castleIndex in castles) {
	var curCastleNeighbourIndizes = castlePosArray[castleIndex].neighbours;
	var curCastle = castles[castleIndex];

	for (curCastleNeighbourIndizesIndex in curCastleNeighbourIndizes) {
		var curNeighbourIndex = curCastleNeighbourIndizes[curCastleNeighbourIndizesIndex];
		curCastle.neighbours.push(castles[curNeighbourIndex]);
	}
}

var soldiers = [];

var showStart = 1;

fly();

function fly() {
	if (showStart) {
		ctx.drawImage(startscreenImg, 0, 0);
	} else {
		ctx.clearRect(0, 0, 640, 480);
		ctx.drawImage(backgroundImg, 0, 0);
		animFrameCtr++;
		if (animFrameCtr < animFrameMax) {

		} else {
			animFrame++;
			animFrameCtr = 0;
			animFlagFrame++;
		}
		animFrame %= 2;
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
			soldiers[soldierIndex].progress += 0.01;
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
	}
}

setInterval(fly, 50);

$('canvas').click(function(e) {
	if (showStart) {
		showStart = 0;
	} else {

		x = e.pageX - this.offsetLeft, y = e.pageY - this.offsetTop;

		for ( var c in castles) {
			if (castles[c].isInside(x, y) && castles[c].owner === 1) {
				castles[c].nextTarget();
			}
		}
	}
});
