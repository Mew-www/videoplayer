
    let listing = [];
// get auto-generated page
    $.get('http://62.78.180.5/streamprojekti/').then(function (html) {
        // create tempovrary DOM element
        let document = $(html);

        document.find('a[href$=".mov"]').each(function () {
            // console.log($(this).attr("href"));
            //console.log($(this).parent().next().html());
            //console.log($(this).parent().next().next().html());
            let movie = {
                name: $(this).attr("href"),
                last_modified: $(this).parent().next().html(),
                size: $(this).parent().next().next().html()
            };
            listing.push(movie);

        });


        for(let i = 0; i < listing.length; i++) {
            console.log(listing[i].name);
            console.log(listing[i]);
       
        }
        console.log(listing[2]);
        $("#videolist").html("<ol><li>jotain</li><li>jotain2</li></ol>");
    });
