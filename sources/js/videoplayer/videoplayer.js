class Player {

  constructor(jwplayer, list_of_movies) {
    if (!list_of_movies.every(movie => movie instanceof Movie)) {
      throw Error('Bad argument for Player constructor. Given argument was not instance of Movie -class.');
    }
    if (list_of_movies.length < 1) {
      throw Error('Bad argument for Player constructor. List of movies had length less than 1.')
    }
    this.movies = list_of_movies;
    this.jwplayer = jwplayer;
    jwplayer.setup({
      height: 360,
      width: 640,
      file: list_of_movies[0].sources.find(source=>source.label==="Full HD").file,
      title: list_of_movies[0].title,
      description: list_of_movies[0].description
    });
  }

  play(movie) {
    if (!(movie instanceof Movie)) {
      throw Error('Bad argument for function changeMovie. Given argument was not instance of Movie -class.');
    }
    this.jwplayer.load([movie]);
  }

}

let movielist = [1,2,3,4,5].map(num => new Movie(
  "american-made-trailer-1_h1080p.mov",
  "This has lots of kittens in it!", [
    {file: 'http://62.78.180.5/streamprojekti/american-made-trailer-1_h1080p.mov', label: 'Full HD'},
    {file: 'http://62.78.180.5/streamprojekti/american-made-trailer-1_h480p.mov', label: 'Low quality'}
  ])
);
let player = new Player(window.jwplayer('videoplayer'), movielist);
player.jwplayer.on('play', ()=>{$("body").css('background', "black");});
player.jwplayer.on('pause', ()=>{$("body").css('background', "white");});