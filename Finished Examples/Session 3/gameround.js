var gameRound = function(game) {

}

var initX = 100;
var initY = 100;
var initTint = 0.3;
var finishX = 600;
var finishY = 800;
var finishLine;

gameRound.prototype = {
  preload: function() {
    game.load.image('player', 'assets/Images/square.png');
    game.load.image('finishLine', 'assets/Images/projectile.png');
  },
  
  create: function() {
    // Adding 30 to finishline X coordinate to compensate for size of player sprite
    finishLine = game.add.sprite(finishX + 30, 0, 'finishLine');
    finishLine.scale.y = finishY;
    
    players.forEach( function(player) {
      player.obj = game.add.sprite(initX, initY, 'player');
      player.obj.tint = initTint * 0xffffff;
      
      // Update Y to have different spawn position
      initY = initY + 60;
      
      // Update tint to have different tint for each player
      initTint = initTint + 0.2;
    });
    
    initY = 100;
    initTint = 0.3;
  },
  
  update: function() {
    
    players.forEach( function(player) {
      movePlayer(player.pad, player.obj);
      
      if (player.obj.x > finishX) {
        winner = "The winner was Player " + player.id + "!";
        game.state.start("GameOver");
      }
    });
  }
}

// generic function to check for input
function movePlayer(gamepad, player) {
  // Check for D-Pad input
  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) ) {
    player.position.x = player.position.x - 5;
  }

  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) {
    player.position.x = player.position.x + 5;
  }

  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)) {
    player.position.y = player.position.y - 5;
  }

  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN)) {
    player.position.y = player.position.y + 5;
  }

  // Check for Analog Stick input
  if (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) && 
     (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 ||
     gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)) {
    player.position.x = player.position.x + (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)) * 5;
  }

  if (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) && 
     (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 ||
     gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)) {
    player.position.y = player.position.y + (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y)) * 5;
  }
}