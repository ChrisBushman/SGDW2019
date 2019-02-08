// Global objects to persist in game

// Instance of game
var game = new Phaser.Game(800, 600, Phaser.CANVAS, "game");
// Styling for Instructional text
var instructionsStyle = { font: "30px Arial", fill: "#ff0044", align: "center" };
// Handles for Player objects
var players = [];
// String for victory result
var winner = "";

game.state.add("gameRound", gameRound);
game.state.add("playerJoin",playerJoin);
game.state.add("GameOver",gameOver);
game.state.add("Title", title);
game.state.start("Title");