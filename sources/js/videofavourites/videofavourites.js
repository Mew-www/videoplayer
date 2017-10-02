class Favourites {

  constructor(list_of_movies) {
    let saved_favourites = localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
    this.movies = saved_favourites
      .filter(saved_title => list_of_movies.find(available_movie => available_movie.title == saved_title))
      .map(saved_title => list_of_movies.find(available_movie => available_movie.title == saved_title));

  }
}