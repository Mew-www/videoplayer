class Favourites {

  constructor(list_of_movies) {
    let saved_favourite_titles = localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
    this.movies = saved_favourite_titles
      .filter(saved_title => list_of_movies.find(available_movie => available_movie.title === saved_title))
      .map(saved_title => list_of_movies.find(available_movie => available_movie.title === saved_title));
    this.parent_div = $('#favourites-bar');
  }

  addFavourite(movie, click_callback) {
    // If exists -> early return (NOP)
    if (this.movies.find(existing_movie => existing_movie.title === movie.title)) {
      return;
    }

    // Add to model
    this.movies.push(movie);
    // Generate UI component
    this.generateFavouriteComponent(movie, click_callback);
    // Persist
    let saved_favourite_titles = localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
    saved_favourite_titles.push(movie.title);
    localStorage.setItem('favourites', JSON.stringify(saved_favourite_titles));
  }

  generateFavouriteComponent(movie, click_callback) {
    let fav_component = $('<div>'+movie.title+'</div>').on('click', click_callback);
    this.parent_div.append(fav_component);
  }

}