var TankOnline = {
  map : [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ]
}

window.onload = function(){
  TankOnline.game = new Phaser.Game(window.innerWidth,
                                    window.innerHeight,
                                    Phaser.AUTO,
                                    '',
                                    { preload: preload, create: create, update: update });
}

var tank, tank1;
var wallGroup, allyGroup, enemyGroup;
var preload = function(){
  TankOnline.game.load.image('tankDown', './images/tank_player1_down_c0_t1_s1.png');
  TankOnline.game.load.image('tankUp', './images/tank_player1_up_c0_t1_s1.png');
  TankOnline.game.load.image('tankLeft', './images/tank_player1_left_c0_t1_s1.png');
  TankOnline.game.load.image('tankRight', './images/tank_player1_right_c0_t1_s1.png');

  TankOnline.game.load.image('bulletDown', './images/bullet_down.png');
  TankOnline.game.load.image('bulletUp', './images/bullet_up.png');
  TankOnline.game.load.image('bulletLeft', './images/bullet_left.png');
  TankOnline.game.load.image('bulletRight', './images/bullet_right.png');

  TankOnline.game.load.image('wall', './images/wall_steel.png');
}

var create = function(){
  TankOnline.game.physics.startSystem(Phaser.Physics.ARCADE);
  TankOnline.keyboard = TankOnline.game.input.keyboard;

  wallGroup = TankOnline.game.add.physicsGroup()
  TankOnline.bulletGroup = TankOnline.game.add.physicsGroup();
  enemyGroup = TankOnline.game.add.physicsGroup();
  allyGroup = TankOnline.game.add.physicsGroup()

  tank = new Tank(window.innerWidth/2, window.innerHeight/2, allyGroup);
  tank1 = new Tank(window.innerWidth/2 - 200, window.innerHeight/2, allyGroup);
  for(var i=0; i<10; i++){
    new Tank(Math.random()*TankOnline.game.world.bounds.width,
              Math.random()*TankOnline.game.world.bounds.height,
              enemyGroup);
  }

    TankOnline.game.world.setBounds(0, 0, 1500, 800);
    TankOnline.game.camera.follow(tank.sprite);

  for(var i = 0; i<TankOnline.map.length; i++){
    for(var j = 0; j<TankOnline.map[i].length; j++){
      if(TankOnline.map[i][j]){
      new Wall(j*16, i*16, wallGroup);
      }
    }
  }
}
var update = function(){
  TankOnline.game.physics.arcade.collide(tank.sprite, wallGroup);
  TankOnline.game.physics.arcade.collide(tank1.sprite, wallGroup);
  TankOnline.game.physics.arcade.overlap(TankOnline.bulletGroup,
                                          wallGroup,
                                          onBulletHitWall, '',
                                          this);
  TankOnline.game.physics.arcade.overlap(TankOnline.bulletGroup,
                                          enemyGroup,
                                          onBulletHitEnemy, '',
                                          this);


  var direction = new Phaser.Point();
  var direction1 = new Phaser.Point();
  if(TankOnline.keyboard.isDown(Phaser.KeyCode.LEFT)) direction.x = -1;
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.RIGHT)) direction.x = 1;
  else direction.x = 0;

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.UP)) direction.y = -1;
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.DOWN)) direction.y = 1;
  else direction.y = 0;

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.A)) direction1.x = -1;
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.D)) direction1.x = 1;
  else direction1.x = 0;

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.W)) direction1.y = -1;
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.S)) direction1.y = 1;
  else direction1.y = 0;

  tank.update(direction);
  tank1.update(direction1);

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.SHIFT)){
    tank.fire();
  }

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.SPACEBAR)){
    tank1.fire();
  }
}
var onBulletHitWall = function(bulletSprite, wallSprite){
  bulletSprite.kill()
}

var onBulletHitEnemy = function(bulletSprite, enemySprite){
  enemySprite.damage(bulletSprite.bulletDamage);
  bulletSprite.kill();
}
