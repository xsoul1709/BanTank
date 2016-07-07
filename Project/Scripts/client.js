class Client{
  constructor(){
    this.socket = io();

    this.socket.on('connected', function(msg){
      TankOnline.onConnected(msg);
    });
    this.socket.on('other_players', function(msg){
      TankOnline.onReceivedOtherPlayersData(msg);
    });
    this.socket.on('new_player_connected', function(msg){
      TankOnline.onReceivedNewPlayerData(msg);
    });
    this.socket.on('player_moved', function(msg){
      TankOnline.onPlayerMoved(msg);
    });
  }

  reportMove(id, direction, position){
    this.socket.emit('tank_moved', {
      id        : id,
      direction : direction,
      position  : position
    });
  }
}
