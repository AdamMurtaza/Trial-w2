const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  backgroundColor: '#87CEEB',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scene: {
    create,
    update
  }
};

const game = new Phaser.Game(config);

let player;
let platforms;
let cursors;

function create () {
  cursors = this.input.keyboard.createCursorKeys();

  // Platforms (rectangles)
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 430)
    .setDisplaySize(800, 40)
    .refreshBody();

  platforms.create(600, 300)
    .setDisplaySize(200, 20)
    .refreshBody();

  platforms.create(200, 220)
    .setDisplaySize(200, 20)
    .refreshBody();

  // Player (rectangle)
  player = this.physics.add.rectangle(100, 300, 40, 50, 0xff0000);
  player.body.setCollideWorldBounds(true);
  player.body.setBounce(0.1);

  this.physics.add.collider(player, platforms);
}

function update () {
  if (cursors.left.isDown) {
    player.body.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(200);
  } else {
    player.body.setVelocityX(0);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.body.setVelocityY(-450);
  }
}
