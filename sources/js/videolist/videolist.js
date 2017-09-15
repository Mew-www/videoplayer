let listing = [];
// get auto-generated page
$.get('http://62.78.180.5/streamprojekti/').then(function(html) {
    // create temporary DOM element
    let document = $(html);

    // find all links ending with .pdf
    document.find('a[href$=".mov"]').each(function() {
       // console.log($(this).attr("href"));
        //console.log($(this).parent().next().html());
        //console.log($(this).parent().next().next().html());
        let movie = {
            name:$(this).attr("href"),
            last_modified:$(this).parent().next().html(),
            size:$(this).parent().next().next().html()
        };
        listing.push(movie);
        console.log(movie);

    });
    console.log(listing);
});
