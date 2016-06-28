var context;

window.onload = function(){

  TankOnline.game = new Phaser.Game(window.innerWidth,
                                    window.innerHeight,
                                    Phaser.AUTO,
                                    '',
                                    {preload: preload, create: create, update: update});

  var preload = function(){
    TankOnline.game.load.image('tankDown', './images/tank_player1_down_c0_t1_s1.png');
  }
  var create = function(){
    var.tank = TankOnline.game.add.sprite(window.innerWidth/2, window.innerHeight/2,'tankDown');
  }
  var update = function(){
    
  }
  var canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d")
}
