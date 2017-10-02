class Favourites {

  constructor(list_of_movies) {
    let saved_favourite_titles = localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
    this.movies = saved_favourite_titles
      .filter(saved_title => list_of_movies.find(available_movie => available_movie.title === saved_title))
      .map(saved_title => list_of_movies.find(available_movie => available_movie.title === saved_title));
    this.parent_div = $('#favourites-bar');
  }

  addFavourite(movie, click_callback) {
    this.movies.push(movie);
    this.generateFavouriteComponent(movie, click_callback);
  }

  generateFavouriteComponent(movie, click_callback) {
    let fav_component = $('<div>'+movie.title+'</div>').on('click', click_callback);
    this.parent_div.append(fav_component);
  }

}