// Global objects to persist in game

// Instance of game
var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
// Styling for Instructional Text
var instructionsStyle = { font: "30px Arial", fill: "#ff0044", align: "center" };
// Handles for Player object
var players = [];
// String for victory result
var winner = "";

// state to express a "round of play"
game.state.add("GameRound", gameRound);
// state to facilitate players joining the game
game.state.add("PlayerJoin", playerJoin);
// state for ending game (game over screen)
game.state.add("GameOver", gameOver);
// state for the beginning title screen
game.state.add("Title", title);
game.state.start("Title");