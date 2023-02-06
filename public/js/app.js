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

        //   Route::get('/producto/{product_id}', 'ProductFilterController@getProduct')->name('menu.product');

        // ajax{url:/room/player_code}

        // @Get('/findGirlById/:id')
        // findGirlById(@Request() req):any{
        //   let id:number = parseInt(req.params.id)
        //   return this.girlService.getGirlById(id)
        // }
        // GET http://localhost:3000/girl/findGirlById/2
      } else {
        // reate room failed
      }
    },
    error: function (response) {},
  });
}
