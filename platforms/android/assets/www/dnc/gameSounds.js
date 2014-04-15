var PATH = 'dnc/';

var soundEngine = {
  BLADE_FILES : [ PATH + 'snd/Klinge1.mp3', PATH + 'snd/Klinge2.mp3' ],
  FANFARE_FILE : PATH + 'snd/Fanfare.mp3',
  MUSIC_FILE : PATH + 'snd/music-game.mp3',

  // flags to (de-)activate sounds/music
  playSounds : true,
  playMusic : true,
  backgroundMusic : null,
  initialize : function() {

	  soundElementals.preloadFX(this.BLADE_FILES[0]);
	  soundElementals.preloadFX(this.BLADE_FILES[1]);
	  soundElementals.preloadFX(this.FANFARE_FILE);
	  soundElementals.preloadAudio(this.MUSIC_FILE);

	  soundElementals.playAsMusicLoop(this.MUSIC_FILE);
  },
  playFanfare : function() {
	  if (this.playSounds) {
		  soundElementals.play(this.FANFARE_FILE);
	  }
  },
  playBlade : function() {
	  if (this.playSounds) {
		  var rndBladeIndex = Math.floor(Math.random() * this.BLADE_FILES.length);
		  var rndBladeFile = this.BLADE_FILES[rndBladeIndex];
		  soundElementals.play(rndBladeFile);
	  }
  },
  toggleMusic : function() {
	  soundElementals.toggleMusic();
  }
};
soundEngine.initialize();