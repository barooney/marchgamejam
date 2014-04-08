// #######################
// SPAWN RATE := 
// SPAWN_INTERVAL_BASE 
// - (SPAWN_INTERVAL_REDUCTION_PER_CASTLE * CastleCount)
// 
// Frames to spawn base value
var SPAWN_INTERVAL_BASE = 100;
// Interval reduction implied by each castle
var SPAWN_INTERVAL_REDUCTION_PER_CASTLE = 3;
// #######################

// #######################
// soldier speed := SOLDIER_SPEED_BASE
// + RandomValueBetween(0, SOLDIER_SPEED_BONUS);
//
// soldier base speed in "percent of one way per frame"
var SOLDIER_SPEED_BASE = 0.01;
// soldier speed bonus maximum
var SOLDIER_SPEED_BONUS = 0.01;
// #######################

// #######################
// FIGHTING
//
// Shall soldiers suicide after attacking an enemy castle?
var SOLDIER_SUICIDE_AFTER_ENEMY_CASTLE_ATTACK = true;
// Shall soldiers suicide after attacking a neutral castle?
var SOLDIER_SUICIDE_AFTER_NEUTRAL_CASTLE_ATTACK = true;
// How likely is the successfull capturing of a neutral castle (0 to 1)?
var WIN_AGAINST_NEUTRAL_CASTLE_PROPABILITY = 1.0;
// How likely is the successfull capturing of an enemy castle (0 to 1)?
var WIN_AGAINST_ENEMY_CASTLE_PROPABILITY = 0.5;
// How likely it to beat an enemy soldier with an own solider (0 to 1)?
var WIN_AGAINST_ENEMY_SOLDIER_PROPABILITY = 0.5;
// how many Hitpoints does each castle have after capturing?
var CASTLE_HIT_POINTS = 4;
// how many Hitpoints does each castle have after capturing?
var NEUTRAL_CASTLE_HIT_POINTS = 1;
// #######################

// #######################
// the functions to do balncing from HTML forms
// #######################
function applyHtmlBalancingValues() {
	SPAWN_INTERVAL_BASE = parseInt(document.getElementById('SPAWN_INTERVAL_BASE').value);
	SPAWN_INTERVAL_REDUCTION_PER_CASTLE = parseInt(document
	    .getElementById('SPAWN_INTERVAL_REDUCTION_PER_CASTLE').value);
	SOLDIER_SPEED_BASE = parseFloat(document.getElementById('SOLDIER_SPEED_BASE').value);
	SOLDIER_SPEED_BONUS = parseFloat(document
	    .getElementById('SOLDIER_SPEED_BONUS').value);
	SOLDIER_SUICIDE_AFTER_ENEMY_CASTLE_ATTACK = document
	    .getElementById('SOLDIER_SUICIDE_AFTER_ENEMY_CASTLE_ATTACK').checked;
	SOLDIER_SUICIDE_AFTER_NEUTRAL_CASTLE_ATTACK = document
	    .getElementById('SOLDIER_SUICIDE_AFTER_NEUTRAL_CASTLE_ATTACK').checked;
	WIN_AGAINST_NEUTRAL_CASTLE_PROPABILITY = parseFloat(document
	    .getElementById('WIN_AGAINST_NEUTRAL_CASTLE_PROPABILITY').value);
	WIN_AGAINST_ENEMY_CASTLE_PROPABILITY = parseFloat(document
	    .getElementById('WIN_AGAINST_ENEMY_CASTLE_PROPABILITY').value);
	WIN_AGAINST_ENEMY_SOLDIER_PROPABILITY = parseFloat(document
	    .getElementById('WIN_AGAINST_ENEMY_SOLDIER_PROPABILITY').value);
	CASTLE_HIT_POINTS = parseInt(document.getElementById('CASTLE_HIT_POINTS').value);
	NEUTRAL_CASTLE_HIT_POINTS = parseInt(document
	    .getElementById('NEUTRAL_CASTLE_HIT_POINTS').value);
}
