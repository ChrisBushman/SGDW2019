var gameRound = function(game) {
  
}

// configuration variables and starting values
var head, tail, snake, coin, powerup, gameText, playerDirection, movementDirection, cursors;
var directions = Object.freeze({up: 0, down: 1, right: 2, left: 3});
var x = 0, y = 0;
var initalGameSpeed = 0.5;
var gameSpeed = initalGameSpeed;
var gameSpeedDivisor = 1.5;
var gameSpeedLimit = 0.034;
var score = 0;
var deltaTime = 0;
var gameOver = false;
var frame = 0;

gameRound.prototype = {
  preload: function() {
    game.load.image('snake', 'assets/Images/square.png');
    game.load.image('background', 'assets/Images/background.png');
    game.load.image('coin', 'assets/Images/coin_segment.png');
    game.load.image('powerup', 'assets/Images/powerup_segment.png');
    
    cursors = game.input.keyboard.createCursorKeys();
  },
  
  create: function() {
    game.add.sprite(0, 0, 'background');
    gameText = game.add.text(playfieldWidth, 0, "Score: " + score, {
        font: "28px Arial",
        fill: "#fff"
    });
    gameText.anchor.setTo(1, 0);
    initSnake();
    placeRandomCoin();
  },
  
  update: function() {
    gameText.text = "Score: " + score;
    players.forEach( function(player) {
      updateDirection(player.pad);
    });
    
    deltaTime = deltaTime + game.time.physicsElapsed;
    
    if (deltaTime >= gameSpeed) {
      frame++;
      movePlayer();
      console.log("Frame " + frame + ":");
      if ((x <= 0 - playerXSize|| 
          x >= playfieldWidth || 
          y <= 0 - playerYSize || 
          y >= playfieldHeight) ||
         playerCollidesWithSelf()) {
        gameOver = true;
      }

      else {
        if (playerDirection !== undefined) {
          newHead(x, y);
        }

        if (coinCollidesWithSnake()) {
          score++;
          coin.destroy();
          placeRandomCoin();
          
          if (gameSpeed > gameSpeedLimit) {
            gameSpeed = (gameSpeed / gameSpeedDivisor);
          }
          console.log("Collected coin");
        }

        else if (powerupCollidesWithSnake()) {
          powerup.destroy();
          console.log("Powerup destroyed:");
          console.log(powerup);
          removeTail();
          removeTail();
        }

        else if (playerDirection !== undefined) {
          removeTail();
        }

        placeRandomPowerup();
      }
      
      deltaTime = 0;
      
      if (gameOver === true) {
        winner = "Your score was " + score + "!";
        gameOver = false;
        x = 0; 
        y = 0;
        gameSpeed = initalGameSpeed;
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

function playerCollidesWithSelf() {
  // traverse the linked list, starting at the tail
  var needle = tail;
  var collides = false;
  while (needle.next != head && collides === false) {
    if (head.image.position.x == needle.image.position.x && 
        head.image.position.y == needle.image.position.y) {
      collides = true;
    }
    needle = needle.next;
  }
  return collides;
}

function coinCollidesWithSnake() {
  // traverse the linked list, starting at the tail
  var needle = tail;
  var collides = false;
  while (needle != null && collides === false) {
    if (coin.position.x == needle.image.position.x && 
        coin.position.y == needle.image.position.y) {
      collides = true;
    }
    needle = needle.next;
  }
  return collides;
}

function powerupCollidesWithSnake() {
  // traverse the linked list, starting at the tail
  var needle = tail;
  var collides = false;
  if (powerup !== undefined) {
    while (needle != null && collides === false) {
      if (powerup.position.x == needle.image.position.x && 
          powerup.position.y == needle.image.position.y) {
        collides = true;
      }
      needle = needle.next;
    }
  }
  return collides;
}

function powerupCollidesWithCoin() {
  var collides = false;
  if (powerup !== undefined) {
    if (powerup.position.x == coin.position.x && 
        powerup.position.y == coin.position.y) {
      collides = true;
    }
  }
  return collides;
}

function placeRandomCoin() {
  if (coin !== undefined && coin.alive) {
    coin.destroy();
  }
  coin = game.add.image(0, 0, 'coin');
  do {
      coin.position.x = Math.floor(Math.random() * 13) * 40;
      coin.position.y = Math.floor(Math.random() * 10) * 40;
  } while (coinCollidesWithSnake() ||
           powerupCollidesWithCoin());
}

function placeRandomPowerup() {
  if (powerup === undefined || !powerup.alive) {
    var randomValue = Math.random();
    console.log("PowerUp random is: " + randomValue);
    if (randomValue > 0.7) {
      powerup = game.add.image(0, 0, 'powerup');

      do {
        powerup.position.x = Math.floor(Math.random() * 13) * 40;
        powerup.position.y = Math.floor(Math.random() * 10) * 40;
      } while (powerupCollidesWithSnake() ||
               powerupCollidesWithCoin());
    }
  }
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
}

function removeTail() {
  if (tail.next.next !== head) {
    tail.image.destroy();
    tail = tail.next;
  }
}