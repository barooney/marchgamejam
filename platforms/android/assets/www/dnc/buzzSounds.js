var soundElementals = {
  music : null,
  fxMap : {},
  audioMap : {},
  playAsMusicLoop : function(filePath) {
	  this.music = new buzz.sound(filePath, {
	    autoplay : true,
	    loop : true
	  });
  },
  play : function(filePath) {
	  var soundObj = new buzz.sound(filePath);
	  soundObj.play();
  },

  toggleMusic : function() {
	  this.music.togglePlay();
  },
  preloadFX : function(filePath) {
	  var soundObj = new buzz.sound(filePath);
	  this.fxMap[filePath] = soundObj;
  },
  preloadAudio : function(filePath) {
	  var soundObj = new buzz.sound(filePath);
	  this.audioMap[filePath] = soundObj;
  }
};