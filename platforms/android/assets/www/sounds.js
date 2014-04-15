var soundEngine = {
  BLADE_FILES : [ 'snd/Klinge1.mp3', 'snd/Klinge2.mp3' ],
  FANFARE_FILE : 'snd/Fanfare.mp3',
  MUSIC_FILE : 'snd/music-game.mp3',

  // flags to (de-)activate sounds/music
  playSounds : true,
  playMusic : true,
  backgroundMusic : null,
  initialize : function() {
	  this.backgroundMusic = new buzz.sound(this.MUSIC_FILE, {
	    autoplay : true,
	    loop : true
	  });
  },
  playFanfare : function() {
	  if (this.playSounds) {
		  var fanfare = new buzz.sound(this.FANFARE_FILE);
		  fanfare.play();
	  }
  },
  playBlade : function() {
	  if (this.playSounds) {
		  var rndBladeIndex = Math.floor(Math.random() * this.BLADE_FILES.length);
		  var rndBladeFile = this.BLADE_FILES[rndBladeIndex];
		  var bladeSound = new buzz.sound(rndBladeFile);
		  bladeSound.play();
	  }
  }
};
soundEngine.initialize();
