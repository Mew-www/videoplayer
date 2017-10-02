// Asynchronously HTTP GET movies listing
get_movies(function(listing) {
  let player = new Player(window.jwplayer('videoplayer'), [listing[0]]);

  // Create favourites holder -object (localStorage -> filter (not-in-listing))
  let favourites = new Favourites(listing);

  // Generate favourites list (side-bar)
  for (let i=0; i<favourites.movies.length; i++) {
    let playVideoFn = () => {player.play(favourites.movies[i])};
    favourites.generateFavouriteComponent(favourites.movies[i], playVideoFn);
  }

  // Generate video list (top-bar)
  for (let i=0; i<listing.length; i++) {
    let playVideoFn = () => {player.play(listing[i])};
    create_clickable_object(listing[i], playVideoFn, ()=>{favourites.addFavourite(listing[i], playVideoFn)});
  }

  // Add movie theatre -like transitions to background
  player.jwplayer.on('play', ()=>{$("body").css('background', "black");});
  player.jwplayer.on('pause', ()=>{$("body").css('background', "white");});
});