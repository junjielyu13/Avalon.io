function createRoom() {
  console.log('error');
  var player_name = player.name;
  var player_code = player.code;
  $.ajax({
    type: 'POST',
    url: '/api/creatRoom',
    data: {
      player_code: player_code,
      player_name: player_name,
    },
    success: function (response) {
      if (response.code == 200) {
        let room_code = response.room_code;
        // create room successfully
      } else {
        // reate room failed
      }
    },
    error: function (response) {},
  });
}
