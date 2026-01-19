const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

let player;
let platforms;
let cursors;
let jumpSound;

function preload () {
  this.load.image('ground', 'assets/ground.png');

  // Sprite sheet: frameWidth & frameHeight MUST match your sprite
  this.load.spritesheet('player',
    'assets/player.png',
    { frameWidth: 32, frameHeight: 48 }
  );

  this.load.audio('jump', 'assets/jump.wav');
}

function create () {
  // Platforms
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 430, 'ground').setScale(2).refreshBody();
  platforms.create(600, 300, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 200, 'ground');

  // Player
  player = this.physics.add.sprite(100, 300, 'player');
  player.setBounce(0.1);
  player.setCollideWorldBounds(true);

  // Collision
  this.physics.add.collider(player, platforms);

  // Controls
  cursors = this.input.keyboard.createCursorKeys();

  // Sound
  jumpSound = this.sound.add('jump');

  // Animations
  this.anims.create({
    key: 'idle',
    frames: [{ key: 'player', frame: 0 }],
    frameRate: 10
  });

  this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('player', { start: 1, end: 4 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'jump',
    frames: [{ key: 'player', frame: 5 }],
    frameRate: 10
  });
}

function update () {
  if (cursors.left.isDown) {
    player.setVelocityX(-200);
    player.flipX = true;
    player.anims.play('run', true);

  } else if (cursors.right.isDown) {
    player.setVelocityX(200);
    player.flipX = false;
    player.anims.play('run', true);

  } else {
    player.setVelocityX(0);
    player.anims.play('idle', true);
  }

  // Jump
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-450);
    jumpSound.play();
    player.anims.play('jump', true);
  }
}
