var soundElementals = {
  musicFilePath : null,
  playAsMusicLoop : function(filePath) {
	  LowLatencyAudio.stop(this.musicFilePath);
	  this.musicFilePath = filePath;
	  LowLatencyAudio.loop(filePath);
  },
  stopMusicLoop : function() {
	  LowLatencyAudio.stop(this.musicFilePath);
  },
  play : function(filePath) {
	  LowLatencyAudio.play(filePath);
  },
  activateMusic : function(activate) {
	  if (activate) {
		  LowLatencyAudio.loop(this.musicFilePath);
	  } else {
		  LowLatencyAudio.stop(this.musicFilePath);
	  }
  },
  preloadFX : function(filePath) {
	  LowLatencyAudio.preloadFX(filePath, filePath);
  },
  preloadAudio : function(filePath) {
	  LowLatencyAudio.preloadAudio(filePath, filePath, 1);
  }
};