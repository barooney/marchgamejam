var FRAME_DELAY = 50;
var SCREEN_START = 'start';
var SCREEN_BATTLE = 'battle';
var SCREEN_HELP = 'help';
var SCREEN_CREDITS = 'credits';
var SCREEN_WIN = 'win';
var SCREEN_LOSE = 'lose';

// global variables
var shownScreen = SCREEN_START;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var buttons = [];

// global battlefield variables
var mainBases;
var castles;
var framesToNextSpawn1;
var framesToNextSpawn2;
var framesToNextSpawn3;
var mainBases;
var soldiers;
var animations;

// initialize images
var castleDmg0Img = new Image();
castleDmg0Img.src = 'img/castleDmg0.png';
var castleDmg1Img = new Image();
castleDmg1Img.src = 'img/castleDmg1.png';
var castleDmg2Img = new Image();
castleDmg2Img.src = 'img/castleDmg2.png';
var castleDmg3Img = new Image();
castleDmg3Img.src = 'img/castleDmg3.png';
var castleFightLoop01Img = new Image();
castleFightLoop01Img.src = 'img/castle_fight_loop_01.png';
var castleFightLoop02Img = new Image();
castleFightLoop02Img.src = 'img/castle_fight_loop_02.png';
var castleFightLoop03Img = new Image();
castleFightLoop03Img.src = 'img/castle_fight_loop_03.png';
var knightFightLoop01Img = new Image();
knightFightLoop01Img.src = 'img/knight_fight_loop_01.png';
var knightFightLoop02Img = new Image();
knightFightLoop02Img.src = 'img/knight_fight_loop_02.png';
var knightFightLoop03Img = new Image();
knightFightLoop03Img.src = 'img/knight_fight_loop_03.png';
var startscreenImg = new Image();
startscreenImg.src = 'img/startscreen.png';
var helpScreenImg = new Image();
helpScreenImg.src = 'img/helpscreen.png';
var winScreenImg = new Image();
winScreenImg.src = 'img/winscreen.png';
var creditsScreenImg = new Image();
creditsScreenImg.src = 'img/creditsscreen.png';
var loseScreenImg = new Image();
loseScreenImg.src = 'img/losescreen.png';
var way1Img = new Image();
way1Img.src = 'img/way_1.png';
var way2Img = new Image();
way2Img.src = 'img/way_2.png';
var backgroundImg = new Image();
backgroundImg.src = 'img/background.png';
var flagImgs1 = [new Image(), new Image()];
var flagImgs2 = [new Image(), new Image()];
var flagImgs3 = [new Image(), new Image()];
flagImgs1[0].src = 'img/fahne_orange_1.png';
flagImgs1[1].src = 'img/fahne_orange_2.png';
flagImgs2[0].src = 'img/fahne_gruen_1.png';
flagImgs2[1].src = 'img/fahne_gruen_2.png';
flagImgs3[0].src = 'img/fahne_violet_1.png';
flagImgs3[1].src = 'img/fahne_violet_2.png';
var animFrame = 0;
var animFrameCtr = 0;
var animFrameMax = 5;
var animFlagFrame = 0;
var animFlagFrameMax = 1;
var animFlagFrameCtr = 0;
var soldierImgs1 = [new Image(), new Image(), new Image()];
var soldierImgs2 = [new Image(), new Image(), new Image()];
var soldierImgs3 = [new Image(), new Image(), new Image()];
soldierImgs1[0].src = 'img/knight_1orange.png';
soldierImgs1[1].src = 'img/knight_2orange.png';
soldierImgs1[2].src = 'img/knight_3orange.png';
soldierImgs2[0].src = 'img/knight_1gruen.png';
soldierImgs2[1].src = 'img/knight_2gruen.png';
soldierImgs2[2].src = 'img/knight_3gruen.png';
soldierImgs3[0].src = 'img/knight_1violet.png';
soldierImgs3[1].src = 'img/knight_2violet.png';
soldierImgs3[2].src = 'img/knight_3violet.png';
soldierFrontalImg1 = new Image();
soldierFrontalImg1.src = 'img/knight_orange_vorn_2.png'
soldierFrontalImg2 = new Image();
soldierFrontalImg2.src = 'img/knight_gruen_vorn_2.png'
soldierFrontalImg3 = new Image();
soldierFrontalImg3.src = 'img/knight_violet_vorn_2.png'

function init() {
	var buttons;

	framesToNextSpawn1 = 20;
	framesToNextSpawn2 = 20;
	framesToNextSpawn3 = 20;

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
    animations = [];
}