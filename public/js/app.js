window.onload = function () {
  createUser();
};

function showPopup() {
  var overlay = document.querySelector('.overlay');
  overlay.style.display = 'block';
}

function hidePopup() {
  var overlay = document.querySelector('.overlay');
  overlay.style.display = 'none';
}

function createUser() {
  var playerId = localStorage.getItem('player_id');
  var playerCode = localStorage.getItem('player_code');
  var playerName = localStorage.getItem('player_name');

  if (!playerId || !playerCode || !playerName) {
    localStorage.clear();
    $.ajax({
      type: 'GET',
      url: 'api/generate-random-player',
      success: function (response) {
        console.log(response);
        playerCode = response.player_code;
        playerId = response.player_id;
        playerName = response.player_name;
        document.querySelector('#player_name').value = playerName;
        localStorage.setItem('player_name', playerName);
        localStorage.setItem('player_id', playerId);
        localStorage.setItem('player_code', playerCode);
      },
      error: function (error) {
        console.log(error);
      },
    });
  } else {
    document.querySelector('#player_name').value = playerName;
  }
}

$(document).ready(function () {
  document.querySelector('#create-room').addEventListener('click', function () {
    console.log('test');
    var playerId = localStorage.getItem('player_id');
    var playerCode = localStorage.getItem('player_code');
    var playerName = localStorage.getItem('player_name');
    $.ajax({
      type: 'POST',
      url: 'api/create-room',
      data: {
        player_code: playerCode,
        player_name: playerName,
      },
      dataType: 'json',
      success: function (response) {
        console.log('success');
        console.log(response);
        var roomCode = response.room_code;
        console.log(roomCode);

        $.ajax({
          type: 'GET',
          url: 'room/' + roomCode,
          success: function (response) {
            console.log('success');
            console.log(response);
            let addressUrl = 'room/' + roomCode;
            window.location.replace(addressUrl);
          },
          error: function (error) {
            console.log('error');
            console.log(error);
          },
        });
      },
      error: function (error) {
        console.log('error');
        console.log(error);
      },
    });
  });
});
