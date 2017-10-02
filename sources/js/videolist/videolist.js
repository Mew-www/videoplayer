
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

            if (finder) {
                finder.sources.push({file: 'http://62.78.180.5/streamprojekti/' + filename, label: "asd"})
            }

            else {


                let movie = new Movie(
                    title,
                    filename,
                    [
                        {file: 'http://62.78.180.5/streamprojekti/' + filename, label: "asd"}
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
function create_clickable_object(movie, callback) {

    let movie_object = $("<div class='movie-element'>" +
        movie.title +
        "<div class='movie-info'>" + movie.last_modified + "</div>" +
        "</div>").on("click",callback);

    $('.movie-wrapper').append(movie_object);


}