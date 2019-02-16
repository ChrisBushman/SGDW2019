// Global objects to persist in game
var rows = 20;
var columns = 20;
var playerXSize = 40;
var playerYSize = 40;
var canvasWidth = playerXSize * columns;
var canvasHeight = playerYSize * rows;

// Instance of game
var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, "game");

// Styling for Instructional Text
var instructionsStyle = { font: "30px Arial", fill: "#ff0044", align: "center" };
// Handles for Player object
var players = [];
// String for victory result
var winner = "";

game.state.add("gameRound", gameRound);
game.state.add("playerJoin",playerJoin);
game.state.add("GameOver",gameOver);
game.state.add("Title", title);
game.state.start("Title");