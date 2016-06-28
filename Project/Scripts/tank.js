class Tank {
  constructor(x, y) {
    this.sprite = TankOnline.game.add.sprite(x, y, 'tankDown');
    TankOnline.game.physics.arcade.enable(this.sprite);
  }
  update(directoryX, directoryY){
    if(directoryX < 0){
      this.sprite.body.velocity.x = -250;
      this.sprite.loadTexture('tankLeft');
    }
    else if (directoryX > 0) {
      this.sprite.body.velocity.x = 250;
      this.sprite.loadTexture('tankRight');
    }
    else {
      this.sprite.body.velocity.x = 0;
    }
    if(directoryY < 0){
      this.sprite.body.velocity.y = -250;
      this.sprite.loadTexture('tankUp');
    }
    else if (directoryY > 0) {
      this.sprite.body.velocity.y = 250;
      this.sprite.loadTexture('tankDown');
    }
    else {
      this.sprite.body.velocity.y = 0;
    }
  }
}
