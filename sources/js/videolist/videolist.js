
function get_movies(callback){
    let listing = [];

    // get auto-generated page
    $.get('http://62.78.180.5/streamprojekti/').then(function (html) {
        // create tempovrary DOM element
        let document = $(html);

        document.find('a[href$=".mov"]').each(function () {
            // console.log($(this).attr("href"));
            //console.log($(this).parent().next().html());
            //console.log($(this).parent().next().next().html());
            //let slicer = splitter1.slice(1, 5); //slice pilko alaviiva ja piste lopusta eli (kaikki paitsi viimeinen)
            let filename = $(this).attr("href");
            let splitter1 = filename.split("-");
            let slicer = splitter1.slice(0, -1);
            let title = slicer.join(" ");

            console.log(slicer);

            let finder = listing.find(function (movie_item) {
                //luuppa ja lisää sourseen jos on

                if (movie_item.title === title) {

                    return true;

                }
                else {
                    return false;
                }
            });

            let resolution =  (filename.indexOf("h1080p")>-1) ? "Full HD" : "Low Quality";
            if (finder) {
                finder.sources.push({file: 'http://62.78.180.5/streamprojekti/' + filename, label: resolution})
            } else {

                let movie = new Movie(
                    title,
                    filename,
                    [
                        {file: 'http://62.78.180.5/streamprojekti/' + filename, label: resolution}
                    ],
                    $(this).parent().next().html(),
                    $(this).parent().next().next().html()
                );
                listing.push(movie);

            }
        });

        let div1 = $("<div class='movie-wrapper'></div>");
        $("#videolist").append(div1);



        callback(listing);

    });


}
function create_clickable_object(movie, play_callback, add_fav_callback) {

    let favourite_button = $("<button>Add to favourites</button>").on("click", (e)=>{e.preventDefault(); e.stopPropagation(); add_fav_callback()});
    let movie_object = $("<div class='movie-element'>" +
            movie.title +
            "<div class='movie-info'>" + movie.last_modified + "</div>" +
            "<div class='movie-favourite-wrapper'></div>" +
        "</div>").on("click", play_callback);
    movie_object.find(".movie-favourite-wrapper").append(favourite_button);

    $('.movie-wrapper').append(movie_object);


}