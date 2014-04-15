var soundElementals = {
  music : null,
  playAsMusicLoop : function(filePath) {
  	PGLowLatencyAudio.loop(filePath);
  },
  play : function(filePath) {
  	PGLowLatencyAudio.play(filePath);
  },

  toggleMusic : function() {
	  // TODO
  },
  preloadFX : function(filePath) {
  	PGLowLatencyAudio.preloadFX(filePath, filePath);
  },
  preloadAudio : function(filePath) {
  	PGLowLatencyAudio.preloadAudio(filePath, filePath, 1);
  }
};