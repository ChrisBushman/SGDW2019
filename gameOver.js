var gameOver = function(game) {

};

var gameOverTxt;

gameOver.prototype = {
  create: function() {
    gameOverTxt = game.add.text(game.world.centerX, 
                                game.world.centerY, 
                                winner + 
                                "\nPress 'Enter' to Play Again.\nPress ESC to Start a New Game.", 
                                instructionsStyle);
    gameOverTxt.anchor.set(0.5);
  },
  
  update: function() {
    if (game.input.keyboard.isDown(Phaser.KeyCode.ENTER)) {
      game.state.start("GameRound");
    }
    
    if (game.input.keyboard.isDown(Phaser.KeyCode.ESC)) {
      players = [];
      game.state.start("PlayerJoin");
    }
  }
};