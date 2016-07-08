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
    //Giờ coi như là mình thằng nhận được cái id do thằng server nó gửi,
    this.socket.on('idshot', function(msg){
      // cái id chính là cái msg này, việc cần làm là tìm ra thằng tank có cái id này và cho nó bắn thôi
      TankOnline.findTankWithThatId(msg);
      //ý là tìm ra thằng tank với id đó và bắn
    });
  }

  reportMove(id, direction, position){
    this.socket.emit('tank_moved', {
      id        : id,
      direction : direction,
      position  : position
    });
  }
  sendBullet(id){
    //cái hàm di chuyển kia, nó truyền vào 3 tham số id, hướng di chuyển và vị trí lúc di chuyển, thì lúc bắn
    // k cần quan tâm hướng, k cần quan tâm vị trí nào cả, chỉ cần biết thằng nào bắn thôi, là id, nên truyền id vào
    this.socket.emit('shot', id);
    // giờ sang bên serverr để nhận cái id này
  }
}
