var FRAME_DELAY = 1; 
var SCREEN_START = 'start';
var SCREEN_BATTLE = 'battle';
var SCREEN_WIN = 'win';
var SCREEN_LOSE = 'lose';

var shownScreen = SCREEN_START; 

var framesToNextSpawn1 = 20;
var framesToNextSpawn2 = 20;
var framesToNextSpawn3 = 20;

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var castleImg = new Image();
castleImg.src = 'img/40x40castle.png';

var startscreenImg = new Image();
startscreenImg.src = 'img/startscreen.png';

var winScreenImg = new Image();
winScreenImg.src = 'img/winscreen.png';

var loseScreenImg = new Image();
loseScreenImg.src = 'img/losescreen.png';

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

var mainBases = [null, null, null];

var castles = [];
for (castlePosIndex in castlePosArray) {
	var curPosObj = castlePosArray[castlePosIndex];
	var curCastle = new castle();
	curCastle.posX = curPosObj.x;
	curCastle.posY = curPosObj.y;
	curCastle.owner = curPosObj.owner;
	castles.push(curCastle);
	
	if (curCastle.owner != 0) {
		mainBases[curCastle.owner - 1] = curCastle;
	}
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

function init() {
	shownScreen = SCREEN_START; 
	
	framesToNextSpawn1 = 20;
	framesToNextSpawn2 = 20;
	framesToNextSpawn3 = 20;

	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");

	castleImg = new Image();
	castleImg.src = 'img/40x40castle.png';

	startscreenImg = new Image();
	startscreenImg.src = 'img/startscreen.png';

	way1Img = new Image();
	way1Img.src = 'img/way_1.png';
	way2Img = new Image();
	way2Img.src = 'img/way_2.png';

	backgroundImg = new Image();
	backgroundImg.src = 'img/background.png';

	flagImgs1 = [ new Image(), new Image() ];
	flagImgs2 = [ new Image(), new Image() ];
	flagImgs3 = [ new Image(), new Image() ];
	flagImgs1[0].src = 'img/fahne_orange_1.png';
	flagImgs1[1].src = 'img/fahne_orange_2.png';
	flagImgs2[0].src = 'img/fahne_blau_1.png';
	flagImgs2[1].src = 'img/fahne_blau_2.png';
	flagImgs3[0].src = 'img/fahne_gruen_1.png';
	flagImgs3[1].src = 'img/fahne_gruen_2.png';

	animFrame = 0;
	animFrameCtr = 0;
	animFrameMax = 5;

	animFlagFrame = 0;
	animFlagFrameMax = 1;
	animFlagFrameCtr = 0;

	soldierImgs1 = [ new Image(), new Image(), new Image ];
	soldierImgs2 = [ new Image(), new Image(), new Image ];
	soldierImgs3 = [ new Image(), new Image(), new Image ];
	soldierImgs1[0].src = 'img/knight_1orange.png';
	soldierImgs1[1].src = 'img/knight_2orange.png';
	soldierImgs1[2].src = 'img/knight_3orange.png';
	soldierImgs2[0].src = 'img/knight_1blau.png';
	soldierImgs2[1].src = 'img/knight_2blau.png';
	soldierImgs2[2].src = 'img/knight_3blau.png';
	soldierImgs3[0].src = 'img/knight_1gruen.png';
	soldierImgs3[1].src = 'img/knight_2gruen.png';
	soldierImgs3[2].src = 'img/knight_3gruen.png';

	mainBases = [null, null, null];
	
	castles = [];
	for (castlePosIndex in castlePosArray) {
		var curPosObj = castlePosArray[castlePosIndex];
		var curCastle = new castle();
		curCastle.posX = curPosObj.x;
		curCastle.posY = curPosObj.y;
		curCastle.owner = curPosObj.owner;
		castles.push(curCastle);
		
		if (curCastle.owner != 0) {
			mainBases[curCastle.owner - 1] = curCastle;
		}
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

	soldiers = [];
}