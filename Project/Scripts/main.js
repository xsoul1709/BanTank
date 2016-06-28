var TankOnline = {};

window.onload = function(){

  TankOnline.game = new Phaser.Game(window.innerWidth,
                                    window.innerHeight,
                                    Phaser.AUTO,
                                    '',
                                    {preload: preload, create: create, update: update});

}
var tank, tank2, bullet;
var preload = function(){
  TankOnline.game.load.image('tankDown', './images/tank_player1_down_c0_t1_s1.png');
  TankOnline.game.load.image('tankUp', './images/tank_player1_up_c0_t1_s1.png');
  TankOnline.game.load.image('tankLeft', './images/tank_player1_left_c0_t1_s1.png');
  TankOnline.game.load.image('tankRight', './images/tank_player1_right_c0_t1_s1.png');
  TankOnline.game.load.image('bulletRight', './images/bullet_right.png');
}
var create = function(){
  TankOnline.game.physics.startSystem(Phaser.Physics.ARCADE);
  TankOnline.keyboard = TankOnline.game.input.keyboard;

  tank = new Tank(window.innerWidth/2, window.innerHeight/2);
  tank2 = new Tank(window.innerWidth/2 - 200, window.innerHeight/2);
  bullet = new Bullet(window.innerWidth/2 - 100, window.innerHeight/2);
}
var update = function(){
  var directoryX, directoryY, directoryZ;
  if(TankOnline.keyboard.isDown(Phaser.KeyCode.LEFT)){
    directoryX = -1;
  }
  else if(TankOnline.keyboard.isDown(Phaser.KeyCode.RIGHT)){
    directoryX = 1;
  }
  else{
    directoryX = 0;
}
  if(TankOnline.keyboard.isDown(Phaser.KeyCode.UP)){
    directoryY = -1;
  }
  else if(TankOnline.keyboard.isDown(Phaser.KeyCode.DOWN)){
    directoryY = 1;
}
  else{
    directoryY = 0;
  }

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.SPACEBAR)){
    directoryZ = 1;
  }
  tank.update(directoryX, directoryY);
  tank2.update(directoryX, directoryY);
  bullet.update(directoryZ);
}
