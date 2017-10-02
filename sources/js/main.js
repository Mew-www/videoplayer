get_movies(function(listing) {
  let player = new Player(window.jwplayer('videoplayer'), [listing[0]]);

  for (let i=0; i<listing.length; i++) {
    create_clickable_object(listing[i], function(){player.play(listing[i]);});
  }

  player.jwplayer.on('play', ()=>{$("body").css('background', "black");});
  player.jwplayer.on('pause', ()=>{$("body").css('background', "white");});
});