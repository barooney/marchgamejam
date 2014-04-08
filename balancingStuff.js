// #######################
// SPAWN RATE := 
// SPAWN_INTERVAL_BASE 
// - (SPAWN_INTERVAL_REDUCTION_PER_CASTLE * CastleCount)
// 
// Frames to spawn base value
SPAWN_INTERVAL_BASE = 100;
// Interval reduction implied by each castle
SPAWN_INTERVAL_REDUCTION_PER_CASTLE = 3;
// #######################

// #######################
// soldier speed := SOLDIER_SPEED_BASE
// + RandomValueBetween(0, SOLDIER_SPEED_BONUS);
//
// soldier base speed in "percent of one way per frame"
SOLDIER_SPEED_BASE = 0.01;
// soldier speed bonus maximum
SOLDIER_SPEED_BONUS = 0.01;
// #######################

// #######################
// FIGHTING
//
// Shall soldiers suicide after attacking an enemy castle?
SOLDIER_SUICIDE_AFTER_ENEMY_CASTLE_ATTACK = true;
// Shall soldiers suicide after attacking a neutral castle?
SOLDIER_SUICIDE_AFTER_NEUTRAL_CASTLE_ATTACK = true;
// How likely is the successfull capturing of a neutral castle (0 to 1)?
WIN_AGAINST_NEUTRAL_CASTLE_PROPABILITY = 1.0; 
// How likely is the successfull capturing of an enemy castle (0 to 1)?
WIN_AGAINST_ENEMY_CASTLE_PROPABILITY = 0.5;
// How likely it to beat an enemy soldier with an own solider (0 to 1)?
WIN_AGAINST_ENEMY_SOLDIER_PROPABILITY = 0.5;
// #######################
