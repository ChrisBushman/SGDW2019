// Global objects to persist in game
var rows = 20;
var columns = 20;
var playerXSize = 40;
var playerYSize = 40;
var playfieldWidth = playerXSize * columns;
var playfieldHeight = playerYSize * rows
var canvasWidth = playfieldWidth + 100;
var canvasHeight = playfieldHeight + 100;

// Instance of game
var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.CANVAS, "game");

// Styling for Instructional Text
var instructionsStyle = { font: "30px Arial", fill: "#ff0044", align: "center" };
// Handles for Player object
var players = [];
// String for victory result
var winner = "";

game.state.add("GameRound", gameRound);
game.state.add("PlayerJoin", playerJoin);
game.state.add("GameOver", gameOver);
game.state.add("Title", title);
console.log(game.state.states);
game.state.start("Title");