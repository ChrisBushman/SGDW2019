var title = function(game) {
  
};

var titleText;

title.prototype = {
  create: function() {
    titleText = game.add.text(game.world.centerX, game.world.centerY, 
                              "BLOCK RACE!!!\n\nPress 'ENTER' to Start.",
                              instructionsStyle);
    titleText.anchor.set(0.5);
  },
  
  update: function() {
    if (game.input.keyboard.isDown(Phaser.KeyCode.ENTER)) {
      game.state.start("PlayerJoin");
    }
  }
}