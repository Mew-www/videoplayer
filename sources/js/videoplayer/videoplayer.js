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
      file: list_of_movies[0].sources[0].file,
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