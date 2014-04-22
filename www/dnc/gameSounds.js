var PATH = 'dnc/';

var soundEngine = {
  BLADE_FILES : [ PATH + 'snd/Klinge1.mp3', PATH + 'snd/Klinge2.mp3' ],
  FANFARE_FILE : PATH + 'snd/Fanfare.mp3',
  GAME_LOSE_FILE : PATH + 'snd/gamelose.mp3',
  GAME_WIN_FILE : PATH + 'snd/gamewin.mp3',
  INTERACT_FILE : PATH + 'snd/interact.mp3',
  MUSIC_GAME_FILE : PATH + 'snd/music-game.mp3',
  MUSIC_MENU_FILE : PATH + 'snd/music-menu.mp3',

  // flags to (de-)activate sounds/music
  playSounds : true,
  playMusic : true,
  initialize : function() {

	  soundElementals.preloadFX(this.BLADE_FILES[0]);
	  soundElementals.preloadFX(this.BLADE_FILES[1]);
	  soundElementals.preloadFX(this.FANFARE_FILE);
	  soundElementals.preloadFX(this.GAME_LOSE_FILE);
	  soundElementals.preloadFX(this.GAME_WIN_FILE);
	  soundElementals.preloadFX(this.INTERACT_FILE);
	  soundElementals.preloadFX(this.MUSIC_GAME_FILE);
	  soundElementals.preloadAudio(this.MUSIC_MENU_FILE);

	  this.startMenuMusic();
  },
  isMusicPlaying : function() {
	  return this.playMusic;
  },
  isSoundPlaying : function() {
	  return this.playSounds;
  },
  stopMusic : function() {
	  soundElementals.stopMusicLoop();
  },
  startMenuMusic : function() {
	  soundElementals.playAsMusicLoop(this.MUSIC_MENU_FILE);
	  soundElementals.activateMusic(this.playMusic);
  },
  startBattleMusic : function() {
	  soundElementals.playAsMusicLoop(this.MUSIC_GAME_FILE);
	  soundElementals.activateMusic(this.playMusic);
  },
  playFanfare : function() {
	  this._playSoundFile(this.FANFARE_FILE);
  },
  playBlade : function() {
	  var rndBladeIndex = Math.floor(Math.random() * this.BLADE_FILES.length);
	  var rndBladeFile = this.BLADE_FILES[rndBladeIndex];
	  this._playSoundFile(rndBladeFile);
  },
  toggleMusic : function() {
	  this.playMusic = !this.playMusic;
	  soundElementals.activateMusic(this.playMusic);
  },
  toggleSound : function() {
	  this.playSounds = !this.playSounds;
  },
  playCastleDirectionChange : function() {
	  this._playSoundFile(this.INTERACT_FILE);
  },
  playGameLose : function() {
	  this._playSoundFile(this.GAME_LOSE_FILE);
  },
  playGameWin : function() {
	  this._playSoundFile(this.GAME_WIN_FILE);
  },
  _playSoundFile : function(filePath) {
	  if (this.playSounds) {
		  soundElementals.play(filePath);
	  }
  }
};
soundEngine.initialize();