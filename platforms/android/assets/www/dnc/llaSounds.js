var soundElementals = {
    music: null,
    playAsMusicLoop: function(filePath) {
        LowLatencyAudio.loop(filePath);
    },
    play: function(filePath) {
        LowLatencyAudio.play(filePath);
    },

    toggleMusic: function() {
        // TODO
    },
    preloadFX: function(filePath) {
        LowLatencyAudio.preloadFX(filePath, filePath);
    },
    preloadAudio: function(filePath) {
        LowLatencyAudio.preloadAudio(filePath, filePath, 1);
    }
};