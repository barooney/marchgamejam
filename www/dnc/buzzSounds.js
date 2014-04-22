var soundElementals = {
  music : null,
  audioMap : {},
  stopMusicLoop : function() {
	  if (this.music !== null) {
		  this.music.stop();
	  }
	  this.music = null;
  },
  playAsMusicLoop : function(filePath) {
	  if (this.music !== null) {
		  this.music.stop();
	  }
	  this.music = new buzz.sound(filePath, {
	    autoplay : true,
	    loop : true
	  });
  },
  play : function(filePath) {
	  this.audioMap[filePath].play();
  },

  activateMusic : function(activate) {
	  if (activate) {
		  this.music.play();
	  } else {
		  this.music.pause();
	  }
  },
  preloadFX : function(filePath) {
	  var soundObj = new buzz.sound(filePath);
	  this.audioMap[filePath] = soundObj;
  },
  preloadAudio : function(filePath) {
	  var soundObj = new buzz.sound(filePath);
	  this.audioMap[filePath] = soundObj;
  }
};