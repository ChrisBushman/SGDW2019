var gameRound = function(game) {
  
}

// configuration variables and starting values
var head, tail, snake, coin, gameText, playerDirection, movementDirection, cursors;
var directions = Object.freeze({up: 0, down: 1, right: 2, left: 3});
var x = 0, y = 0;
var gameSpeed = 0.5;
var score = 0;
var deltaTime = 0;
var gameOver = false;

gameRound.prototype = {
  preload: function() {
    game.load.image('snake', 'assets/Images/square.png');
    game.load.image('background', 'assets/Images/background.png');
    game.load.image('coin', 'assets/Images/coin_segment.png');
    
    cursors = game.input.keyboard.createCursorKeys();
  },
  
  create: function() {
    game.add.sprite(0, 0, 'background');
    gameText = game.add.text(canvasWidth, 0, "0", {
        font: "28px Arial",
        fill: "#fff"
    });
    gameText.anchor.setTo(1, 0);
    initSnake();
    placeRandomCoin();
  },
  
  update: function() {
    gameText.text = score;
    players.forEach( function(player) {
      updateDirection(player.pad);
    });
    
    deltaTime = deltaTime + game.time.physicsElapsed;
    
    if (deltaTime >= gameSpeed) {
      movePlayer();
      
      if (coinCollidesWithSnake()) {
        score++;
        coin.destroy();
        placeRandomCoin();
        
        if (gameSpeed > 0.034) {
          gameSpeed = (gameSpeed / 1.5);
        }
      }
      
      if (x <= 0 - playerXSize|| 
          x >= canvasWidth || 
          y <= 0 - playerYSize || 
          y >= canvasHeight ) {
        gameOver = true;
      }
      if (playerDirection !== undefined) {
        removeTail();
      }
      deltaTime = 0;
      
      if (gameOver === true) {
        winner = "Your score was " + score + "!";
        gameOver = false;
        x = 0; 
        y = 0;
        gameSpeed = 0.5;
        score = 0;
        deltaTime = 0;
        playerDirection = undefined;
        game.state.start("GameOver");
      }
    }
  }
}

function newHead(x, y) {
  var newHead = {};
  newHead.image = game.add.image(x, y, 'snake');
  newHead.next = null;
  head.next = newHead;
  head = newHead;
}

function initSnake() {
  head = {};
  newHead(0, 0);
  tail = head;
  newHead(playerXSize, 0);
  newHead(playerXSize * 2, 0);
  x = playerXSize * 2;
  y = 0;
}

function coinCollidesWithSnake() {
  // traverse the linked list, starting at the tail
  var needle = tail;
  var collides = false;
  var numTimes = 0;
  while (needle != null) {
    numTimes++;
    if (coin.position.x == needle.image.position.x && 
        coin.position.y == needle.image.position.y) {
      collides = true;
    }
    needle = needle.next;
  }
  return collides;
}

function placeRandomCoin() {
  if (coin !== undefined) {
    coin.destroy();
  }
  coin = game.add.image(0, 0, 'coin');
  do {
      coin.position.x = Math.floor(Math.random() * 13) * 40;
      coin.position.y = Math.floor(Math.random() * 10) * 40;
  } while (coinCollidesWithSnake());
}

function updateDirection(gamepad) {
  if (gamepad === null) {
    if (cursors.left.isDown &&
       movementDirection != directions.right) {
      playerDirection = directions.left;
    }

    if (cursors.right.isDown &&
       movementDirection != directions.left) {
      playerDirection = directions.right;
    }

    if (cursors.up.isDown &&
       movementDirection != directions.down) {
      playerDirection = directions.up;
    }

    if (cursors.down.isDown &&
       movementDirection != directions.up) {
      playerDirection = directions.down;
    }
  }
  
  else {
    // Check D-Pad input
    if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) &&
       movementDirection != directions.right) {
      playerDirection = directions.left;
    }

    if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) &&
       movementDirection != directions.left) {
      playerDirection = directions.right;
    }

    if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) &&
       movementDirection != directions.down) {
      playerDirection = directions.up;
    }

    if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) &&
       movementDirection != directions.up) {
      playerDirection = directions.down;
    }
  }
}

function movePlayer() {
  if (playerDirection == directions.right) {
    x += playerXSize;
    movementDirection = directions.right;
  } 
  else if (playerDirection == directions.left) {
    x -= playerXSize;
    movementDirection = directions.left;
  } 
  else if (playerDirection == directions.up) {
    y -= playerYSize;
    movementDirection = directions.up;
  } 
  else if (playerDirection == directions.down) {
    y += playerYSize;
    movementDirection = directions.down;
  }
  
  if (playerDirection !== undefined) {
    newHead(x, y);
  }
}

function removeTail() {
  tail.image.destroy();
  tail = tail.next;
}