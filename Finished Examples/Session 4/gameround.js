var gameRound = function(game) {

}

// configuration variables and starting values
var head, tail, cursors, snake, coin, gameText, playerDirection, movementDirection, speedLimit;
var directions = Object.freeze({up: 0, down: 1, right: 2, left: 3});
var x = 0, y = 0;
var gameSpeed = 0.5;
var score = 0;
var deltaTime = 0;

gameRound.prototype = {
  preload: function() {    
    game.load.image('background', 'Assets/Images/background.jpg');
    game.load.image('snake', 'Assets/Images/snake_segment.png');
    game.load.image('coin', 'Assets/Images/coin_segment.png');
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
      if (playerCollidesWithSelf()) {
        gameOver();
      }
      else if (coinCollidesWithSnake()) {
        score++;
        coin.destroy();
        placeRandomCoin();
        
        if (gameSpeed > 0.034) {
          gameSpeed = (gameSpeed / 1.5);
        }
        if (gameSpeed <= speedLimit) {
          gameSpeed = speedLimit;
        }
        
      } 
      else if (playerDirection !== undefined) {
        removeTail();
      }
      
      deltaTime = 0;
    }
  }
}

function deleteSnake() {
  while (tail != null) {
      tail.image.destroy();
      tail = tail.next;
  }
  head = null;
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

// linked list functions

function newHead(x, y) {
  var newHead = {};
  newHead.image = game.add.image(x, y, 'snake');
  newHead.next = null;
  head.next = newHead;
  head = newHead;
}

function removeTail(x, y) {
  tail.image.destroy();
  tail = tail.next;
}

// collision functions

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

function playerCollidesWithSelf() {
  // check if the head has collided with any other body part, starting at the tail
  var needle = tail;
  var collides = false;
  while (needle.next != head) {
    if (needle.image.position.x == head.image.position.x &&
        needle.image.position.y == head.image.position.y) {
      collides = true;
    }
    needle = needle.next;
  }
  return collides;
}

// movement functions

// generic function to check for input
function updateDirection(gamepad) {
  // Check for D-Pad input
  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) ) {
    playerDirection = directions.left;
  }

  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) {
    playerDirection = directions.right;
  }

  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)) {
    playerDirection = directions.up;
  }

  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN)) {
    playerDirection = directions.down;
  }
}

function movePlayer() {
  if (playerDirection == directions.right) {
    x += playerXSize;
    movementDirection = directions.right;
  } else if (playerDirection == directions.left) {
    x -= playerXSize;
    movementDirection = directions.left;
  } else if (playerDirection == directions.up) {
    y -= playerYSize;
    movementDirection = directions.up;
  } else if (playerDirection == directions.down) {
    y += playerYSize;
    movementDirection = directions.down;
  }
  if (x <= 0 - playerXSize|| x >= canvasWidth || y <= 0 - playerYSize || y >= canvasHeight ) {
    gameOver();
  }

  if (playerDirection !== undefined) {
    newHead(x, y);
  }
}

function gameOver() {
  winner = "Player " + player.id + "'s score was " + score + "!";
  game.state.start("GameOver");
}