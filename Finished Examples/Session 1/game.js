var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('player', 'assets/Images/square.png');
  
  cursors = game.input.keyboard.createCursorKeys();
}

function create() {
  sqPlayer = game.add.image(370, 270, 'player');
}

function update() {
  if ( cursors.left.isDown ) {
    sqPlayer.position.x = sqPlayer.position.x - 5;
  }
  
  else if ( cursors.right.isDown ) {
    sqPlayer.position.x = sqPlayer.position.x + 5;
  }
  
  else if ( cursors.up.isDown ) {
    sqPlayer.position.y = sqPlayer.position.y - 5;
  }
  
  else if ( cursors.down.isDown ) {
    sqPlayer.position.y = sqPlayer.position.y + 5;
  }
}