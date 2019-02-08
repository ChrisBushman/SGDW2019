var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// Handles for Player object
var sqPlayer1, sqPlayer2, sqPlayer3, sqPlayer4;

// Handles for GamePad Objects
var gamepad1, gamepad2, gamepad3, gamepad4;

// Handle for keyboard arrow keys
var cursors;

// State of "if the game started"
var gameStart = false;

// Handle for Instructional text
var instructionsText;

// Styling for Instructional text
var directionsStyle = { font: "30px Arial", fill: "#ff0044", align: "center" };

function preload() {
  game.load.image('player', 'assets/Images/square.png');
  
  cursors = game.input.keyboard.createCursorKeys();
  
  // Starts the gamepad manager
  game.input.gamepad.start();
  
  // Assign gamepads to handles
  if (game.input.gamepad.pad1) {
    gamepad1 = game.input.gamepad.pad1;
  }
  
  if (game.input.gamepad.pad2) {
    gamepad2 = game.input.gamepad.pad2;
  }
  
  if (game.input.gamepad.pad3) {
    gamepad3 = game.input.gamepad.pad3;
  }
  
  if (game.input.gamepad.pad4) {
    gamepad4 = game.input.gamepad.pad4;
  }
}

function create() {
  // Create instructional text and render to the screen
  instructionsText = game.add.text(game.world.centerX, game.world.centerY, 
                                   "Press 'A' to Join.\nPress 'Enter' to Begin.", 
                                   directionsStyle);
  instructionsText.anchor.set(0.5);
}

function update() {
  
  // Before game starts, check for players join
  if (gameStart === false) {
    initPlayers();
  }
  
  // Once game starts, check for input from each player
  else {
    if (gamepad1 && gamepad1.connected && sqPlayer1) {
      movePlayer(gamepad1, sqPlayer1);
    }
    
    if (gamepad2 && gamepad2.connected && sqPlayer2) {
      movePlayer(gamepad2, sqPlayer2);
    }
    
    if (gamepad3 && gamepad3.connected && sqPlayer3) {
      movePlayer(gamepad3, sqPlayer3);
    }
    
    if (gamepad4 && gamepad4.connected && sqPlayer4) {
      movePlayer(gamepad4, sqPlayer4);
    }
  }
  
  function initPlayers() {
    // 1) First I want to see if the player already joined
    // 2) See if the gamepad's 'A button was pressed
    //   a) GamePad has to be connected
    //   b) Was 'A' pressed
    
    if (sqPlayer1 === undefined && (
        gamepad1.connected && 
        gamepad1.justPressed(Phaser.Gamepad.XBOX360_A))) {
      sqPlayer1 = game.add.sprite(100, 100, 'player');
    }
    
    if (sqPlayer2 === undefined && (
        gamepad2.connected && 
        gamepad2.justPressed(Phaser.Gamepad.XBOX360_A))) {
      sqPlayer2 = game.add.sprite(500, 100, 'player');
      sqPlayer2.tint = 0x777777;
    }
    
    if (sqPlayer3 === undefined && (
        gamepad3.connected && 
        gamepad3.justPressed(Phaser.Gamepad.XBOX360_A))) {
      sqPlayer3 = game.add.sprite(100, 500, 'player');
      sqPlayer2.tint = 0xAAAAAA;
    }
    
    if (sqPlayer4 === undefined && (
        gamepad4.connected && 
        gamepad4.justPressed(Phaser.Gamepad.XBOX360_A))) {
      sqPlayer4 = game.add.sprite(500, 500, 'player');
      sqPlayer2.tint = 0xDDDDDD;
    }
    
    // Check 'Enter' key on keyboard to "Start Game"
    if (game.input.keyboard.isDown(Phaser.KeyCode.ENTER)) {
      gameStart = true;
      instructionsText.destroy();
    }
  }
  
  function movePlayer(gamepad, player) {
    // Check D-Pad input
    if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)) {
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
    if (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) //&& 
       // (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 || 
       //  gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)) {
   ){
      player.position.x = player.position.x + (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)) * 5;
    }
    
    if (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) //&& 
       // (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 || 
       //  gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)) {
        ){
      player.position.y = player.position.y + (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y)) * 5;
    }
  }
  
}