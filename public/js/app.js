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
